import { Fragment, type ReactNode } from "react";

/**
 * Lightweight markdown renderer for the prose stored in `content/*.json`.
 *
 * Supports the only constructs that actually appear in our content:
 *   - paragraphs (split on blank lines)
 *   - inline links:  [label](https://…)
 *   - bare URLs:     https://… (auto-linked)
 *   - bold:          **text**
 *
 * Rendered as real, accessible <a> elements — every URL becomes clickable.
 */

type MarkdownTextProps = {
  text: string;
  className?: string;
  /** Tailwind classes applied to each <p>. */
  paragraphClassName?: string;
};

const LINK_CLASS =
  "font-medium text-[var(--accent-light)] underline decoration-[var(--accent-light)]/35 underline-offset-[3px] transition-colors hover:text-[var(--fg)] hover:decoration-[var(--fg)]";

// Matches: markdown links, bold spans, or bare URLs — in priority order.
const TOKEN_RE =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, linkLabel, linkUrl, boldText, bareUrl] = match;

    if (linkUrl) {
      nodes.push(
        <a
          className={LINK_CLASS}
          href={linkUrl}
          key={`${keyPrefix}-${i}`}
          rel="noreferrer"
          target="_blank"
        >
          {linkLabel}
        </a>
      );
    } else if (boldText) {
      nodes.push(
        <strong className="font-semibold text-[var(--fg)]" key={`${keyPrefix}-${i}`}>
          {boldText}
        </strong>
      );
    } else if (bareUrl) {
      nodes.push(
        <a
          className={LINK_CLASS}
          href={bareUrl}
          key={`${keyPrefix}-${i}`}
          rel="noreferrer"
          target="_blank"
        >
          {bareUrl}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
    i += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function MarkdownText({
  text,
  className,
  paragraphClassName
}: MarkdownTextProps) {
  const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <div className={className}>
      {paragraphs.map((para, i) => (
        <p className={paragraphClassName} key={i}>
          {renderInline(para, `p${i}`).map((node, j) => (
            <Fragment key={j}>{node}</Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
