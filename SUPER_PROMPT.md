# Super Prompt: Sunshine Coin Laundry LLC — Full Website Build

## Project Overview

Build a complete, modern, mobile-first static website for **Sunshine Coin Laundry LLC**, a laundromat chain in Los Angeles, California. The site must be production-ready, SEO-optimized, fast-loading, and easy to deploy on any static hosting platform (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.).

---

## Business Information

- **Business Name:** Sunshine Coin Laundry LLC
- **Primary Address:** 10808 S Vermont Ave, Los Angeles, CA 90044
- **Phone:** (323) 754-0650
- **Alt Phone:** (818) 800-7304
- **Hours:** Monday–Sunday, 6:00 AM – 10:00 PM (Open 7 Days a Week)
- **Rating:** 3.8/5 (90+ reviews)
- **Established:** August 10, 2021
- **Entity Type:** LLC (California)
- **Coordinates:** 33.9378257, -118.2912203
- **Service Area:** Los Angeles, South Los Angeles, Vermont-Slauson, Westmont, Athens, Willowbrook, Broadway-Manchester, and surrounding neighborhoods in the 90044, 90047, 90003, 90037 zip codes

### Amenities & Services
- Self-service coin-operated washers and dryers
- Large-capacity machines for comforters, blankets, and bulk loads
- Free WiFi
- On-site parking
- Coin changer machines
- Attendant on site during operating hours
- RV-friendly
- Clean, modern, well-lit facility
- Competitive pricing

---

## Tech Stack

- **HTML5** — Semantic markup for accessibility and SEO
- **CSS3** — Modern CSS with CSS Grid, Flexbox, custom properties (variables)
- **Vanilla JavaScript** — No frameworks, minimal JS for interactivity (mobile menu, smooth scroll, lazy loading)
- **No build tools required** — The site should work by opening `index.html` directly or serving from any static host
- **Blog/Articles** — Markdown or HTML article files in a `/blog/` directory, each as a standalone `.html` page

> **Why no framework?** The owner needs to easily modify content, deploy anywhere, and not deal with build pipelines. Pure HTML/CSS/JS is the most maintainable and fastest option for a small business static site.

---

## Site Architecture & Pages

### 1. `index.html` — Homepage
- **Hero Section:** Full-width hero image with overlay text: business name, tagline ("Los Angeles' Cleanest Coin Laundry — Open 7 Days a Week"), and a prominent CTA button ("Get Directions" linking to Google Maps)
- **About Section:** Brief intro to Sunshine Coin Laundry — who we are, how long we've been serving the community, what makes us different
- **Services Section:** Card-based layout showcasing services (Self-Service Wash, Large-Capacity Machines, Wash & Fold, Free WiFi, etc.) with icons or images
- **Why Choose Us Section:** Trust signals — clean facility, affordable pricing, open 7 days, attended, free parking, modern machines
- **Location & Hours Section:** Embedded Google Maps iframe, full address, phone number (clickable `tel:` link), hours of operation table
- **Testimonials/Reviews Section:** 3–5 customer testimonials styled as cards with star ratings
- **Blog Preview Section:** Show the 3 most recent blog articles as cards with title, excerpt, thumbnail, and "Read More" link
- **FAQ Section:** 5–8 common laundromat questions using `<details>`/`<summary>` for accordion behavior (great for SEO — FAQ schema)
- **Footer:** Business name, address, phone, hours, links to all pages, social media placeholders, copyright

### 2. `about.html` — About Us
- Story of Sunshine Coin Laundry — history, mission, values
- Photos of the facility (use professional stock laundromat images)
- Community involvement section
- Team/management mention

### 3. `services.html` — Services
- Detailed breakdown of each service with descriptions and pricing guidance
- Self-Service Washing, Self-Service Drying, Large-Capacity Machines, Wash & Fold Drop-Off
- Machine types and sizes available
- Tips for using the facility

### 4. `location.html` — Location & Contact
- Large embedded Google Maps
- Full address with schema markup
- Phone number (clickable)
- Hours of operation
- Parking information
- Public transit directions
- Contact form (static — use Formspree, Netlify Forms, or similar)
- Nearby landmarks for local SEO

### 5. `blog/index.html` — Blog/Articles Hub
- List of all blog articles in reverse chronological order
- Each article shows: title, date, excerpt, thumbnail, category tag, "Read More" link
- Sidebar or top section with category filters
- This is the heart of the SEO content strategy

### 6. `blog/[article-slug].html` — Individual Blog Articles
- Full article content with proper heading hierarchy (H1 > H2 > H3)
- Author byline and publish date
- Related articles section at the bottom (cross-linking)
- Breadcrumb navigation (Home > Blog > Article Title)
- Social sharing buttons (static links to Twitter/Facebook/email share URLs)
- Schema markup for Article type
- Internal links to services, location, and other relevant pages throughout the article body

### 7. `sitemap.xml` — XML Sitemap
- Auto-list all pages and blog articles
- Proper `<lastmod>`, `<changefreq>`, and `<priority>` tags

