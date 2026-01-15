/**
 * Central configuration for the documentation site.
 * Edit this file to customize the template for your knowledge base.
 */

export const siteConfig = {
  // Site identity
  name: "Knowledge Base",
  title: "Knowledge Base",
  titleTemplate: "%s | Docs",
  description: "Documentation and guides for your product or project.",
  keywords: ["documentation", "knowledge base", "guides", "help"],

  // Logo configuration
  logo: {
    light: "/Template Logo black text.png",  // Used in light mode
    dark: "/Template Logo white text.png",   // Used in dark mode
    alt: "Logo",
  },

  // Theme configuration
  theme: {
    default: "light" as const,
    storageKey: "docs-theme",
    enableSystem: false,
  },

  // Navigation configuration
  navigation: {
    homeSlug: "getting-started",
    sidebarLabel: "Docs",
  },

  // Sidebar category configuration
  // Documents are grouped by their `order` frontmatter value
  sidebar: {
    categories: [
      { name: "Getting Started", orderRange: [1, 10] as const },
      { name: "Guides", orderRange: [11, 50] as const },
      { name: "Reference", orderRange: [51, 100] as const },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
