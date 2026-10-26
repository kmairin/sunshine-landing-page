# SEO hand-off: Sunshine Coin Laundry

Goal: be the first laundromat people see when they search near Vermont Ave in South LA and
Westmont, on Google, Google Maps and AI answer engines (ChatGPT, Google AI Overview, Perplexity).

Baseline: `baseline-2026-10-26.md`. Re-measure 2026-11-26 and 2026-12-26 with the same searches,
signed out, from a US address.

## Done on 2026-10-26 (branch `seo/fix-domain-and-local-seo`)

| Change | Why |
|---|---|
| Canonical, Open Graph, structured data, sitemap and robots.txt now point at `https://cclaundrysystem.com` | They pointed at `www.sunshinecoinlaundry.com`, a parked page, telling Google to ignore this site |
| Sitemap lists the 8 real pages with no fake dates | Fake `lastmod` teaches Google to ignore it |
| Shorter titles and descriptions with "laundromat", "South LA", "90044", "Westmont" | Old home title was 80 characters and got cut off |
| Home page heading now starts with "Sunshine Coin Laundry · Laundromat in South LA" | The heading had no search words in it |
| "Vermont-Slauson" and "near Athens Park" replaced with Vermont Vista, across from Westmont, between Century Blvd and Imperial Hwy | Both were wrong (3 miles and 1.5 miles away) |
| Two new FAQ questions (EN and ES): "Is Sunshine Coin Laundry in Westmont?" and "Where can I wash a king-size comforter in South LA?" | Answers the searches people type, in words an AI can quote |
| FAQ structured data is generated from the visible FAQ (`node scripts/build-faq-jsonld.mjs`) | Google requires the two to match; they had drifted |
| Business structured data: stable id, area served (Westmont, Vermont Vista, West Athens, Vermont Knolls, 90044, 90047), Google Maps link, operator CC Laundry System LLC | Ties the site to the Maps listing and the neighbourhoods |
| `llms.txt` added | Plain-text facts for AI engines |
| `_config.yml` keeps docs, tests, scripts and SUPER_PROMPT.md off the public site; junk `/test` removed | They were public |
| `tests/seo.test.mjs` (13 checks) | Stops later copy edits from undoing the above. Run `node --test tests/seo.test.mjs` |

## Owner actions (only you can do these)

1. **Google Search Console** (Google's free dashboard for your site): add a "Domain" property for
   `cclaundrysystem.com`. Pick Cloudflare when asked how to verify; it adds the DNS record for you.
   Then Sitemaps → submit `https://cclaundrysystem.com/sitemap.xml`, and URL Inspection → "Request
   indexing" for the home page and location page. About 10 minutes.
2. **Bing Webmaster Tools**: "Import from Google Search Console". ChatGPT search uses Bing's index. 5 minutes.
3. **Google Business Profile** (this matters most for "laundromat near me"):
   - Primary category "Laundromat"; add "Self service laundry" if offered.
   - Add services: self-service wash, 80 lb washers, comforter washing, free parking.
   - Upload 10+ real photos: storefront from Vermont Ave, the 80 lb washers, dryers, parking, folding area.
   - Ask happy regulars for a Google review (a QR code at the folding tables). 3.8 from 99 reviews is
     the number to grow; reply to every review, good or bad.
   - Post monthly (a promotion, new machines, holiday hours).
4. **Prices**: send the real wash and dry prices by machine size. Price is the most-asked laundromat
   question and nothing on the site answers it yet.
5. **Real photos for the site**: every photo is a stock image, including one captioned "Inside
   Sunshine Coin Laundry". Google and visitors trust real photos.
6. **Reviews section**: the three quotes (Maria R., James T., Sandra L.) need to be real customers who
   agreed to be quoted. If they are placeholders, replace them with real quotes or remove them. Fake
   reviews break FTC rules (2024) and Google's guidelines.
7. **Yelp, Apple Maps (Apple Business Connect), Bing Places**: claim each listing and make the name,
   address, phone and website exactly match the site. Send the Yelp page URL so it can be added to the
   site's structured data.
8. `sunshinecoinlaundry.com`: if you own it, point it at `cclaundrysystem.com` with a 301 redirect.
   If not, nothing to do; the site no longer mentions it.

## Next content worth adding

- A Spanish version on its own URLs (`/es/`). The current language button swaps text in the
  browser, which Google sees as one English page.
- A prices page once prices are supplied.
- Guide: "How to wash a sleeping bag / rug at a laundromat" (large-machine searches).

## Maintenance

| How often | What |
|---|---|
| Weekly, 10 min | Search Console: searches without the brand name, new ones and positions |
| After any new page | Add it to `sitemap.xml`, run the tests, request indexing |
| Monthly | Same search list as the baseline, signed out, US address; AI-answer check; review count |
| Every hours/price change | Update page, FAQ (then `node scripts/build-faq-jsonld.mjs`), llms.txt and Google Business Profile together |

## Mistakes not to repeat

- Never put a domain in canonical links that is not the live site. Test 1 and 2 catch it.
- Never fire searches at Google from a script: after 5 it showed a robot check.
