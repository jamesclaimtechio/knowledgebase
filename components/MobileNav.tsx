'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { siteConfig } from '@/config/site';

interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}

interface DocGroup {
  category: string;
  docs: DocMeta[];
}

interface MobileNavProps {
  groups: DocGroup[];
}

export function MobileNav({ groups }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[var(--mobile-header-height)] bg-[var(--color-surface)] border-b border-[var(--color-border)] z-[var(--z-fixed)] flex items-center px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="ml-3 flex items-center gap-2">
          <img 
            src={siteConfig.logo.light}
            alt={siteConfig.logo.alt}
            className="h-8 w-auto dark:hidden"
          />
          <img 
            src={siteConfig.logo.dark}
            alt={siteConfig.logo.alt}
            className="h-8 w-auto hidden dark:block"
          />
          <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            {siteConfig.navigation.sidebarLabel}
          </span>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[var(--z-modal)]">
          <div 
            className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[var(--sidebar-width)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] z-10"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Sidebar groups={groups} onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
