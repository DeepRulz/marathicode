"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DOC_TOPICS } from "@/lib/docs-data";

export function Sidebar() {
  const pathname = usePathname();

  const categories = ["Overview", "Core Language", "Control Flow & Functions", "Reference & Examples"] as const;

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 space-y-6">
      {categories.map((cat) => {
        const topics = DOC_TOPICS.filter((t) => t.category === cat);
        return (
          <div key={cat} className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
              {cat}
            </h4>
            <ul className="space-y-1">
              {topics.map((t) => {
                const href = `/docs/${t.slug}`;
                const isActive = pathname === href || (pathname === "/docs" && t.slug === "getting-started");
                return (
                  <li key={t.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "group flex flex-col px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A] dark:text-emerald-400 font-semibold border-l-2 border-[#43B02A]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <span className="text-gray-900 dark:text-white font-semibold group-hover:text-[#43B02A]">
                        {t.title}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-marathi-code">
                        {t.marathi}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
