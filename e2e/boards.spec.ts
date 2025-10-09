import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour la gestion des boards
 */
test.describe('Boards Management', () => {
  test.beforeEach(async ({ page }) => {
    // Nettoyer le localStorage et créer un utilisateur de test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // S'inscrire
    await page.goto('/signup');
    const timestamp = Date.now();
    await page.locator('#name').fill(`User ${timestamp}`);
    await page.locator('#email').fill(`test${timestamp}@example.com`);
    await page.locator('#password').fill('Password123!');
    await page.locator('#confirmPassword').fill('Password123!');
    await page.getByRole('button', { name: /create my account/i }).click();

    // Attendre d'être sur /boards
    await expect(page).toHaveURL('/boards', { timeout: 10000 });
  });

  test('should create a new board via prompt', async ({ page }) => {
    const boardName = `Test Board ${Date.now()}`;

    // Écouter le prompt et le remplir automatiquement
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept(boardName);
    });

    // Cliquer sur le bouton pour créer un nouveau board (utiliser l'aria-label spécifique du bouton en haut)
    await page.getByRole('button', { name: 'Add new board' }).click();

    // Vérifier que le board apparaît dans la liste
    await expect(page.getByText(boardName)).toBeVisible({ timeout: 10000 });
  });

  test('should open a board and view columns', async ({ page }) => {
    const boardName = `Test Board ${Date.now()}`;

    // Créer un board d'abord
    page.on('dialog', async dialog => {
      await dialog.accept(boardName);
    });

    await page.getByRole('button', { name: 'Add new board' }).click();
    await expect(page.getByText(boardName)).toBeVisible({ timeout: 10000 });

    // Cliquer sur le board pour l'ouvrir
    await page.getByText(boardName).first().click();

    // Vérifier qu'on est sur la page du board
    await expect(page).toHaveURL(/\/boards\/.+/, { timeout: 10000 });

    // Vérifier que les colonnes TODO, IN_PROGRESS, DONE sont présentes
    await expect(page.getByText(/to do/i)).toBeVisible();
    await expect(page.getByText(/doing/i)).toBeVisible();
    await expect(page.getByText(/done/i)).toBeVisible();
  });

  test('should delete a board', async ({ page }) => {
    const boardName = `Board to Delete ${Date.now()}`;

    // Créer un board
    page.on('dialog', async dialog => {
      await dialog.accept(boardName);
    });

    await page.getByRole('button', { name: 'Add new board' }).click();
    await expect(page.getByText(boardName)).toBeVisible({ timeout: 10000 });

    // Trouver et cliquer sur le bouton de suppression (icône Trash)
    // Le bouton a un aria-label spécifique avec le nom du board
    const boardCard = page.locator('article').filter({ hasText: boardName });
    await boardCard.hover(); // Hover pour rendre le bouton visible

    // Attendre que le bouton delete soit visible
    const deleteButton = boardCard.getByRole('button', { name: `Delete board ${boardName}` });
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    // Vérifier que le board a disparu (attendre qu'il disparaisse vraiment)
    await expect(page.locator('article').filter({ hasText: boardName })).toHaveCount(0, { timeout: 10000 });
  });
});
