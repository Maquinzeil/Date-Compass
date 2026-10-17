const { test, expect } = require("@playwright/test");

const baseURL = "http://127.0.0.1:4173";

test("desktop: main navigation, planner generation, and local assets", async ({ page }) => {
  const pageErrors = [];
  const localFailures = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("response", response => {
    if (response.url().startsWith(baseURL) && response.status() >= 400) {
      localFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#app")).not.toBeEmpty();
  await expect(page.locator('header.site nav[aria-label="Main"] a[href="#custom"]')).toBeVisible();

  await page.locator('header.site nav[aria-label="Main"] a[href="#custom"]').click();
  await expect(page.locator(".budgetinput")).toBeVisible();
  await page.locator(".budgetinput").fill("800");
  await page.locator("button.go").click();
  await expect(page.getByRole("heading", { name: "Your date" })).toBeVisible();

  await page.locator('header.site nav[aria-label="Main"] a[href="#random"]').click();
  await expect(page.locator(".budgetinput")).toBeVisible();
  await expect(page.locator("button.go")).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(localFailures).toEqual([]);
});

test("mobile: navigation, planner fit, and contact labels", async ({ page }) => {
  const pageErrors = [];
  const localFailures = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("response", response => {
    if (response.url().startsWith(baseURL) && response.status() >= 400) {
      localFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#app")).not.toBeEmpty();
  await page.locator('header.site nav[aria-label="Main"] a[href="#custom"]').click();
  await expect(page.locator(".budgetinput")).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 2);

  await page.locator('header.site nav[aria-label="Main"] a[href="#contact"]').click();
  await expect(page.locator("#contactForm")).toBeVisible();
  await expect(page.getByLabel("Full Name")).toBeVisible();
  await expect(page.getByLabel("Email Address")).toBeVisible();
  await expect(page.getByLabel("Mobile Number")).toBeVisible();
  await expect(page.getByLabel("What do you need help with?")).toBeVisible();

  expect(pageErrors).toEqual([]);
  expect(localFailures).toEqual([]);
});