### 8. `robots.txt`
- Allow all crawlers
- Reference the sitemap

---

## Design Requirements

### Visual Style
- **Color Palette:**
  - Primary: Sunshine Yellow (`#F5A623` or similar warm gold)
  - Secondary: Clean Blue (`#2196F3` or similar trust blue)
  - Accent: Fresh White (`#FFFFFF`)
  - Text: Dark Charcoal (`#333333`)
  - Background: Light Gray (`#F8F9FA`)
- **Typography:**
  - Headings: Google Font — `Poppins` or `Montserrat` (bold, modern)
  - Body: Google Font — `Open Sans` or `Inter` (clean, readable)
- **Design Principles:**
  - Clean, airy layout with plenty of white space
  - Professional but approachable (not corporate, not cheap)
  - Rounded corners on cards and buttons
  - Subtle shadows for depth
  - Consistent spacing using an 8px grid system

### Mobile-First Responsive Design
- **Breakpoints:**
  - Mobile: 320px – 767px (primary design target)
  - Tablet: 768px – 1023px
  - Desktop: 1024px+
- Hamburger menu on mobile
- Touch-friendly tap targets (min 44x44px)
- No horizontal scrolling at any viewport
- Images must be responsive (`max-width: 100%; height: auto`)
- Test appearance on both iOS Safari and Android Chrome mentally

### Images
- Use high-quality stock photos from Unsplash, Pexels, or Pixabay (provide URLs in `src` or as comments)
- Categories needed:
  - Modern laundromat interior (hero)
  - Washing machines in a row
  - Person doing laundry (friendly, diverse)
  - Clean folded clothes
  - Laundromat exterior
  - Community/neighborhood feel
- Use `loading="lazy"` on all images below the fold
- Include descriptive `alt` text on every image (SEO + accessibility)
- Use `.webp` format where possible, with `.jpg` fallback

---

## SEO Requirements (Critical)

### On-Page SEO — Every Page Must Have:
1. **Unique `<title>` tag** — Format: `Page Name | Sunshine Coin Laundry | Los Angeles Laundromat`
2. **Unique `<meta name="description">`** — 150–160 characters, include primary keyword and location
3. **Canonical URL** — `<link rel="canonical" href="...">`
4. **Open Graph tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
5. **Twitter Card tags** — `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
6. **Proper heading hierarchy** — One `<h1>` per page, logical `<h2>`–`<h6>` nesting
7. **Internal cross-links** — Every page links to at least 2–3 other pages naturally within content
8. **Image alt text** — Descriptive, keyword-rich but natural
9. **Breadcrumb navigation** — On all pages except homepage

### Schema.org Structured Data (JSON-LD)
Include the following schemas in `<script type="application/ld+json">` blocks:

1. **LocalBusiness / Laundromat** (every page):
```json
{
  "@context": "https://schema.org",
  "@type": "Laundromat",
  "name": "Sunshine Coin Laundry LLC",
  "image": "[hero-image-url]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10808 S Vermont Ave",
    "addressLocality": "Los Angeles",
    "addressRegion": "CA",
    "postalCode": "90044",
    "addressCountry": "US"
  },
  "telephone": "+1-323-754-0650",
  "url": "[website-url]",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "06:00",
    "closes": "22:00"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.9378257,
    "longitude": -118.2912203
  },
  "priceRange": "$",
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Free WiFi"},
    {"@type": "LocationFeatureSpecification", "name": "Parking"},
    {"@type": "LocationFeatureSpecification", "name": "Coin Changer"},
    {"@type": "LocationFeatureSpecification", "name": "Attendant on Site"}
  ]
}
```

2. **FAQPage** (on homepage):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

3. **Article** (on each blog post):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {"@type": "Organization", "name": "Sunshine Coin Laundry LLC"},
  "datePublished": "...",
  "dateModified": "...",
  "image": "...",
  "publisher": {...}
}
```

4. **BreadcrumbList** (on all inner pages)

