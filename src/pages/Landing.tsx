import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const Landing = () => {
  const handleSignIn = () => {
    // TODO: Navigate to sign in page
    console.log("Navigate to sign in");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-gray-800)', color: 'var(--color-light)' }}>
      <Header showSignInButton={true} onSignInClick={handleSignIn} />

      {/* Main Content */}
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        {/* Hero Section */}
        <section className="text-center py-12 sm:py-16 md:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 leading-tight px-2" style={{ fontFamily: 'var(--font-handwriting)' }}>
            Organize your work{" "}
            <span className="text-primary">seamlessly</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            A simple, beautiful way to manage tasks and projects with your team
          </p>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#c4b5fd] text-[#2a2a2a] rounded-lg font-semibold text-base sm:text-lg hover:bg-[#b4a5ed] transition-colors">
            Get started for free
          </button>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16 px-4">
            Simple yet powerful features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Flexible boards */}
            <div className="bg-[#3a3a3a] rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-[#c4b5fd] rounded-lg flex items-center justify-center mb-6">
                {/* Icon: deux carrés pour représenter les boards */}
                <div className="flex gap-1">
                  <div className="w-5 h-5 bg-[#2a2a2a] rounded"></div>
                  <div className="w-5 h-5 bg-[#2a2a2a] rounded"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible boards</h3>
              <p className="text-gray-400 leading-relaxed">
                Organize tasks into customizable boards and columns to fit your
                workflow
              </p>
            </div>

            {/* Feature 2 - Check sh*t done */}
            <div className="bg-[#3a3a3a] rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-[#c4b5fd] rounded-lg flex items-center justify-center mb-6">
                {/* Icon: checkmark */}
                <svg
                  className="w-10 h-10 text-[#2a2a2a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Check sh*t done</h3>
              <p className="text-gray-400 leading-relaxed">
                Keep track of your progress and iterate through your tasks
                flowlessly
              </p>
            </div>

            {/* Feature 3 - Team collaboration */}
            <div className="bg-[#3a3a3a] rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-[#c4b5fd] rounded-lg flex items-center justify-center mb-6">
                {/* Icon: deux carrés pour représenter collaboration */}
                <div className="flex gap-1">
                  <div className="w-5 h-5 bg-[#2a2a2a] rounded"></div>
                  <div className="w-5 h-5 bg-[#2a2a2a] rounded"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Team collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Invite team members to boards and collaborate on projects
                together
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
