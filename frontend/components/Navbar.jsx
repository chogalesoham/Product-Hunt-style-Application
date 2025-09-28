'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FiLogIn, FiUserPlus, FiPlusCircle } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useLoadUser } from '@/hooks/useLoadUser';

const Navbar = () => {
  const { user, loading: _loading } = useLoadUser(); // ✅ properly destructured
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
    window.dispatchEvent(new Event('userChanged')); // ✅ notify hook
  };

  return (
    <nav className="bg-white shadow-md fixed left-0 right-0 top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-black transition-colors"
        >
          Product Hunt
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-9 h-9 cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="User Avatar"
                    />
                    <AvatarFallback className="text-sm font-semibold">
                      {user.name?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 p-2 rounded-xl shadow-lg bg-white border">
                  <DropdownMenuLabel className="text-sm font-bold text-gray-700">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-sm text-gray-600">
                    👤 <span className="ml-2">Name: {user?.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm text-gray-600">
                    📧 <span className="ml-2">Email: {user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button
                      variant="destructive"
                      className="w-full mt-1"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/addproduct">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition px-5 flex items-center">
                  <FiPlusCircle className="text-lg mr-2" />
                  Add New Product
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-black transition flex items-center"
                >
                  <FiLogIn className="text-lg mr-2" />
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-black text-white hover:bg-gray-900 transition flex items-center">
                  <FiUserPlus className="text-lg mr-2" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
