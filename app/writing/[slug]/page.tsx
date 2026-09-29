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
    <main className="shell pb-16">
      <article className="mx-auto max-w-3xl py-14 sm:py-24">
        <RichText source={source} />
      </article>
    </main>
  );
}
