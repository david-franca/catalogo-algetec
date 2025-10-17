import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("login", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Login/);
    // Expect to have a logo
    await expect(page.getByAltText("logo algetec")).toBeVisible();

    const email = page.getByLabel("E-mail");
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("type", "email");
    await expect(email).toHaveAttribute("placeholder", "E-mail");

    const password = page.getByLabel("Senha");
    await expect(password).toBeVisible();
    await expect(password).toHaveAttribute("type", "password");
    await expect(password).toHaveAttribute("placeholder", "●●●●●●●●");

    await email.fill("dfranca@algetec.com.br");
    await password.fill("david.franca02");

    const button = page.getByRole("button", { name: "Entrar" });
    await expect(button).toBeVisible();
    await button.click();

    await expect(page).toHaveURL("http://localhost:5173/dashboard");
  });
});
