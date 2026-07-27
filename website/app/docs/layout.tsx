import { Sidebar } from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex gap-8">
        <Sidebar />
        <main className="flex-1 min-w-0 max-w-4xl">{children}</main>
      </div>
    </div>
  );
}
