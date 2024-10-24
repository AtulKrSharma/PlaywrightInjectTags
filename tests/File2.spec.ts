import { test, expect } from "@playwright/test";

test("File2 Test1", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwrights/);
});

test("File2 Test2", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("File2 Test3", async ({ page }) => {
  console.log("Assertions in playwright test is running...!");

  // Go to URL
  await page.goto("https://www.google.com/search?q=playwright+by+testers+talk");

  // assert url
  await expect(page).toHaveURL(
    "https://www.google.com/search?q=playwright+by+testers+talk"
  );

  // assert title
  await expect(page).toHaveTitle("playwright by testers talk - Google Search");

  // assert text
  await expect(page.locator("[aria-label='Search']").first()).toHaveText(
    "playwright by testers talk"
  );

  //assert editable enabled visible
  await expect(page.locator("[aria-label='Search']").first()).toBeEditable();
  await expect(page.locator("[aria-label='Search']").first()).toBeVisible();
  await expect(page.locator("[aria-label='Search']").first()).toBeEnabled();

  //assert disabled empty count
  //await expect(page.locator("[aria-label='Search']").first()).toBeDisabled();

  await expect(page.locator("[aria-label='Search']").first()).not.toBeEmpty();

  await expect(page.locator("[aria-label='Search']")).toHaveCount(2);

  await page.waitForTimeout(5000);
});
