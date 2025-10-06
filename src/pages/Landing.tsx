import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const Landing = () => {
  const handleSignIn = () => {
    // TODO: Navigate to sign in page
    console.log("Navigate to sign in");
  };

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-auto">
      <Header showSignInButton={true} onSignInClick={handleSignIn} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 leading-tight px-2" style={{ fontFamily: 'var(--font-handwriting)' }}>
            Organize your work{" "}
            <span className="text-primary">seamlessly</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[rgb(var(--muted-foreground))] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            A simple, beautiful way to manage tasks and projects with your team
          </p>
          <button
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg font-semibold text-sm sm:text-base hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2"
            aria-label="Get started with AdaBoards for free"
          >
            Get started for free
          </button>
        </section>

        {/* Features Section */}
        <section className="pb-4 md:pb-8" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 px-4">
            Simple yet powerful features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature 1 - Flexible boards */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl p-4 sm:p-6 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Flexible boards</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm">
                Organize tasks into customizable boards and columns to fit your
                workflow
              </p>
            </article>

            {/* Feature 2 - Check sh*t done */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl p-4 sm:p-6 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[rgb(var(--primary-foreground))]"
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
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Check sh*t done</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm">
                Keep track of your progress and iterate through your tasks
                flowlessly
              </p>
            </article>

            {/* Feature 3 - Team collaboration */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl p-4 sm:p-6 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Team collaboration</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm">
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
