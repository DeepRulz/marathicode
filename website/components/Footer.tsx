import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-[#FAFAFA] dark:bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#43B02A] to-[#0E5A9C] p-[2px]">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[6px] flex items-center justify-center">
                  <span className="font-bold text-sm text-[#43B02A]">म</span>
                </div>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                MarathiCode
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>An language initiative by</span>
              <a
                href={siteConfig.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0E5A9C] dark:text-sky-400 hover:underline flex items-center gap-0.5"
              >
                Sprout Tech <ExternalLink className="w-3 h-3 inline" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-[#43B02A] dark:hover:text-emerald-400 transition-colors">
                  Documentation Hub
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-gray-600 dark:text-gray-400 hover:text-[#43B02A] dark:hover:text-emerald-400 transition-colors">
                  Interactive Playground
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-600 dark:text-gray-400 hover:text-[#43B02A] dark:hover:text-emerald-400 transition-colors">
                  Code Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation Topics */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Language Topics
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs/getting-started" className="text-gray-600 dark:text-gray-400 hover:text-[#0E5A9C] dark:hover:text-sky-400 transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/variables" className="text-gray-600 dark:text-gray-400 hover:text-[#0E5A9C] dark:hover:text-sky-400 transition-colors">
                  Variables & Data Types
                </Link>
              </li>
              <li>
                <Link href="/docs/functions" className="text-gray-600 dark:text-gray-400 hover:text-[#0E5A9C] dark:hover:text-sky-400 transition-colors">
                  Functions & Scope
                </Link>
              </li>
              <li>
                <Link href="/docs/keywords" className="text-gray-600 dark:text-gray-400 hover:text-[#0E5A9C] dark:hover:text-sky-400 transition-colors">
                  Keywords Reference
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            © {new Date().getFullYear()} MarathiCode. Author: <span className="font-medium text-gray-700 dark:text-gray-300">Deep Shah</span>.
          </div>
          {/* <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Powered by <span className="font-semibold text-[#43B02A]">Sprout Tech</span>
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
