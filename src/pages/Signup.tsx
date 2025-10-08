// Signup page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/schemas/auth.schema';

export default function Signup() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      await registerUser(data.email, data.password, data.name);

      // Rediriger vers /boards après inscription réussie
      navigate('/boards', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--background))] flex flex-col">
      {/* Header */}
      <Header showSignInButton={false} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-[rgb(var(--foreground))] text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Create an account
            </h1>
            <p className="text-[rgb(var(--muted-foreground))] text-sm sm:text-base md:text-lg">
              Start organizing your projects today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Fullname */}
            <div>
              <label
                htmlFor="name"
                className="block text-[rgb(var(--foreground))] text-sm font-medium mb-2"
              >
                Fullname *
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                placeholder="Ada Lovelace"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[rgb(var(--foreground))] text-sm font-medium mb-2"
              >
                Email *
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                placeholder="ada@adatechschool.fr"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[rgb(var(--foreground))] text-sm font-medium mb-2"
              >
                Password *
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                placeholder="At least 6 characters"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[rgb(var(--foreground))] text-sm font-medium mb-2"
              >
                Confirm Password *
              </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6 sm:mt-8 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Création du compte...' : 'Create my account'}
            </button>

            {/* Sign in Link */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-[rgb(var(--muted-foreground))] text-sm sm:text-base">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
