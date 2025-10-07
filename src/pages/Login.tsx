// Login page
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      await login(data.email, data.password);

      // Redirect to the page the user tried to access or /boards
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/boards';
      navigate(from, { replace: true });
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
              Welcome back
            </h1>
            <p className="text-[rgb(var(--muted-foreground))] text-sm sm:text-base md:text-lg">
              Sign in to continue to your boards
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
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6 sm:mt-8 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connexion...' : 'Sign in'}
            </button>

            {/* Sign up Link */}
            <div className="text-center mt-4 sm:mt-6">
              <p className="text-[rgb(var(--muted-foreground))] text-sm sm:text-base">
                No account yet?{' '}
                <Link
                  to="/signup"
                  className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] font-medium transition-colors"
                >
                  Sign up
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
