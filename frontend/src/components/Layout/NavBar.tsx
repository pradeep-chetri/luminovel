"use client";

import { ChevronDown, SearchIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);

    queueMicrotask(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="max-w-8xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-y-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <Image
              src="/logo/logo_1.png"
              alt="LuminaNovels Logo"
              width={55}
              height={55}
              className="rounded-full"
            />
            <h3 className="text-2xl font-bold hidden sm:block">
              Lumina
              <span className="text-primary">NOVELS</span>
            </h3>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1 font-medium">
              <li>
                <Link
                  href="/browse"
                  className="px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
                >
                  Browse All
                </Link>
              </li>
              <li className="relative group">
                <button className="px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors flex items-center gap-1">
                  Genre
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <ul className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-border bg-background shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 z-10">
                  {["Fantasy", "Romance", "Sci-Fi", "Adventure", "Drama"].map(
                    (genre) => (
                      <li key={genre}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-foreground hover:bg-secondary/20 rounded-lg transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {genre}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </li>
              <li>
                <Link
                  href="/rankings"
                  className="px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
                >
                  Ranking
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
                >
                  Library
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right: Search + Auth - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-secondary/20"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          )}

          {/* Search */}
          <form className="flex items-center border border-border rounded-xl overflow-hidden shadow-sm bg-card">
            <Input
              className="border-none focus-visible:ring-0 px-4 py-2 w-56 bg-transparent"
              placeholder="Search novels..."
            />
            <Button
              type="submit"
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-none"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </form>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl bg-transparent">
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="max-w-8xl mx-auto px-4 py-4 space-y-3">
            <Link
              href="/browse"
              className="block px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
            >
              Browse All
            </Link>

            {/* Mobile Genre Dropdown */}
            <div>
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="w-full text-left px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors flex items-center justify-between"
              >
                Genre
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${genreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {genreOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {["Fantasy", "Romance", "Sci-Fi", "Adventure", "Drama"].map(
                    (genre) => (
                      <Link
                        key={genre}
                        href="#"
                        className="block px-4 py-2 rounded-md text-sm text-foreground hover:bg-secondary/20 transition-colors"
                      >
                        {genre}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>

            <Link
              href="/rankings"
              className="block px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
            >
              Ranking
            </Link>
            <Link
              href="/library"
              className="block px-4 py-2 rounded-md text-foreground hover:bg-secondary/20 transition-colors"
            >
              Library
            </Link>

            <div className="pt-4 border-t border-border space-y-3">
              <form className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                <Input
                  className="border-none focus-visible:ring-0 px-3 py-2 flex-1 bg-transparent text-sm"
                  placeholder="Search..."
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 rounded-none h-9 w-9"
                >
                  <SearchIcon className="w-4 h-4" />
                </Button>
              </form>

              <div className="flex gap-2">
                {mounted && (
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="flex-1 bg-transparent"
                  >
                    {theme === "light" ? (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" className="flex-1 bg-transparent">
                  Login
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
