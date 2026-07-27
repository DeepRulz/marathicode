import { DocContent } from "@/components/DocContent";
import { DOC_TOPICS } from "@/lib/docs-data";

export function generateStaticParams() {
  return DOC_TOPICS.map((topic) => ({
    slug: [topic.slug],
  }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0] || "getting-started";
  return <DocContent slug={slug} />;
}
