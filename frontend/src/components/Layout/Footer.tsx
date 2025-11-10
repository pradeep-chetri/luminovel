"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E6E0F5] dark:border-neutral-800 bg-[#F9F5FF] dark:bg-[#0E0C1A] text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="max-w-8xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo_1.png"
              alt="LuminaNovels Logo"
              width={55}
              height={55}
              className="rounded-full"
            />
            <h3 className="text-xl font-semibold">
              Lumina
              <span className="text-[#6C63A6] dark:text-[#B8A9F3]">NOVELS</span>
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
            Discover a world of stories. Read novels, light novels, and original
            works across every genre — all in one elegant platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#6C63A6] dark:text-[#B8A9F3]">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {["Home", "Browse", "Ranking", "Library", "About Us"].map(
              (link, index) => (
                <li
                  key={index}
                  className="hover:text-[#6C63A6] dark:hover:text-[#B8A9F3] transition-colors cursor-pointer"
                >
                  {link}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Popular Genres */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#6C63A6] dark:text-[#B8A9F3]">
            Popular Genres
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              "Fantasy",
              "Romance",
              "Sci-Fi",
              "Mystery",
              "Adventure",
              "Drama",
            ].map((genre, index) => (
              <li
                key={index}
                className="hover:text-[#6C63A6] dark:hover:text-[#B8A9F3] transition-colors cursor-pointer"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#6C63A6] dark:text-[#B8A9F3]">
            Follow Us
          </h4>
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Youtube, href: "#" },
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="p-2 rounded-lg border border-[#E6E0F5] dark:border-neutral-700 hover:bg-[#F2ECFB] dark:hover:bg-neutral-800 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E6E0F5] dark:border-neutral-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-[#6C63A6] dark:text-[#B8A9F3]">
          LuminaNovels
        </span>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
}
