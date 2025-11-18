"use client";

import { useCartStore } from "@/store/cart-store";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathname.startsWith("/auth")) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
        >
          Shoppigo
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>

          <Link href="/Products" className="hover:text-blue-600 transition-colors duration-200">
            Products
          </Link>

          <Link href="/Checkout" className="hover:text-blue-600 transition-colors duration-200">
            Checkout
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {/* Cart */}
          <Link href="/Checkout" className="relative group">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Button Desktop */}
          <Link href="/auth/login" className="hidden md:block">
            <Button className="px-6 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700">
              Login
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            className="md:hidden hover:bg-transparent focus-visible:ring-0"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-100 transition-all animate-fade-in-down">
          <ul className="flex flex-col p-4 space-y-3 text-gray-700 font-medium">
            <li>
              <Link
                href="/"
                className="block px-2 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/Products"
                className="block px-2 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/Checkout"
                className="block px-2 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                Checkout
              </Link>
            </li>

            {/* Login Button Mobile */}
            <li>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                <Button className="w-full rounded-full bg-gray-600 text-white hover:bg-gray-700 py-2">
                  Login
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
