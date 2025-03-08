'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FiSearch, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            DevHunt
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/projects" className="text-gray-600 hover:text-primary-600">
              Projects
            </Link>
            <Link href="/forum" className="text-gray-600 hover:text-primary-600">
              Forum
            </Link>
            <Link href="/news" className="text-gray-600 hover:text-primary-600">
              News
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="input py-1 pl-9 pr-4 w-40 md:w-60"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>

          {session ? (
            <div className="flex items-center space-x-4">
              <Link href="/projects/new" className="btn btn-primary">
                Add Project
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <FiUser className="w-5 h-5" />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                  <Link
                    href={`/profile/${session.user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
            >
              <FiLogIn className="w-5 h-5" />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 