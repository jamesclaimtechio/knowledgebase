/**
 * 🎨 CENTRAL SITE CONFIGURATION
 * 
 * This is the main configuration hub for your documentation site.
 * The AI assistant will help you customize these values for your project.
 * 
 * ⚠️ IMPORTANT: Replace all "TODO:" values with your actual content
 */

export const siteConfig = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SITE IDENTITY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * TODO: Your site/product name (used in header and meta tags)
   * Example: "Acme Corp" or "My Product"
   */
  name: "Knowledge Base",
  
  /**
   * TODO: Main title for the documentation site
   * This appears in the browser tab and meta tags
   * Example: "Acme Documentation" or "Help Center"
   */
  title: "Knowledge Base",
  
  /**
   * TODO: Template for page titles
   * %s will be replaced with the page title
   * Example: "%s | Acme Docs" becomes "Getting Started | Acme Docs"
   */
  titleTemplate: "%s | Docs",
  
  /**
   * TODO: Short description of your documentation (for SEO)
   * Keep it under 160 characters for best SEO results
   * Example: "Complete guides and API reference for Acme products"
   */
  description: "Documentation and guides for your product or project.",
  
  /**
   * TODO: Keywords for SEO (helps search engines understand your content)
   * Add 5-10 relevant keywords
   * Example: ["api", "sdk", "integration", "tutorial", "reference"]
   */
  keywords: ["documentation", "knowledge base", "guides", "help"],

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOGO CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  logo: {
    /**
     * TODO: Path to your logo for LIGHT mode (typically dark-colored logo)
     * Place your logo file in the /public folder
     * Recommended: SVG format for scalability, or PNG with transparent background
     * Size: Height ~40-60px, width proportional
     * Example: "/logo.svg" or "/acme-logo-dark.png"
     */
    light: "/TODO-logo-light.png",
    
    /**
     * TODO: Path to your logo for DARK mode (typically light-colored logo)
     * If you only have one logo, use the same path for both light and dark
     * Example: "/logo-light.svg" or "/acme-logo-white.png"
     */
    dark: "/TODO-logo-dark.png",
    
    /**
     * TODO: Alt text for logo (accessibility)
     * Example: "Acme Corp Logo"
     */
    alt: "Logo",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // THEME CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  theme: {
    /**
     * Default theme when user first visits
     * Options: "light" or "dark"
     */
    default: "light" as const,
    
    /**
     * Local storage key for persisting theme preference
     * You can keep this as-is unless you have multiple apps sharing storage
     */
    storageKey: "docs-theme",
    
    /**
     * Enable system theme preference detection
     * When true, uses user's OS theme preference by default
     */
    enableSystem: false,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // NAVIGATION CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  navigation: {
    /**
     * TODO: The slug of the page to show when visiting the root (/)
     * This should match the "slug" field in one of your markdown files
     * Example: "introduction" or "welcome"
     */
    homeSlug: "getting-started",
    
    /**
     * Label for the sidebar section
     * Usually "Documentation", "Docs", or "Guides"
     */
    sidebarLabel: "Docs",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SIDEBAR CATEGORY CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  /**
   * Documents are automatically grouped into categories based on their "order" value
   * 
   * How it works:
   * - A doc with order: 1 falls into the first category that includes 1 in its range
   * - A doc with order: 15 falls into the category with range [11, 50]
   * 
   * TODO: Customize category names and ranges to match your content structure
   * 
   * Examples:
   * - Product docs: ["Overview" (1-5), "Features" (6-20), "API" (21-50)]
   * - Help center: ["Getting Started" (1-10), "Common Tasks" (11-30), "Troubleshooting" (31-50)]
   */
  sidebar: {
    categories: [
      { name: "Getting Started", orderRange: [1, 10] as const },
      { name: "Guides", orderRange: [11, 50] as const },
      { name: "Reference", orderRange: [51, 100] as const },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
