export default function MainWindow() {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="navbar-start">
          <a className="text-2xl font-bold text-primary">HelpMeOut</a>
        </div>
        <div className="navbar-center">
          <span className="text-lg font-medium hidden lg:inline">How can we help you?</span>
        </div>
        <div className="navbar-end space-x-2">
          <button className="btn btn-outline btn-primary">Ask a question</button>
          <button className="btn btn-primary">Log In</button>
        </div>
      </div>

      {/* Conținut principal */}
      <main className="p-8 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <input
            type="text"
            placeholder="Search for help..."
            className="input input-bordered w-full max-w-md"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Categories</h2>
              <p>Explore helpful categories for your needs.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Ask a Question</h2>
              <p>Need help? Ask the community here.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Answer a Question</h2>
              <p>Share your knowledge and help others.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
