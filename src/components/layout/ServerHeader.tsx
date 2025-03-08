export default function ServerHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <a href="/" className="text-2xl font-bold text-primary-600">
            DevHunt
          </a>
          <nav className="hidden md:flex space-x-6">
            <a href="/projects" className="text-gray-600 hover:text-primary-600">
              Projects
            </a>
            <a href="/upcoming" className="text-gray-600 hover:text-primary-600">
              Upcoming
            </a>
            <a href="/forum" className="text-gray-600 hover:text-primary-600">
              Forum
            </a>
            <a href="/news" className="text-gray-600 hover:text-primary-600">
              News
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input py-1 pl-9 pr-4 w-40 md:w-60"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <a href="/projects/new" className="btn btn-primary hidden md:inline-flex">
            Add Project
          </a>
          <a href="/auth/signin" className="text-primary-600 hover:text-primary-700">
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
} 