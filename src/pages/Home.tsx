// Home page - displays user's boards
export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Boards</h1>
          <button className="btn btn-primary">+ New Board</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TODO: Map through boards */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Board Title</h2>
              <p>Board description goes here</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">Open</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
