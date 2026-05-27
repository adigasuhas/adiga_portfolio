import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { mdxComponents } from "@/components/mdx/mdx-components";
import { cn } from "@/lib/utils";

type RichTextProps = {
  source: string;
  className?: string;
};

export async function RichText({ source, className }: RichTextProps) {
  const normalizedSource = source
    .replace(/\\\((.+?)\\\)/g, (_match, expression: string) => `$${expression}$`)
    .replace(/\\\[([\s\S]+?)\\\]/g, (_match, expression: string) => `$$\n${expression}\n$$`);

  const { content } = await compileMDX({
    source: normalizedSource,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
          [
            rehypePrettyCode,
            {
              theme: "github-light",
              keepBackground: false
            }
          ]
        ]
      }
    }
  });

  return <div className={cn("prose-shell", className)}>{content}</div>;
}
