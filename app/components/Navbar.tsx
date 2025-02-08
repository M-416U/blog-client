import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed w-full p-4 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark">
          Modern Blog
        </h1>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
