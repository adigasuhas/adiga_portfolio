import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

async function readJson<T>(relativePath: string): Promise<T> {
  const raw = await fs.readFile(path.join(ROOT, relativePath), "utf8");
  return JSON.parse(raw) as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  number: number;
  slug: string;
  title: string;
  degree: "B.Sc." | "M.S." | "Ph.D.";
  status: "published" | "manuscript-in-preparation" | "manuscript-in-review";
  image: string;
  summary: string;
  description: string;
  resources: { label: string; url: string }[];
  citation: string | null;
  paperUrl: string | null;
};

export type Publication = {
  id: string;
  number: number;
  authors: string;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  article?: string;
  pages?: string;
  year: number;
  doi: string;
  repository?: string;
  cover: string;
};

export type Thesis = {
  id: string;
  title: string;
  degree: string;
  authors: string;
  year: number;
  institution: string;
  cover: string;
  driveUrl: string | null;
};

export type Award = {
  id: string;
  title: string;
  description: string;
  organization: string;
  year: number;
  month: string;
  logo: string | null;
};

export type ConferenceImage = {
  src: string;
  caption: string;
};

export type Conference = {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  location: string;
  date: string;
  images: ConferenceImage[];
};

export type ResourceItem = {
  label: string;
  url: string;
  description: string;
};

export type ResourceCategory = {
  heading: string | null;
  items: ResourceItem[];
};

export type Resource = {
  id: string;
  title: string;
  logo: string | null;
  description: string | null;
  link: { label: string; url: string } | null;
  categories: ResourceCategory[];
  note: string | null;
};

export type TimelineEntry = {
  id: string;
  institution: string;
  degree: string;
  years: string;
  logo: string;
  upcoming?: boolean;
};

export type ContactLink = {
  label: string;
  url: string;
};

export type SiteData = {
  about: {
    name: string;
    headline: string;
    portrait: string;
    biography: string;
    cvUrl: string;
    emails: string[];
    links: ContactLink[];
  };
  timeline: TimelineEntry[];
  researchInterest: { prose: string; projectsIntro?: string };
  projects: Project[];
  publications: Publication[];
  theses: Thesis[];
  awards: Award[];
  conferences: Conference[];
  resources: Resource[];
  resourcesIntro: string;
  contact: {
    biography: string;
    address: string;
    photography: ConferenceImage[];
  };
};

// ─── Loaders ──────────────────────────────────────────────────────────────────

async function loadProjects(): Promise<Project[]> {
  const dir = path.join(ROOT, "content/projects");
  const files = await fs.readdir(dir);
  const projects = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map((f) => readJson<Project>(path.join("content/projects", f)))
  );
  return projects.sort((a, b) => b.number - a.number);
}

const MONTH_ORDER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

export const getSiteData = cache(async (): Promise<SiteData> => {
  // Array-content files are stored as `{ "<key>": [...] }` so Decap CMS can
  // edit them as `list` widgets (with drag-to-reorder). We unwrap them here.
  const [about, timelineDoc, researchInterest, projects, publicationsDoc, thesesDoc, awardsDoc, conferencesDoc, resourcesDoc, contact] =
    await Promise.all([
      readJson<SiteData["about"]>("content/about.json"),
      readJson<{ timeline: TimelineEntry[] }>("content/timeline.json"),
      readJson<{ prose: string; projectsIntro?: string }>("content/research-interest.json"),
      loadProjects(),
      readJson<{ publications: Publication[] }>("content/publications.json"),
      readJson<{ theses: Thesis[] }>("content/theses.json"),
      readJson<{ awards: Award[] }>("content/awards.json"),
      readJson<{ conferences: Conference[] }>("content/conferences.json"),
      readJson<{ intro?: string; resources: Resource[] }>("content/resources.json"),
      readJson<SiteData["contact"]>("content/contact.json"),
    ]);

  const timeline = timelineDoc.timeline;
  const publications = publicationsDoc.publications;
  const theses = thesesDoc.theses;
  const awards = awardsDoc.awards;
  const conferences = conferencesDoc.conferences;
  const resources = resourcesDoc.resources;
  const resourcesIntro = resourcesDoc.intro ?? "";

  // Newest first across the board.
  const sortedPublications = [...publications].sort((a, b) => b.number - a.number);
  const sortedAwards = [...awards].sort(
    (a, b) =>
      b.year - a.year ||
      (MONTH_ORDER[b.month?.toLowerCase()] ?? 0) - (MONTH_ORDER[a.month?.toLowerCase()] ?? 0)
  );
  const sortedConferences = [...conferences].sort((a, b) => b.number - a.number);

  return {
    about,
    timeline,
    researchInterest,
    projects,
    publications: sortedPublications,
    theses,
    awards: sortedAwards,
    conferences: sortedConferences,
    resources,
    resourcesIntro,
    contact
  };
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const data = await getSiteData();
  return data.projects.find((p) => p.slug === slug) ?? null;
});
