import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
              About Us
            </h3>
            <p className="text-text-light/80 dark:text-text-dark/80">
              Your company description here
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-text-light/80 dark:text-text-dark/80 hover:text-primary-light dark:hover:text-primary-dark"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-light/80 dark:text-text-dark/80 hover:text-primary-light dark:hover:text-primary-dark"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-light/80 dark:text-text-dark/80 hover:text-primary-light dark:hover:text-primary-dark"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
              Contact
            </h3>
            <p className="text-text-light/80 dark:text-text-dark/80">
              Email: info@example.com
            </p>
            <p className="text-text-light/80 dark:text-text-dark/80">
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-text-light/10 dark:border-text-dark/10 text-center">
          <p className="text-text-light/80 dark:text-text-dark/80">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
