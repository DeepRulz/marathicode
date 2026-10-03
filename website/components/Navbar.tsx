"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Terminal, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#43B02A] to-[#0E5A9C] p-[2px] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-lg sprout-gradient-text">म</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
              MarathiCode
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
              by <span className="font-medium text-[#0E5A9C] dark:text-sky-400">Sprout Tech</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800 text-[#0E5A9C] dark:text-emerald-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#43B02A] hover:bg-[#389623] text-white font-medium text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Playground</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-6 space-y-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-[#43B02A] font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/playground"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#43B02A] text-white font-medium text-base shadow-sm"
            >
              <Terminal className="w-5 h-5" />
              <span>Launch Playground</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
