'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DevHunt</h3>
            <p className="text-gray-600">
              A platform for developers to share and discover projects that are still in development.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-primary-600">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-600 hover:text-primary-600">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-primary-600">
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-600 hover:text-primary-600">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-primary-600">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DevHunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 