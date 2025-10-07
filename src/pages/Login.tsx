// Login page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login:', { email, password });
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
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[rgb(var(--foreground))] text-sm font-medium mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="ada@adatechschool.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                required
                aria-required="true"
              />
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
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-2 border-[rgb(var(--border))] rounded-lg text-[rgb(var(--foreground))] placeholder-[rgb(var(--muted-foreground))] focus:outline-none focus:border-[rgb(var(--primary))] transition-colors text-sm sm:text-base"
                required
                aria-required="true"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6 sm:mt-8 text-sm sm:text-base"
            >
              Sign in
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
