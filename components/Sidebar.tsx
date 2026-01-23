/**
 * 📚 Sidebar Component
 * 
 * Main navigation sidebar displaying:
 * - Logo (with light/dark mode variants)
 * - Theme toggle button
 * - Documentation links grouped by category
 * 
 * This is a Client Component because it uses usePathname for active link detection.
 * Categories and docs are passed as props from the parent layout.
 * 
 * @example
 * // In layout.tsx
 * const groups = getDocsGrouped();
 * <Sidebar groups={groups} />
 * 
 * // With navigation callback (for mobile nav)
 * <Sidebar groups={groups} onNavigate={() => setMobileMenuOpen(false)} />
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { siteConfig } from '@/config/site';

/** Document metadata for sidebar links */
interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}

/** Group of documents under a category */
interface DocGroup {
  category: string;
  docs: DocMeta[];
}

/** Props for the Sidebar component */
interface SidebarProps {
  /** Array of document groups organized by category */
  groups: DocGroup[];
  /** Optional callback when a navigation link is clicked (useful for closing mobile menu) */
  onNavigate?: () => void;
}

export function Sidebar({ groups, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname === '/' ? siteConfig.navigation.homeSlug : pathname.slice(1);

  return (
    <nav className="w-[var(--sidebar-width)] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-bg-subtle)]/50 overflow-y-auto h-full">
      <div className="sticky top-0 bg-[var(--color-bg-subtle)]/95 backdrop-blur-sm border-b border-[var(--color-border)] px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={onNavigate}>
            <img 
              src={siteConfig.logo.light}
              alt={siteConfig.logo.alt}
              className="h-10 w-auto dark:hidden"
            />
            <img 
              src={siteConfig.logo.dark}
              alt={siteConfig.logo.alt}
              className="h-10 w-auto hidden dark:block"
            />
          </Link>
          <ThemeToggle />
        </div>
      </div>
      
      <div className="px-3 py-4 space-y-6">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="px-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
              {group.category}
            </h3>
            <ul className="space-y-0.5">
              {group.docs.map((doc) => {
                const isActive = currentSlug === doc.slug;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={`/${doc.slug}`}
                      onClick={onNavigate}
                      className={`
                        block px-3 py-2 rounded-[var(--radius-md)] text-sm transition-colors
                        ${isActive 
                          ? 'bg-[var(--color-active-bg)] text-[var(--color-text)] font-medium' 
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover-bg)]'
                        }
                      `}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
