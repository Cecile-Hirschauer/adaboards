// Landing page
export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Adaboards</h1>
        <p className="text-xl mb-8">Organize your projects with ease</p>
        <div className="space-x-4">
          <a href="/login" className="btn btn-primary">Login</a>
          <a href="/signup" className="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
