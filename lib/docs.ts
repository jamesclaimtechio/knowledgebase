/**
 * 📄 DOCUMENTATION UTILITIES
 * 
 * This module handles reading, parsing, and organizing markdown documentation.
 * It reads files from the /content folder and extracts frontmatter metadata.
 * 
 * Key functions:
 * - getAllDocsMeta() - Get all doc metadata for sidebar navigation
 * - getDocBySlug(slug) - Get a single document by its URL slug
 * - getDocsGrouped() - Get docs organized by category
 * - extractHeadings(content) - Extract H2/H3 headings for table of contents
 * 
 * Frontmatter fields required in each .md file:
 * - title: Page title (shown in sidebar and browser tab)
 * - description: SEO description
 * - slug: URL path for the page
 * - order: Numeric value for sorting and category assignment
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '@/config/site';

/** Path to the content directory containing markdown files */
const contentDirectory = path.join(process.cwd(), 'content');

export interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
}

export interface Doc extends DocMeta {
  content: string;
}

export interface DocWithHeadings extends Doc {
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Get all document slugs for static path generation
 */
export function getAllDocSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fileContents = fs.readFileSync(
        path.join(contentDirectory, file),
        'utf8'
      );
      const { data } = matter(fileContents);
      return data.slug as string;
    });
}

/**
 * Get metadata for all documents, sorted by order
 */
export function getAllDocsMeta(): DocMeta[] {
  const files = fs.readdirSync(contentDirectory);
  
  const docs = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fileContents = fs.readFileSync(
        path.join(contentDirectory, file),
        'utf8'
      );
      const { data } = matter(fileContents);
      return {
        title: data.title as string,
        description: data.description as string,
        slug: data.slug as string,
        order: data.order as number,
      };
    });
  
  return docs.sort((a, b) => a.order - b.order);
}

/**
 * Get a single document by slug
 */
export function getDocBySlug(slug: string): Doc | null {
  const files = fs.readdirSync(contentDirectory);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const fileContents = fs.readFileSync(
      path.join(contentDirectory, file),
      'utf8'
    );
    const { data, content } = matter(fileContents);
    
    if (data.slug === slug) {
      return {
        title: data.title as string,
        description: data.description as string,
        slug: data.slug as string,
        order: data.order as number,
        content,
      };
    }
  }
  
  return null;
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create slug from heading text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    headings.push({ id, text, level });
  }
  
  return headings;
}

/**
 * Get document with extracted headings
 */
export function getDocWithHeadings(slug: string): DocWithHeadings | null {
  const doc = getDocBySlug(slug);
  if (!doc) return null;
  
  const headings = extractHeadings(doc.content);
  return { ...doc, headings };
}

/**
 * Get all documents with full content (for search indexing)
 */
export function getAllDocsForSearch(): Doc[] {
  const files = fs.readdirSync(contentDirectory);
  
  const docs = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fileContents = fs.readFileSync(
        path.join(contentDirectory, file),
        'utf8'
      );
      const { data, content } = matter(fileContents);
      return {
        title: data.title as string,
        description: data.description as string,
        slug: data.slug as string,
        order: data.order as number,
        content,
      };
    });
  
  return docs.sort((a, b) => a.order - b.order);
}

/**
 * Get navigation structure with prev/next links
 */
export function getDocNavigation(slug: string): {
  prev: DocMeta | null;
  next: DocMeta | null;
} {
  const allDocs = getAllDocsMeta();
  const currentIndex = allDocs.findIndex((doc) => doc.slug === slug);
  
  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
  };
}

/**
 * Group docs by category for sidebar based on order ranges defined in config
 */
export function getDocsGrouped(): { category: string; docs: DocMeta[] }[] {
  const allDocs = getAllDocsMeta();
  
  return siteConfig.sidebar.categories.map(({ name, orderRange }) => ({
    category: name,
    docs: allDocs.filter((doc) => doc.order >= orderRange[0] && doc.order <= orderRange[1]),
  }));
}
