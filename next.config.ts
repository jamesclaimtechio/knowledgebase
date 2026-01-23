import type { NextConfig } from "next";

/**
 * 🔧 NEXT.JS CONFIGURATION
 * 
 * This file configures Next.js build and runtime behavior.
 * Most settings here are optimized for documentation sites.
 */

const nextConfig: NextConfig = {
  /**
   * Image optimization configuration
   * Currently disabled for static export compatibility
   */
  images: {
    unoptimized: true,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DEPLOYMENT CONFIGURATIONS (Choose one based on your hosting)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * 📦 FOR STATIC EXPORT (GitHub Pages, Netlify, S3, etc.)
   * Uncomment this line to generate static HTML files in the /out folder:
   */
  // output: 'export',

  /**
   * 🌐 FOR GITHUB PAGES WITH CUSTOM REPOSITORY NAME
   * If deploying to https://username.github.io/repo-name/, uncomment and set:
   */
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name',

  /**
   * ▲ FOR VERCEL (Default)
   * No additional config needed - just push to GitHub and connect in Vercel
   */
};

export default nextConfig;
