import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour le flux d'authentification
 */
test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Nettoyer le localStorage avant chaque test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should register a new user and login', async ({ page }) => {
    // Aller sur la page d'inscription
    await page.goto('/signup');

    // Vérifier qu'on est bien sur la page d'inscription
    await expect(page).toHaveURL('/signup');
    await expect(page.getByRole('heading', { name: /create an account/i })).toBeVisible();

    // Remplir le formulaire d'inscription
    const timestamp = Date.now();
    const fullname = `Test User ${timestamp}`;
    const email = `test${timestamp}@example.com`;
    const password = 'TestPassword123!';

    await page.locator('#name').fill(fullname);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);

    // Soumettre le formulaire
    await page.getByRole('button', { name: /create my account/i }).click();

    // Vérifier la redirection vers /boards
    await expect(page).toHaveURL('/boards', { timeout: 10000 });

    // Déconnexion
    await page.getByRole('button', { name: /sign out/i }).click();

    // Vérifier la redirection vers /login
    await expect(page).toHaveURL('/login');

    // Se reconnecter avec les mêmes identifiants
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();

    // Vérifier qu'on est de nouveau connecté
    await expect(page).toHaveURL('/boards', { timeout: 10000 });
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Essayer de se connecter avec des identifiants invalides
    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#password').fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Vérifier qu'un message d'erreur s'affiche
    await expect(page.getByText(/invalid (email or password|credentials)/i)).toBeVisible();
  });

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Essayer d'accéder à /boards sans être connecté
    await page.goto('/boards');

    // Vérifier la redirection vers /login
    await expect(page).toHaveURL('/login');
  });

  test('should redirect to boards when accessing login while authenticated', async ({ page }) => {
    // S'inscrire d'abord
    await page.goto('/signup');
    const timestamp = Date.now();
    await page.locator('#name').fill(`User ${timestamp}`);
    await page.locator('#email').fill(`test${timestamp}@example.com`);
    await page.locator('#password').fill('Password123!');
    await page.locator('#confirmPassword').fill('Password123!');
    await page.getByRole('button', { name: /create my account/i }).click();

    // Attendre la redirection
    await expect(page).toHaveURL('/boards', { timeout: 10000 });

    // Essayer d'accéder à /login alors qu'on est connecté
    await page.goto('/login');

    // Vérifier la redirection vers /boards
    await expect(page).toHaveURL('/boards');
  });
});
