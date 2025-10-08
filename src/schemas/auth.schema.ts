import { z } from 'zod';

/**
 * Schéma de validation pour le formulaire de connexion
 *
 * Règles :
 * - email : doit être un email valide
 * - password : minimum 6 caractères
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('L\'email doit être valide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

/**
 * Schéma de validation pour le formulaire d'inscription
 *
 * Règles :
 * - name : minimum 2 caractères
 * - email : doit être un email valide
 * - password : minimum 6 caractères
 * - confirmPassword : doit correspondre au password
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('L\'email doit être valide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z
    .string()
    .min(1, 'Veuillez confirmer votre mot de passe'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'], // L'erreur s'affichera sur le champ confirmPassword
});

// Types TypeScript générés automatiquement depuis les schémas Zod
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
