import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("DATE_COMPASS_ALLOWED_ORIGIN") ?? "https://maquinzeil.github.io",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
  if (mobile !== undefined && mobile !== null && (typeof mobile !== "string" || mobile.length > 40)) {
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
  if (notes !== undefined && notes !== null && (typeof notes !== "string" || notes.length > 2000)) {
    return { ok: false, message: "fulfillmentNotes must be at most 2000 characters." };
  }

  return {
    ok: true,
    draft: {
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerMobile: typeof mobile === "string" ? mobile.trim() : null,
      plannedDate: typeof plannedDate === "string" ? plannedDate : null,
      planSnapshot: snapshot,
      kitRequested,
      fulfillmentNotes: typeof notes === "string" ? notes.trim() : null,
    },
  };
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json(405, { error: "method_not_allowed" });

  // Deliberately fail closed until server-owned pricing, abuse controls, privacy copy,
  // and the persistence transaction have been reviewed and tested. This prevents the
  // public site from accidentally creating real orders while backend work is in progress.
  if (Deno.env.get("DATE_COMPASS_ORDER_INTAKE_ENABLED") !== "true") {
    return json(503, { error: "order_intake_disabled", message: "Date Compass order intake is not live yet." });
  }

  // This second gate is intentional: the flag alone must not activate order creation.
  // Implement persistence only after trusted pricing and the final order contract are approved.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }
  const result = validateDraft(body);
  if (!result.ok) return json(400, { error: "invalid_order_draft", message: result.message });

  return json(501, {
    error: "order_intake_not_implemented",
    message: "Draft validation is ready, but order persistence is intentionally not enabled.",
  });
});

export { validateDraft };
