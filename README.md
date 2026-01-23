# 📚 Knowledge Base Template

A modern, AI-friendly documentation site built with Next.js 16, Tailwind CSS 4, and markdown.

> **🤖 AI-Assisted Setup**: This template is optimized for setup with Cursor AI. Simply ask your AI assistant to help customize this template for your needs!

## ✨ Features

- 🌓 Dark/light mode with system preference support
- 🔍 Fast client-side search (⌘K)
- 💅 Syntax-highlighted code blocks with dual themes
- 📱 Fully responsive design
- 🚀 SEO optimized with meta tags
- 🎨 Centralized design system via CSS variables
- 📝 Markdown-based content with frontmatter

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

---

## ✅ Setup Checklist

Follow these steps to customize this template for your project. Ask your AI assistant to help with any step!

### Step 1: Site Configuration ⚙️
- [ ] Update site name and title in `config/site.ts`
- [ ] Add your site description and keywords for SEO
- [ ] Set your homepage slug (which doc shows first)
- [ ] Configure sidebar categories to match your content structure

### Step 2: Branding 🎨
- [ ] Replace logo files in `/public` folder
  - `TODO-logo-light.png` - For light mode (dark-colored logo)
  - `TODO-logo-dark.png` - For dark mode (light-colored logo)
- [ ] Update logo paths in `config/site.ts`
- [ ] Customize design tokens in `app/globals.css` (colors, fonts, spacing)

### Step 3: Content 📝
- [ ] Delete example markdown files in `/content`
- [ ] Add your own documentation files
- [ ] Ensure each file has required frontmatter (title, description, slug, order)
- [ ] Test that pages render correctly

### Step 4: Deployment 🚀
- [ ] Choose deployment platform (Vercel, GitHub Pages, or static export)
- [ ] Update `next.config.ts` for your chosen platform
- [ ] Set up repository on GitHub
- [ ] Configure deployment (see Deployment section below)
- [ ] Test live site

### Step 5: Final Touches ✨
- [ ] Update `package.json` with your project name and author
- [ ] Test search functionality
- [ ] Verify responsive design on mobile
- [ ] Check dark/light theme toggle
- [ ] Run `npm run build` to ensure no errors

---

## 📖 How to Use

### Adding Documentation Pages

1. **Create a markdown file** in the `content/` folder
2. **Name it** with a number prefix: `01-my-page.md`, `02-another-page.md`
3. **Add frontmatter** at the top:

```markdown
---
title: Your Page Title
description: Brief description for SEO (appears in search results)
slug: url-slug-for-this-page
order: 1
---

# Your Content Here

Write your documentation using markdown...
```

#### Frontmatter Fields Explained

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ Yes | Page title (shown in sidebar and browser tab) | `"Getting Started"` |
| `description` | ✅ Yes | SEO description (search engines, social media) | `"Learn how to set up..."` |
| `slug` | ✅ Yes | URL path for this page (no slashes) | `"getting-started"` |
| `order` | ✅ Yes | Determines position and category (see below) | `1` |

#### Understanding the `order` Field

The `order` field does two things:
1. **Positions** the page in the sidebar (lower numbers appear first)
2. **Categorizes** the page based on ranges defined in `config/site.ts`

Example with default categories:
- `order: 1-10` → "Getting Started" category
- `order: 11-50` → "Guides" category  
- `order: 51-100` → "Reference" category

### Customizing Site Identity

Edit **`config/site.ts`** to customize:

```typescript
export const siteConfig = {
  name: "Your Product Name",
  title: "Your Documentation Site",
  description: "Complete guides for Your Product",
  keywords: ["your", "relevant", "keywords"],
  // ... see file for all options
};
```

### Customizing Design & Colors

Edit **`app/globals.css`** to change colors, fonts, and spacing:

```css
:root {
  /* Background colors */
  --color-bg: #fafafa;
  --color-bg-subtle: #f4f4f5;
  
  /* Text colors */
  --color-text: #18181b;
  --color-primary: #your-brand-color;
  
  /* ...see file for complete design tokens */
}
```

All components use these CSS variables, so changing them updates the entire site.

---

## 📁 Project Structure

```
knowledgebase/
├── 📱 app/                           # Next.js App Router
│   ├── globals.css                   # 🎨 Design tokens (customize colors here!)
│   ├── layout.tsx                    # Root layout with sidebar
│   ├── page.tsx                      # Home (redirects to first doc)
│   └── [slug]/page.tsx               # Dynamic doc pages
│
├── 🧩 components/                    # React UI components
│   ├── Sidebar.tsx                   # Navigation sidebar
│   ├── DocContent.tsx                # Markdown renderer
│   ├── SearchDialog.tsx              # Search modal (⌘K)
│   ├── ThemeToggle.tsx               # Dark/light mode switch
│   └── ...                           # Other components
│
├── ⚙️ config/
│   └── site.ts                       # 🎯 MAIN CONFIG FILE - Start here!
│
├── 📝 content/                       # 📄 Your markdown documentation
│   ├── 01-getting-started.md         # Example: Delete and add your own
│   └── ...
│
├── 🔧 lib/                           # Utility functions
│   ├── docs.ts                       # Document loading & parsing
│   ├── markdown.ts                   # Markdown to HTML conversion
│   └── search.ts                     # Search index generation
│
└── 🖼️ public/                        # Static assets (logos, images)
    ├── TODO-logo-light.png           # ⚠️ Replace with your logo
    └── TODO-logo-dark.png            # ⚠️ Replace with your logo
```