### Technical SEO
- **Page speed:** Aim for 90+ Lighthouse score. Minimize CSS/JS, defer non-critical scripts, lazy-load images
- **Core Web Vitals:** Optimize LCP (hero image preloaded), CLS (explicit image dimensions), FID/INP (minimal JS)
- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- **Accessibility:** WCAG 2.1 AA — proper contrast ratios, focus states, ARIA labels, skip navigation link
- **HTTPS ready** (handled by host)
- **Mobile-friendly** (Google's #1 ranking factor for local businesses)

### Local SEO Keywords to Target
Naturally weave these into page content, headings, meta tags, and blog articles:

**Primary Keywords:**
- laundromat near me Los Angeles
- coin laundry Los Angeles
- laundromat 90044
- self-service laundry South Los Angeles
- Sunshine Coin Laundry

**Secondary Keywords:**
- 24 hour laundromat near me (address hours gap)
- laundromat with large machines Los Angeles
- cheap laundromat Los Angeles
- laundromat with WiFi Los Angeles
- wash and fold Los Angeles
- coin laundry Vermont Ave
- laundromat Westmont
- laundromat near Athens Park

**Long-Tail Keywords (Blog Targets):**
- how to wash a comforter at a laundromat
- laundromat etiquette tips
- how much does a laundromat cost
- best way to do laundry at a laundromat
- laundromat vs home washing machine cost comparison

---

## Blog / Article System (For Ongoing SEO)

### How the Blog Works
- Each article is a standalone `.html` file in the `/blog/` directory
- To add a new article: duplicate the `blog/_template.html` file, fill in content, and add a link to `blog/index.html`
- No CMS, no build tools — just copy, edit, deploy

### Article Template (`blog/_template.html`)
Provide a ready-to-use HTML template with:
- Placeholder for title, date, author, hero image, body content
- Pre-wired schema markup (Article type)
- Breadcrumbs
- Related articles section (manually curated links)
- Social sharing links
- Proper meta tags section to fill in
- Internal link placeholders to services/location pages
- Clear HTML comments like `<!-- REPLACE: Your article title here -->` for easy editing

### Cross-Linking Strategy (Built Into the Site)
- **Every blog article** must link to:
  - At least 1 service page or the services section
  - The location/contact page
  - At least 1–2 other blog articles
- **The homepage blog preview** links to the 3 most recent articles
- **The services page** links to relevant blog articles (e.g., "Learn more about washing comforters in our guide")
- **Related articles** section at the bottom of each blog post shows 2–3 related articles
- **Breadcrumbs** on every page provide hierarchical internal linking
- **Footer** on every page links to all main pages

### Starter Blog Articles (Include 3 Complete Articles)

**Article 1:** "How to Wash a Comforter at a Laundromat: A Complete Guide"
- Target keyword: "how to wash a comforter at a laundromat"
- ~800–1000 words
- Include step-by-step instructions, tips for different materials, why large machines matter
- Link to services page (large-capacity machines)
- Link to location page

**Article 2:** "Laundromat Etiquette: 10 Unwritten Rules Every Customer Should Know"
- Target keyword: "laundromat etiquette"
- ~800–1000 words
- Fun, informative, shareable content
- Link to services page, link to Article 1

**Article 3:** "Laundromat vs. Home Washing: Which Saves You More Money?"
- Target keyword: "laundromat cost vs home washing machine"
- ~800–1000 words
- Cost comparison, time analysis, convenience factors
- Link to location page, link to Articles 1 & 2

---

## File Structure

```
sunshine-landing-page/
├── index.html
├── about.html
├── services.html
├── location.html
├── sitemap.xml
├── robots.txt
├── css/
│   └── styles.css          (all styles, mobile-first)
├── js/
│   └── main.js             (mobile menu, smooth scroll, lazy load)
├── images/
│   └── (stock photos — use URLs from Unsplash/Pexels in src for now)
├── blog/
│   ├── index.html           (blog listing page)
│   ├── _template.html       (copy this to create new articles)
│   ├── how-to-wash-comforter-at-laundromat.html
│   ├── laundromat-etiquette-tips.html
│   └── laundromat-vs-home-washing-cost.html
└── favicon.ico              (sunshine/laundry themed)
```

---

## Performance Checklist

- [ ] All images use `loading="lazy"` (except hero)
- [ ] Hero image uses `<link rel="preload">`
- [ ] CSS is loaded in `<head>`, JS is loaded with `defer` before `</body>`
- [ ] No render-blocking resources
- [ ] All images have explicit `width` and `height` attributes (prevents CLS)
- [ ] Minified CSS and JS (or at least clean, efficient code)
- [ ] Google Fonts loaded with `display=swap`
- [ ] No unused CSS/JS
- [ ] Lighthouse score target: 90+ on Performance, Accessibility, Best Practices, SEO

---

## Accessibility Checklist

- [ ] Skip to main content link
- [ ] All images have descriptive `alt` text
- [ ] Color contrast ratio meets WCAG AA (4.5:1 for text)
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels on navigation, buttons, and landmarks
- [ ] Semantic HTML throughout
- [ ] Keyboard navigable (tab order, enter/space for buttons)
- [ ] `lang="en"` on `<html>` tag

---

## Deployment Notes

This site is designed to be deployed on any static hosting platform:
- **GitHub Pages:** Push to `gh-pages` branch or `/docs` folder
- **Netlify:** Drag and drop the folder or connect Git repo
- **Vercel:** Import the Git repo
- **Cloudflare Pages:** Connect Git repo
- **Any web server:** Upload files via FTP/SFTP

No build step required. The site works immediately after upload.

---

## Summary

Build a complete, modern, SEO-powerhouse static website for Sunshine Coin Laundry LLC in Los Angeles. The site must be mobile-first, blazing fast, accessible, and packed with local SEO signals (schema markup, geo-targeted keywords, Google Maps embed, NAP consistency). Include a blog system with 3 starter articles, a cross-linking strategy, and an easy-to-use template for adding new content. The design should be clean, professional, and trustworthy — making Sunshine Coin Laundry the obvious choice for anyone searching for a laundromat in South Los Angeles.
