import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const CONTENT_FILES = {
  about: "Page-1/About.md",
  awards: "Page-1/Awards.md",
  bachelors: "Page-2/Bachelors_Projects.md",
  masters: "Page-2/Masters_Projects.md",
  publications: "Page-3/Publications.md",
  conferences: "Page-3/Conferences.md",
  resources: "Page-4/Useful_resources.md",
  contact: "Page-5/Contact.md"
} as const;

export type Project = {
  id: string;
  slug: string;
  title: string;
  preview: string;
  description: string;
  rawContent: string;
  resources: { label: string; url: string }[];
  citation?: string;
  paperUrl?: string;
  image?: string | null;
  projectNumber: number;
};

export type Publication = {
  id: string;
  text: string;
  doi?: string;
  repository?: string;
};

export type ConferenceImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ResourceSection = {
  title: string;
  content: string;
};

export type ContactLink = {
  label: string;
  url: string;
};

export type HomePageData = {
  profile: {
    name: string;
    portrait: string | null;
    about: string;
    aboutParagraphs: string[];
    awards: string[];
    emails: string[];
  };
  research: {
    projects: Project[];
  };
  scholarship: {
    publications: Publication[];
    conferences: string[];
    gallery: ConferenceImage[];
  };
  resources: {
    sections: ResourceSection[];
    logo: string | null;
  };
  contact: {
    biography: string;
    details: string;
    photography: ConferenceImage[];
    links: ContactLink[];
  };
};

async function read(relativePath: string) {
  const absolutePath = path.join(ROOT, relativePath);
  return fs.readFile(absolutePath, "utf8");
}

async function assetExists(relativePath: string) {
  try {
    await fs.access(path.join(ROOT, "public", "assets", relativePath));
    return true;
  } catch {
    return false;
  }
}

function assetUrl(relativePath: string) {
  return `/assets/${relativePath.split(path.sep).join("/")}`;
}

function normalizeMarkdown(source: string) {
  return source.replace(/\r\n/g, "\n").trim();
}

function removeLeadingHeading(source: string) {
  return normalizeMarkdown(source).replace(/^# .+\n+/, "").trim();
}

function splitTopLevelSections(source: string) {
  const normalized = normalizeMarkdown(source);
  const matches = [...normalized.matchAll(/^#\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index ?? 0;
    const bodyStart = start + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? normalized.length : normalized.length;
    const content = normalized.slice(bodyStart, end).trim();

    return { title, content };
  });
}

function extractSection(source: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?:^|\\n)##\\s+${escaped}\\r?\\n([\\s\\S]*?)(?=(?:\\n##\\s+)|$)`);
  return source.match(pattern)?.[1]?.trim() ?? "";
}

function removeSection(source: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?:^|\\n)##\\s+${escaped}\\r?\\n[\\s\\S]*?(?=(?:\\n##\\s+)|$)`);
  return source.replace(pattern, "").trim();
}

function markdownLinks(source: string) {
  return [...source.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    label: match[1].trim(),
    url: match[2].trim()
  }));
}

