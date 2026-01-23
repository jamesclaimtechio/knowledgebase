/**
 * 🔍 SearchDialog Component
 * 
 * Provides full-text search across all documentation pages.
 * Uses Fuse.js for fuzzy matching and keyboard navigation.
 * 
 * Features:
 * - Opens with Cmd+K (Mac) or Ctrl+K (Windows)
 * - Fuzzy search across title, description, headings, and content
 * - Keyboard navigation (arrows, enter, escape)
 * - Mobile-friendly floating button + modal
 * 
 * Also exports SearchTrigger for inline search buttons.
 * 
 * @example
 * // In a layout or page
 * <SearchDialog items={searchableItems} />
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

/** Structure for searchable documentation items */
interface SearchItem {
  title: string;
  slug: string;
  description: string;
  content: string;
  headings: string[];
}

/** Props for the SearchDialog component */
interface SearchDialogProps {
  /** Array of searchable items (all docs with content) */
  items: SearchItem[];
}

// Custom event name for opening search
const OPEN_SEARCH_EVENT = 'open-search-dialog';

// Inline search trigger for the right sidebar (xl+ screens)
export function SearchTrigger() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:border-[var(--color-border-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span>Search...</span>
      <kbd className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium bg-[var(--color-bg-subtle)] rounded-[var(--radius-sm)]">
        <span className="text-[var(--color-text-subtle)]">⌘</span>K
      </kbd>
    </button>
  );
}

export function SearchDialog({ items }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useRef(
    new Fuse(items, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'headings', weight: 2 },
        { name: 'content', weight: 1 },
      ],
      threshold: 0.3,
      minMatchCharLength: 2,
      ignoreLocation: true,
    })
  );

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }
    const searchResults = fuse.current.search(searchQuery, { limit: 8 });
    setResults(searchResults.map(r => r.item));
    setSelectedIndex(0);
  }, []);

  const handleSelect = useCallback((item: SearchItem) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    router.push(`/${item.slug}`);
  }, [router]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open with Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }

    // Close with Escape
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setResults([]);
    }
  }, []);

  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Listen for custom event from SearchTrigger
  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fixed button for mobile/tablet (hidden on xl+ where inline trigger is used)
  const fixedButton = !isOpen ? (
    <button
      onClick={() => setIsOpen(true)}
      className="xl:hidden fixed top-4 right-4 lg:top-6 lg:right-6 z-[var(--z-fixed)] flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:border-[var(--color-border-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium bg-[var(--color-bg-subtle)] rounded-[var(--radius-sm)]">
        <span className="text-[var(--color-text-subtle)]">⌘</span>K
      </kbd>
    </button>
  ) : null;

  if (!isOpen) {
    return fixedButton;
  }

  return (
    <div className="fixed inset-0 z-[var(--z-modal)]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
          setResults([]);
        }}
      />
      
      {/* Dialog */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl mx-auto px-4">
        <div 
          className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] border border-[var(--color-border)] overflow-hidden"
          onKeyDown={handleDialogKeyDown}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border)]">
            <svg className="w-5 h-5 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search documentation..."
              className="flex-1 py-4 text-base outline-none placeholder:text-[var(--color-text-subtle)] bg-transparent text-[var(--color-text)]"
            />
            <kbd className="px-2 py-1 text-xs text-[var(--color-text-subtle)] bg-[var(--color-bg-subtle)] rounded-[var(--radius-sm)]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.map((item, index) => (
                <button
                  key={item.slug}
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                    index === selectedIndex 
                      ? 'bg-[var(--color-active-bg)]' 
                      : 'hover:bg-[var(--color-hover-bg)]'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[var(--color-text)]">{item.title}</div>
                    <div className="text-sm text-[var(--color-text-muted)] truncate">{item.description}</div>
                  </div>
                  {index === selectedIndex && (
                    <div className="shrink-0 text-xs text-[var(--color-text-subtle)]">↵</div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-[var(--color-text-muted)]">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {/* Initial state */}
          {query.length < 2 && (
            <div className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">
              Type to search the documentation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
