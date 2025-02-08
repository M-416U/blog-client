import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="fixed w-full p-4 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark">
            Modern Blog
          </h1>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-24 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample blog card */}
          <article
            className="p-6 rounded-xl bg-surface-light dark:bg-surface-dark
            border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Sample Blog Post</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is a sample blog post with the new theme system.
            </p>
            <button
              className="mt-4 px-4 py-2 rounded-lg bg-primary-light dark:bg-primary-dark
              text-white hover:opacity-90 transition-opacity"
            >
              Read More
            </button>
          </article>
        </div>
      </div>
    </main>
  );
}
