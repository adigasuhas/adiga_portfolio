import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");

export type WritingMeta = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  published?: boolean;
  readingTime?: string;
};

async function fileExists(target: string) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

export async function getAllWritingMeta() {
  if (!(await fileExists(WRITINGS_DIR))) {
    return [];
  }

  const entries = await fs.readdir(WRITINGS_DIR);
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".md") || entry.endsWith(".mdx"))
      .map(async (entry) => {
        const source = await fs.readFile(path.join(WRITINGS_DIR, entry), "utf8");
        const { data, content } = matter(source);
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(wordCount / 220));

        return {
          slug: entry.replace(/\.mdx?$/, ""),
          title: typeof data.title === "string" ? data.title : entry.replace(/\.mdx?$/, ""),
          description: typeof data.description === "string" ? data.description : undefined,
          date: typeof data.date === "string" ? data.date : undefined,
          published: data.published !== false,
          readingTime: `${minutes} min read`
        } satisfies WritingMeta;
      })
  );

  return posts
    .filter((post) => post.published)
    .sort((left, right) => (right.date ?? "").localeCompare(left.date ?? ""));
}

export async function getWritingSource(slug: string) {
  const candidates = [`${slug}.mdx`, `${slug}.md`];

  for (const candidate of candidates) {
    const absolutePath = path.join(WRITINGS_DIR, candidate);
    if (await fileExists(absolutePath)) {
      return fs.readFile(absolutePath, "utf8");
    }
  }

  return null;
}
