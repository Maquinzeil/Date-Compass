import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigin = Deno.env.get("DATE_COMPASS_ALLOWED_ORIGIN") ?? "https://maquinzeil.github.io";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-submission-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  "Vary": "Origin",
};

type OrderDraft = {
  customerName: string;
  customerEmail: string;
  customerMobile?: string | null;
  plannedDate?: string | null;
  planSnapshot: Record<string, unknown>;
  kitRequested: boolean;
  fulfillmentNotes?: string | null;
};

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateDraft(value: unknown): { ok: true; draft: OrderDraft } | { ok: false; message: string } {
  if (!isRecord(value)) return { ok: false, message: "Request body must be a JSON object." };

  const name = value.customerName;
  const email = value.customerEmail;
  const mobile = value.customerMobile;
  const plannedDate = value.plannedDate;
  const snapshot = value.planSnapshot;
  const kitRequested = value.kitRequested;
  const notes = value.fulfillmentNotes;

  if (typeof name !== "string" || name.trim().length < 1 || name.trim().length > 160) {
    return { ok: false, message: "customerName must be between 1 and 160 characters." };
  }
  if (typeof email !== "string" || email.trim().length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { ok: false, message: "A valid customerEmail is required." };
  }
  if (mobile !== undefined && mobile !== null && (typeof mobile !== "string" || mobile.trim().length > 40)) {
    return { ok: false, message: "customerMobile must be a string of at most 40 characters." };
  }
  if (plannedDate !== undefined && plannedDate !== null &&
      (typeof plannedDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(plannedDate) ||
       Number.isNaN(Date.parse(plannedDate)) || new Date(plannedDate).toISOString().slice(0, 10) !== plannedDate)) {
    return { ok: false, message: "plannedDate must be a valid YYYY-MM-DD date." };
  }
  if (!isRecord(snapshot)) return { ok: false, message: "planSnapshot must be a JSON object." };
  if (JSON.stringify(snapshot).length > 20000) return { ok: false, message: "planSnapshot is too large." };
  if (typeof kitRequested !== "boolean") return { ok: false, message: "kitRequested must be true or false." };
  if (notes !== undefined && notes !== null && (typeof notes !== "string" || notes.trim().length > 2000)) {
    return { ok: false, message: "fulfillmentNotes must be at most 2000 characters." };
  }

  return {
    ok: true,
    draft: {
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerMobile: typeof mobile === "string" ? mobile.trim() || null : null,
      plannedDate: typeof plannedDate === "string" ? plannedDate : null,
      planSnapshot: snapshot,
      kitRequested,
      fulfillmentNotes: typeof notes === "string" ? notes.trim() || null : null,
    },
  };
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json(405, { error: "method_not_allowed" });

  const origin = request.headers.get("Origin");
  if (origin && origin !== allowedOrigin) return json(403, { error: "origin_not_allowed" });

  // Deliberately fail closed until rate limiting/abuse controls, privacy copy, and
  // end-to-end tests are approved. This flag must remain unset/false for staging.
  if (Deno.env.get("DATE_COMPASS_ORDER_INTAKE_ENABLED") !== "true") {
    return json(503, { error: "order_intake_disabled", message: "Date Compass order intake is not live yet." });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }
  const result = validateDraft(body);
  if (!result.ok) return json(400, { error: "invalid_order_draft", message: result.message });

  const submissionKey = request.headers.get("X-Submission-Key")?.trim() ?? "";
  if (submissionKey.length < 16 || submissionKey.length > 128) {
    return json(400, { error: "invalid_submission_key", message: "A 16–128 character submission key is required." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(503, { error: "order_service_unconfigured" });
  }

  // The fingerprint covers only the normalized customer/order draft, never browser prices.
  const fingerprint = await sha256(JSON.stringify(result.draft));
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase.rpc("create_order_transaction", {
    p_submission_key: submissionKey,
    p_submission_fingerprint: fingerprint,
    p_draft: result.draft,
  });

  if (error) {
    if (error.message.includes("digital_plan_unavailable")) {
      return json(409, { error: "product_not_configured", product: "digital_plan" });
    }
    if (error.message.includes("physical_kit_unavailable")) {
      return json(409, { error: "product_not_configured", product: "physical_kit" });
    }
    if (error.message.includes("submission_key_payload_mismatch")) {
      return json(409, { error: "submission_key_conflict" });
    }
    if (error.code === "22023") return json(400, { error: "invalid_order_request" });
    // Avoid returning database internals or customer data to the caller.
    return json(500, { error: "order_creation_failed" });
  }

  if (!isRecord(data) || typeof data.publicReference !== "string") {
    return json(500, { error: "order_creation_failed" });
  }
  return json(201, {
    publicReference: data.publicReference,
    orderStatus: data.orderStatus,
    currency: data.currency,
    totalMinor: data.totalMinor,
    reused: data.reused === true,
    paymentRequired: true,
    paymentConfigured: false,
  });
});

export { validateDraft };
