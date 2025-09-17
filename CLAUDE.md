# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server
- `npm run start` - Alternative development command
- `npm run keystatic:dev` - Start development with Keystatic integration

### Build & Deploy

- `npm run build` - Build for production (includes post-build processing)
- `npm run serve` - Start production server
- `npm run analyze` - Build with bundle analysis

### Code Quality

- `yarn lint` - Run ESLint with auto-fix on pages, app, components, lib, layouts, and scripts directories

### Static Export

- `EXPORT=1 UNOPTIMIZED=1 yarn build` - Build for static hosting
- `EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build` - Build with custom base path

## Architecture

This is a **Tailwind Next.js Starter Blog** built with:

### Core Technologies

- **Next.js 15** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS 4.0** for styling
- **Contentlayer 2** for content management
- **Keystatic** for visual content editing
- **MDX** for enhanced markdown with JSX components

### Content Management (Keystatic)

- **Visual Editor**: Access via `/keystatic` route for web-based editing
- **Git-based workflow**: All content changes are committed to repository
- **Local & Cloud**: Supports both local development and cloud deployment
- **MDX Support**: Full MDX editing with live preview
- **Media Management**: Built-in image upload and management
- **Content Source**: `data/` directory contains all content
  - `data/blog/` - Blog posts in MDX format
  - `data/authors/` - Author profiles in MDX
- **Content Processing**: Contentlayer transforms MDX files into typed objects
- **Frontmatter**: Supports title, date, tags, authors, layout, summary, images, and more
- **Generated Files**:
  - `app/tag-data.json` - Auto-generated tag counts
  - Search index for kbar/Algolia (if configured)

### Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components
- `layouts/` - Blog layout templates (PostLayout, PostSimple, PostBanner, ListLayout, ListLayoutWithTags)
- `data/` - Content files and configuration
- `public/static/` - Static assets (images, favicons)
- `css/` - Global styles and Tailwind configuration

### Key Configuration Files

- `contentlayer.config.ts` - Content processing and MDX plugin configuration
- `data/siteMetadata.js` - Site-wide configuration and metadata
- `data/headerNavLinks.js` - Navigation menu configuration
- `data/projectsData.js` - Projects page data
- `next.config.js` - Next.js configuration with CSP

### Content Management

- Blog posts support nested routing (`blog/nested-route/post.mdx`)
- Multiple authors system with individual author pages
- Tag-based categorization with auto-generated tag pages
- Three blog layout options and two listing layouts
- Rich MDX components for enhanced content (custom links, images, TOC, newsletter forms)

### Styling System

- Tailwind CSS with custom color scheme support
- Light/dark theme switching
- Responsive design with mobile-first approach
- Custom MDX component styling
- Prism.js code highlighting with custom themes

### Deployment Options

- Vercel (recommended)
- Netlify
- GitHub Pages (with provided workflow)
- Static hosting (S3, Firebase, etc.)
