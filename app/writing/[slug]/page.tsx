import { notFound } from "next/navigation";

import { RichText } from "@/components/mdx/rich-text";
import { getAllWritingMeta, getWritingSource } from "@/lib/writings";

export async function generateStaticParams() {
  const posts = await getAllWritingMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = await getWritingSource(slug);

  if (!source) {
    notFound();
  }

  return (
    <main className="px-4 pb-16 sm:px-6 lg:px-10">
      <article className="mx-auto max-w-3xl py-20 sm:py-28">
        <RichText source={source} />
      </article>
    </main>
  );
}
