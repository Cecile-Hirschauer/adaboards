// Board view page - displays tasks in a board
export default function BoardView() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Board Title</h1>
          <p className="text-base-content/70">Board description</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO Column */}
          <div className="bg-base-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">To Do</h2>
            <div className="space-y-3">
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="font-semibold">Task title</h3>
                  <p className="text-sm text-base-content/70">Task description</p>
                </div>
              </div>
            </div>
            <button className="btn btn-sm btn-ghost w-full mt-4">+ Add Task</button>
          </div>

          {/* IN_PROGRESS Column */}
          <div className="bg-base-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">In Progress</h2>
            <div className="space-y-3">
              {/* Tasks will be mapped here */}
            </div>
            <button className="btn btn-sm btn-ghost w-full mt-4">+ Add Task</button>
          </div>

          {/* DONE Column */}
          <div className="bg-base-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Done</h2>
            <div className="space-y-3">
              {/* Tasks will be mapped here */}
            </div>
            <button className="btn btn-sm btn-ghost w-full mt-4">+ Add Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}
