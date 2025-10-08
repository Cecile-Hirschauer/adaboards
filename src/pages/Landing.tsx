import { useNavigate } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    navigate("/boards");
  };

  return (
    <div className="h-screen flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))] overflow-auto">
      <Header showSignInButton={true} onSignInClick={handleSignIn} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 w-full py-4 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 sm:mb-5 md:mb-6 leading-tight px-2" style={{ fontFamily: 'var(--font-handwriting)' }}>
            Organize your work{" "}
            <span className="text-primary">seamlessly</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[rgb(var(--muted-foreground))] mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto px-4">
            A simple, beautiful way to manage tasks and projects with your team
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-lg font-semibold text-base sm:text-lg md:text-xl lg:text-2xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2"
            aria-label="Get started with AdaBoards for free"
          >
            Get started for free
          </button>
        </section>

        {/* Features Section */}
        <section className="pb-4 md:pb-8" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4">
            Simple yet powerful features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-[1800px] mx-auto">
            {/* Feature 1 - Flexible boards */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4 sm:mb-5" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Flexible boards</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base md:text-lg">
                Organize tasks into customizable boards and columns to fit your
                workflow
              </p>
            </article>

            {/* Feature 2 - Check sh*t done */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4 sm:mb-5" aria-hidden="true">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[rgb(var(--primary-foreground))]"
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
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Check sh*t done</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base md:text-lg">
                Keep track of your progress and iterate through your tasks
                flowlessly
              </p>
            </article>

            {/* Feature 3 - Team collaboration */}
            <article className="bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 border border-[rgb(var(--border))] transition-all hover:border-[rgb(var(--primary))] hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center mb-4 sm:mb-5" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-[rgb(var(--primary-foreground))] rounded"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Team collaboration</h3>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed text-sm sm:text-base md:text-lg">
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
