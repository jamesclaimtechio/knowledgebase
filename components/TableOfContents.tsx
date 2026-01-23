/**
 * 📑 TableOfContents Component
 * 
 * Displays a sidebar navigation for the current page's headings.
 * Automatically highlights the heading currently in view.
 * 
 * Features:
 * - Shows H2 and H3 headings extracted from the document
 * - Uses IntersectionObserver for scroll-spy behavior
 * - Nested display for H3 (indented under H2)
 * - Smooth scroll on click
 * 
 * Headings are extracted by lib/docs.ts extractHeadings() function.
 * 
 * @example
 * // In a page component
 * const doc = getDocWithHeadings(slug);
 * <TableOfContents headings={doc.headings} />
 */

'use client';

import { useEffect, useState } from 'react';

/** Heading structure from markdown document */
interface Heading {
  /** HTML id attribute for linking */
  id: string;
  /** Display text of the heading */
  text: string;
  /** Heading level (2 for H2, 3 for H3) */
  level: number;
}

/** Props for the TableOfContents component */
interface TableOfContentsProps {
  /** Array of headings extracted from the document */
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="mt-6">
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              style={{ paddingLeft: heading.level === 3 ? 'var(--space-3)' : '0' }}
            >
              <a
                href={`#${heading.id}`}
                className={`
                  block py-1 transition-colors
                  ${activeId === heading.id
                    ? 'text-[var(--color-text-secondary)] font-medium'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;