function stripMarkdown(source: string) {
  return source
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[`>#-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractUrls(source: string) {
  return [...source.matchAll(/https?:\/\/[^\s)]+/g)].map((match) => match[0]);
}

function removeStandaloneUrls(source: string) {
  return source
    .replace(/\s*\[[^\]]*https?:\/\/[^\]]+\]\s*/g, " ")
    .replace(/\s*\(https?:\/\/[^)]+\)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function cleanCitationText(source: string) {
  return source
    .replace(/\s*\[[^\]]+\]\([^)]+\)\s*/g, " ")
    .replace(/\s*\[[^\]]*https?:\/\/[^\]]+\]\s*/g, " ")
    .replace(/\s*\(https?:\/\/[^)]+\)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function listItems(source: string) {
  const lines = source.split("\n");
  const items: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    if (/^- /.test(trimmed)) {
      items.push(trimmed.replace(/^- /, "").trim());
      continue;
    }

    if (items.length > 0) {
      items[items.length - 1] = `${items[items.length - 1]} ${trimmed}`.trim();
    }
  }

  return items;
}

function numberedItems(source: string) {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[\d+\]/.test(line) || /^\d+\.?\s/.test(line))
    .map((line) => line.replace(/^\[\d+\]\s*/, "").replace(/^\d+\.?\s*/, "").trim());
}

function decodeObfuscatedEmail(value: string) {
  return value.replace(/<at>/g, "@").replace(/<dot>/g, ".");
}

function decodeGoogleRedirect(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("google.com") && parsed.searchParams.get("q")) {
      return parsed.searchParams.get("q") ?? url;
    }
  } catch {
    return url;
  }

  return url;
}

function bracketImageEntries(source: string) {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\[[^\]]+\]/.test(line))
    .map((line) => {
      const match = line.match(/^\[([^\]]+)\]\s*(.+)$/);
      return match
        ? {
            file: match[1].trim(),
            caption: match[2].trim()
          }
        : null;
    })
    .filter((item): item is { file: string; caption: string } => Boolean(item));
}

function cleanHeadingNumber(title: string) {
  return title.replace(/^\d+\]\s*/, "").trim();
}

function splitSecondarySections(source: string) {
  const normalized = normalizeMarkdown(source);
  const matches = [...normalized.matchAll(/^##\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = match.index ?? 0;
    const bodyStart = start + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? normalized.length : normalized.length;
    const content = normalized.slice(bodyStart, end).trim();

    return { title, content };
  });
}

function previewProjectDescription(source: string, limit = 3) {
  const lines = source.split("\n");
  const previewLines: string[] = [];
  let bulletCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (previewLines.length > 0) {
        previewLines.push("");
      }
      continue;
    }

    if (/^- /.test(trimmed)) {
      if (bulletCount >= limit) {
        break;
      }

      previewLines.push(trimmed);
      bulletCount += 1;
      continue;
    }

    if (bulletCount > 0) {
      previewLines.push(trimmed);
      continue;
    }

    previewLines.push(trimmed);
  }

  return previewLines.join("\n").trim();
}

function prettifyInlineLinks(source: string) {
  return source
    .split("\n")
    .map((line) => {
      if (/\[[^\]]+\]\([^)]+\)/.test(line)) {
        return line;
      }

      let transformed = line.replace(
        /(^|[\s:])([A-Za-z0-9][^()\n]{0,140}?)\s*\((https?:\/\/[^)\s]+[^)]*)\)/g,
        (_match, prefix: string, label: string, url: string) => `${prefix}[${label.trim()}](${url})`
      );

      transformed = transformed.replace(
        /Link\s*\((https?:\/\/[^)\s]+[^)]*)\)\s*to\s*([^.\n]+)\.?/g,
        (_match, url: string, label: string) => `[Link to ${label.trim()}](${url}).`
      );

      return transformed;
    })
    .join("\n");
}

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  const [
    aboutRaw,
    awardsRaw,
    bachelorsRaw,
    mastersRaw,
    publicationsRaw,
    conferencesRaw,
    resourcesRaw,
    contactRaw
  ] = await Promise.all([
    read(CONTENT_FILES.about),
    read(CONTENT_FILES.awards),
    read(CONTENT_FILES.bachelors),
    read(CONTENT_FILES.masters),
    read(CONTENT_FILES.publications),
    read(CONTENT_FILES.conferences),
    read(CONTENT_FILES.resources),
    read(CONTENT_FILES.contact)
  ]);

  const about = removeLeadingHeading(aboutRaw);
  const aboutParagraphs = about.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const awards = listItems(removeLeadingHeading(awardsRaw)).map(stripMarkdown);

  const mastersProjects = await Promise.all(
    splitTopLevelSections(mastersRaw).map(async (section) => {
      const projectNumber = section.title.match(/^(\d+)\]/)?.[1] ?? section.title;
      const resourcesBlock = extractSection(section.content, "Resources");
      const citationBlock = extractSection(section.content, "Citation");
      const description = removeSection(removeSection(section.content, "Resources"), "Citation");
      let imagePath = "";
      const title = cleanHeadingNumber(section.title);
      if (title.includes("Superconductor Augmented World")) {
        imagePath = "Page-2/images/Masters/5_masters.png";
      } else if (title.includes("Study of Low Lattice Thermal Conductivity")) {
        imagePath = "Page-2/images/Masters/4_masters.png";
      } else if (title.includes("Vibrational and Raman Study")) {
        imagePath = "Page-2/images/Masters/3_masters.png";
      } else if (title.includes("Accelerating Search for Superconductors")) {
        imagePath = "Page-2/images/Masters/2_masters.png";
      } else {
        imagePath = `Page-2/images/Masters/${projectNumber}_masters.png`;
      }

      return {
        id: `masters-${projectNumber}`,
        slug: slugify(title),
        title,
        preview: previewProjectDescription(description),
        description,
        rawContent: section.content,
        resources: markdownLinks(resourcesBlock),
        citation: citationBlock ? stripMarkdown(cleanCitationText(citationBlock)) : undefined,
        paperUrl: extractUrls(citationBlock).find((url) => url.includes("doi.org") || url.includes("dx.doi.org")),
        image: assetUrl(imagePath),
        projectNumber: Number(projectNumber)
      } satisfies Project;
    })
  );

  const bachelorsImagePath = "Page-2/images/Bachelors/bachelors_project.gif";
  const bachelorsResources = markdownLinks(extractSection(bachelorsRaw, "Resources"));
  const bachelorsCitation = extractSection(bachelorsRaw, "Citation");
  const bachelorsProject: Project = {
    id: "bachelors-1",
    slug: slugify("Toy Model to Explain Superconductivity"),
    title: "Toy Model to Explain Superconductivity",
    preview: previewProjectDescription(removeSection(removeSection(removeLeadingHeading(bachelorsRaw), "Resources"), "Citation")),
    description: removeSection(removeSection(removeLeadingHeading(bachelorsRaw), "Resources"), "Citation"),
    rawContent: removeLeadingHeading(bachelorsRaw),
    resources: bachelorsResources,
    citation: bachelorsCitation ? stripMarkdown(cleanCitationText(bachelorsCitation)) : undefined,
    paperUrl: extractUrls(bachelorsCitation).find((url) => url.includes("doi.org") || url.includes("dx.doi.org")),
    image: assetUrl(bachelorsImagePath),
    projectNumber: 1
  };

  const publications = numberedItems(removeLeadingHeading(publicationsRaw)).map((entry, index) => {
    const urls = [...entry.matchAll(/\((https?:\/\/[^)]+)\)|\[(https?:\/\/[^\]]+)\]/g)].map((match) => match[1] ?? match[2]).filter(Boolean);

    return {
      id: `publication-${index + 1}`,
      text: stripMarkdown(removeStandaloneUrls(entry)),
      doi: urls.find((url) => url.includes("doi.org")),
      repository: urls.find((url) => url.includes("github.com"))
    } satisfies Publication;
  });

  const conferenceParts = conferencesRaw.split(/^# Images:\s*$/m);
  const conferenceList = numberedItems(removeLeadingHeading(conferenceParts[0] ?? ""));
  const conferenceImages = await Promise.all(
    bracketImageEntries(conferenceParts[1] ?? "").map(async (item) => {
      const relativePath = `Page-3/Images/${item.file}`;
      if (!(await assetExists(relativePath))) {
        return null;
      }

      return {
        src: assetUrl(relativePath),
        alt: item.caption,
        caption: item.caption
      } satisfies ConferenceImage;
    })
  );

  const resourceSections = splitSecondarySections(resourcesRaw)
    .map((section) => ({
      title: section.title,
      content: prettifyInlineLinks(section.content.trim())
    }));

  const logoPath = "Page-4/Images/Logo.jpg";

  const contactSections = splitTopLevelSections(contactRaw);
  const contactLookup = new Map(contactSections.map((section) => [section.title, section.content]));
  const emailBlock = contactLookup.get("REACH OUT TO ME AT :") ?? "";
  const photographyBlock = contactLookup.get("Through the Lens of My Nord CE3 Lite") ?? "";
  const detailsBlock = contactLookup.get("Contact / Copyright Infot") ?? "";
  const socialBlock = contactLookup.get("Other Details") ?? "";

  const photography = await Promise.all(
    bracketImageEntries(photographyBlock).map(async (item) => {
      const relativePath = `Page-5/Images/${item.file}`;
      if (!(await assetExists(relativePath))) {
        return null;
      }

      return {
        src: assetUrl(relativePath),
        alt: item.caption,
        caption: item.caption
      } satisfies ConferenceImage;
    })
  );

  const links = socialBlock
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\d+\.?\s*([^:]+):\s*(.+)$/);
      if (!match) {
        return null;
      }

      return {
        label: match[1].trim(),
        url: decodeGoogleRedirect(match[2].trim())
      } satisfies ContactLink;
    })
    .filter((item): item is ContactLink => Boolean(item));

  return {
    profile: {
      name: "Suhas Adiga",
      portrait: (await assetExists("Page-1/images/Suhas_Portfolio.jpg"))
        ? assetUrl("Page-1/images/Suhas_Portfolio.jpg")
        : null,
      about,
      aboutParagraphs,
      awards,
      emails: emailBlock
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map(decodeObfuscatedEmail)
    },
    research: {
      projects: [...mastersProjects, bachelorsProject]
    },
    scholarship: {
      publications,
      conferences: conferenceList,
      gallery: conferenceImages.filter((item): item is ConferenceImage => Boolean(item))
    },
    resources: {
      sections: resourceSections,
      logo: (await assetExists(logoPath)) ? assetUrl(logoPath) : null
    },
    contact: {
      biography: prettifyInlineLinks(contactLookup.get("Little Information on Me:") ?? ""),
      details: detailsBlock,
      photography: photography.filter((item): item is ConferenceImage => Boolean(item)),
      links
    }
  };
});

export const getProjectBySlug = cache(async (slug: string) => {
  const data = await getHomePageData();
  return data.research.projects.find((project) => project.slug === slug) ?? null;
});
