import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  marathiTitle?: string;
  description: string;
  icon: LucideIcon;
  color?: "green" | "blue" | "default";
}

export function FeatureCard({
  title,
  marathiTitle,
  description,
  icon: Icon,
  color = "default",
}: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl p-6 transition-all duration-300 bg-white dark:bg-[#111622] border border-gray-200 dark:border-gray-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1">
      
      {/* Icon Badge */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
          color === "green"
            ? "bg-emerald-50 dark:bg-emerald-950/60 text-[#43B02A]"
            : color === "blue"
            ? "bg-sky-50 dark:bg-sky-950/60 text-[#0E5A9C] dark:text-sky-400"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Title */}
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
        {marathiTitle && (
          <span className="text-xs font-semibold text-[#43B02A] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
            {marathiTitle}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

    </div>
  );
}
