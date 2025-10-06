import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const Landing = () => {
  const handleSignIn = () => {
    // TODO: Navigate to sign in page
    console.log("Navigate to sign in");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Header showSignInButton={true} onSignInClick={handleSignIn} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Section */}
        <section className="text-center py-12 sm:py-16 md:py-20 lg:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 leading-tight px-2" style={{ fontFamily: 'var(--font-handwriting)' }}>
            Organize your work{" "}
            <span className="text-primary">seamlessly</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[rgb(var(--muted-foreground))] mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
            A simple, beautiful way to manage tasks and projects with your team
          </p>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2"
            aria-label="Get started with AdaBoards for free"
          >
            Get started for free
          </button>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 px-4">
            Simple yet powerful features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 - Flexible boards */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-2xl p-6 sm:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Flexible boards</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base">
                Organize tasks into customizable boards and columns to fit your
                workflow
              </p>
            </article>

            {/* Feature 2 - Check sh*t done */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-2xl p-6 sm:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[rgb(var(--primary-foreground))]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Check sh*t done</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base">
                Keep track of your progress and iterate through your tasks
                flowlessly
              </p>
            </article>

            {/* Feature 3 - Team collaboration */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-2xl p-6 sm:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Team collaboration</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base">
                Invite team members to boards and collaborate on projects
                together
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
