import { expect, test } from "@playwright/test";

test.describe("Rotas Protegidas", () => {
  test("deve redirecionar um usuário não autenticado para a página de login", async ({
    page,
  }) => {
    // Tenta acessar uma rota protegida (ex: /dashboard)
    await page.goto("/dashboard");

    // Playwright irá esperar automaticamente pelo redirecionamento
    // Verificamos se a URL final é a da página de login (raiz)
    // e se contém o parâmetro `redirect` para redirecionamento pós-login.
    await expect(page).toHaveURL(/\/.*redirect=%2Fdashboard/);

    // Também podemos verificar se um elemento da página de login está visível
    await expect(
      page.getByRole("heading", { name: /catálogo/i })
    ).toBeVisible();
  });

  test("deve permitir que um usuário autenticado acesse a dashboard", async ({
    page,
  }) => {
    // Primeiro, fazemos o login
    await page.goto("/");
    await page
      .getByRole("textbox", { name: /e-mail/i })
      .fill("dfranca@algetec.com.br");
    await page.getByLabel(/senha/i).fill("david.franca02");
    await page.getByRole("button", { name: /login/i }).click();

    // Espera o redirecionamento para a dashboard após o login
    await expect(page).toHaveURL("/dashboard");

    // Verifica se um elemento específico da dashboard está visível
    // await expect(page.getByText(/bem-vindo/i)).toBeVisible();
  });
});
