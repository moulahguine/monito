"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative top-0 bg-secondary-500/15 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.svg"
              alt="Monito"
              width={112}
              height={28}
              priority
            />
          </Link>

          <nav className=" hidden md:flex items-center gap-6 font-bold ">
            <Link
              href="/"
              className="text-primary-500 hover:opacity-90 cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/category"
              className="text-primary-500 hover:opacity-90"
            >
              Category
            </Link>
            <Link href="/contact" className="text-primary-500 hover:opacity-90">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="rounded-full bg-secondary-500 px-4 py-2 text-neutral-100 font-semibold">
              Join the community
            </button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link href="#" className="py-2">
                Home
              </Link>
              <Link href="#" className="py-2">
                Category
              </Link>
              <Link href="#" className="py-2">
                About
              </Link>
              <Link href="#" className="py-2">
                Contact
              </Link>
              <button className="mt-2 rounded-full bg-secondary-500 px-4 py-2 text-neutral-100 text-center font-semibold">
                Join the community
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