---

## 🚢 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Perfect for:** Most users, automatic deployments, free tier available

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel auto-detects Next.js - just click "Deploy"
5. Done! Your site is live with automatic deployments on every push

**Custom Domain:** Add in Vercel dashboard → Project Settings → Domains

---

### Option 2: GitHub Pages (Free Static Hosting)

**Perfect for:** Free hosting, simple setup, open source projects

**Current Setup:** Already configured! Deployment workflow is in `.github/workflows/deploy.yml`

1. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Source: "GitHub Actions"

2. **Update `next.config.ts`:**
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',  // Enable static export
     basePath: '/your-repo-name',  // If not using custom domain
     assetPrefix: '/your-repo-name',
     images: { unoptimized: true },
   };
   ```

3. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

4. **Site will be live at:** `https://username.github.io/repo-name/`

**Custom Domain:** Add a `CNAME` file in `/public` with your domain

---

### Option 3: Static Export (Maximum Flexibility)

**Perfect for:** Netlify, AWS S3, Cloudflare Pages, any static host

1. **Update `next.config.ts`:**
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: { unoptimized: true },
   };
   ```

2. **Build static files:**
   ```bash
   npm run build
   ```
   
3. **Deploy the `/out` folder** to your hosting provider

**Popular Static Hosts:**
- **Netlify:** Drag & drop the `/out` folder to [netlify.com/drop](https://app.netlify.com/drop)
- **Cloudflare Pages:** Connect GitHub and select the `/out` folder
- **AWS S3:** Upload to S3 bucket with static website hosting enabled

---

## 🎨 Customization Examples

### Changing Colors

Edit `app/globals.css`:

```css
:root {
  --color-primary: #3b82f6;  /* Blue theme */
  --color-link: #3b82f6;
  --color-link-hover: #2563eb;
}
```

### Adding a New Category

Edit `config/site.ts`:

```typescript
sidebar: {
  categories: [
    { name: "Getting Started", orderRange: [1, 10] },
    { name: "Guides", orderRange: [11, 50] },
    { name: "API Reference", orderRange: [51, 100] },
    { name: "Troubleshooting", orderRange: [101, 150] },  // New!
  ],
}
```

### Using a Single Logo for Both Themes

In `config/site.ts`:

```typescript
logo: {
  light: "/my-logo.svg",
  dark: "/my-logo.svg",  // Same path = same logo for both
  alt: "My Company Logo",
}
```

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | React framework with App Router | 16.x |
| [React](https://react.dev/) | UI library | 19.x |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling | 4.x |
| [TypeScript](https://www.typescriptlang.org/) | Type safety | 5.x |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown frontmatter parsing | 4.x |
| [unified](https://unifiedjs.com/) | Markdown processing pipeline | 11.x |
| [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) | Code syntax highlighting | 0.14.x |
| [Fuse.js](https://fusejs.io/) | Client-side search | 7.x |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark mode support | 0.4.x |

---

## 🆘 Troubleshooting

### Build fails with "Cannot find module"
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `.next` folders, then run `npm install` again

### Logo doesn't appear
- Check that logo files exist in `/public` folder
- Verify paths in `config/site.ts` match actual filenames
- Logo paths should start with `/` (e.g., `/logo.svg`)

### Page doesn't show in sidebar
- Verify markdown file has all required frontmatter fields
- Check that `order` value falls within a category range in `config/site.ts`
- Ensure `slug` field matches the URL you're trying to access

### Dark mode colors look wrong
- Update both `:root` AND `.dark` sections in `app/globals.css`
- Each color variable needs both light and dark variants

### Search not finding content
- Search indexes content at build time
- After adding new docs, restart dev server or rebuild

---

## 💡 Tips for AI Assistants

When helping users customize this template:

1. **Start with `config/site.ts`** - This is the main configuration hub
2. **Logo setup is critical** - Ensure files exist before updating paths
3. **Order field matters** - Explain how it determines both position AND category
4. **CSS variables** - All styling flows from `app/globals.css` tokens
5. **Test locally first** - Always run `npm run dev` before deploying
6. **Build before deploy** - Run `npm run build` to catch errors early

---

## 📄 License

MIT License - feel free to use this template for any project!

---

## 🤝 Need Help?

- Check `.cursor/rules` for detailed AI assistant guidance
- Review example markdown files in `/content` folder
- Ask your AI assistant to help with customization
