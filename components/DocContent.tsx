/**
 * 📄 DocContent Component
 * 
 * Renders the main documentation content area including:
 * - Page title and description header
 * - Rendered markdown/HTML content
 * - Previous/Next navigation links
 * 
 * This is a Server Component - it receives pre-rendered HTML from the markdown processor.
 * Styling is applied via the .doc-content class defined in globals.css.
 * 
 * @example
 * <DocContent
 *   title="Getting Started"
 *   description="Learn how to set up the project"
 *   htmlContent="<h2>Introduction</h2><p>...</p>"
 *   prev={{ title: "Overview", slug: "overview", ... }}
 *   next={{ title: "Configuration", slug: "config", ... }}
 * />
 */

import Link from 'next/link';

/** Document metadata for navigation links */
interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}

/** Props for the DocContent component */
interface DocContentProps {
  /** Page title displayed in the header */
  title: string;
  /** Page description shown below the title */
  description: string;
  /** Pre-rendered HTML content from markdown */
  htmlContent: string;
  /** Previous document for navigation (null if first doc) */
  prev: DocMeta | null;
  /** Next document for navigation (null if last doc) */
  next: DocMeta | null;
}

export function DocContent({ title, description, htmlContent, prev, next }: DocContentProps) {
  return (
    <article className="min-w-0 flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-lg text-[var(--color-text-muted)]">
            {description}
          </p>
        </header>

        {/* Content */}
        <div 
          className="doc-content prose prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Navigation */}
        <nav className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <Link 
                href={`/${prev.slug}`}
                className="group flex-1 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-border-muted)] hover:bg-[var(--color-hover-bg)] transition-colors"
              >
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Previous</span>
                <span className="mt-1 block text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text)]">
                  ← {prev.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {next ? (
              <Link 
                href={`/${next.slug}`}
                className="group flex-1 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-border-muted)] hover:bg-[var(--color-hover-bg)] transition-colors text-right"
              >
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Next</span>
                <span className="mt-1 block text-[var(--color-text-secondary)] font-medium group-hover:text-[var(--color-text)]">
                  {next.title} →
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
