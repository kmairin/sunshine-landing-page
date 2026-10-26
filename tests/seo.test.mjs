// SEO checks for the static site. Run: node --test tests/
// Each test guards a fix that later copy edits could silently undo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const host = read('CNAME').trim();
const origin = `https://${host}`;

const pages = ['index.html', 'about.html', 'services.html', 'location.html',
  ...readdirSync(join(root, 'blog')).filter((f) => f.endsWith('.html') && !f.startsWith('_')).map((f) => `blog/${f}`)];

const urlFor = (p) => `${origin}/${p.replace(/index\.html$/, '')}`;
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&([a-zA-Z]+);/g, (m, n) => ({ ntilde: 'ñ', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', iquest: '¿', iexcl: '¡', Aacute: 'Á', Uacute: 'Ú', mdash: '—', ndash: '–' }[n] ?? m));
const text = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const jsonLd = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const meta = (html, name) => decode(html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1] ?? '');

test('no page points at the old parked domain', () => {
  for (const p of [...pages, 'blog/_template.html', 'robots.txt', 'sitemap.xml']) {
    assert.ok(!read(p).includes('sunshinecoinlaundry.com'), `${p} still mentions sunshinecoinlaundry.com`);
  }
});

test('every page has a self canonical on the live domain', () => {
  for (const p of pages) {
    const c = read(p).match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(c, urlFor(p), `${p} canonical`);
  }
});

test('robots.txt names the live sitemap', () => {
  assert.match(read('robots.txt'), new RegExp(`Sitemap: ${origin}/sitemap.xml`));
});

test('sitemap lists every page on the live domain, no made-up lastmod', () => {
  const xml = read('sitemap.xml');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual([...locs].sort(), pages.map(urlFor).sort());
  assert.ok(!xml.includes('<lastmod>'), 'drop lastmod unless it is a real edit date');
});

test('titles are 60 characters or less, descriptions 155 or less', () => {
  for (const p of ['index.html', 'about.html', 'services.html', 'location.html', 'blog/index.html']) {
    const html = read(p);
    const title = decode(html.match(/<title>([^<]*)<\/title>/)[1]);
    assert.ok(title.length <= 60, `${p} title is ${title.length} chars: ${title}`);
    const d = meta(html, 'description');
    assert.ok(d.length > 0 && d.length <= 155, `${p} description is ${d.length} chars`);
  }
});

test('home page title, h1 and description carry the local search phrases', () => {
  const html = read('index.html');
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  assert.match(title, /Laundromat/);
  assert.match(title, /South LA|Los Angeles/);
  const h1 = text(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]);
  assert.match(h1, /Laundromat/i);
  assert.match(meta(html, 'description'), /Westmont/);
});

test('one h1 per page', () => {
  for (const p of pages) {
    assert.equal((read(p).match(/<h1[\s>]/g) || []).length, 1, p);
  }
});

test('location wording matches the map: Vermont Vista, across from Westmont, not Vermont-Slauson', () => {
  for (const p of pages) assert.ok(!read(p).includes('Vermont-Slauson'), `${p} says Vermont-Slauson (3 miles north)`);
  assert.ok(!read('location.html').includes('Athens Park'), 'Athens Park is about 1.5 miles away, not a landmark');
  assert.match(read('index.html'), /Westmont/);
});

const business = (html) => jsonLd(html).find((d) => d['@type'] === 'Laundromat');

test('business structured data uses the live domain, a stable id and names the area served', () => {
  for (const p of ['index.html', 'location.html']) {
    const b = business(read(p));
    assert.ok(b, `${p} has Laundromat JSON-LD`);
    assert.equal(b.url, `${origin}/`);
    assert.equal(b['@id'], `${origin}/#laundromat`);
    assert.equal(b.telephone, '+1-213-684-8487');
    assert.equal(b.address.streetAddress, '10808 S Vermont Ave');
  }
  const b = business(read('index.html'));
  const served = JSON.stringify(b.areaServed);
  for (const place of ['Westmont', 'Vermont Vista', 'West Athens', 'Vermont Knolls', '90044']) {
    assert.ok(served.includes(place), `areaServed lacks ${place}`);
  }
  assert.ok(b.hasMap?.includes('google.com/maps'), 'hasMap links the Google Maps listing');
  assert.ok(b.sameAs?.some((u) => u.includes('google.com/maps')), 'sameAs links the Google Maps listing');
  assert.ok(b.parentOrganization?.name === 'CC Laundry System LLC', 'operator named');
});

test('FAQPage structured data matches the visible English FAQ exactly', () => {
  const html = read('index.html');
  const visible = [...html.matchAll(/<details class="faq-item en">\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/g)]
    .map((m) => ({ q: text(m[1]), a: text(m[2]) }));
  assert.ok(visible.length >= 8, `found ${visible.length} visible questions`);
  const faq = jsonLd(html).find((d) => d['@type'] === 'FAQPage');
  assert.ok(faq, 'FAQPage JSON-LD present');
  assert.deepEqual(faq.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })), visible);
  assert.ok(visible.some((v) => /Westmont/.test(v.q)), 'a visible question names Westmont');
});

test('blog posts do not reference a logo file that does not exist', () => {
  for (const p of pages.filter((p) => p.startsWith('blog/'))) {
    for (const m of read(p).matchAll(new RegExp(`${origin}/([^"\\s]+\\.(?:png|jpg|svg|webp))`, 'g'))) {
      assert.ok(existsSync(join(root, m[1])), `${p} references missing ${m[1]}`);
    }
  }
});

test('llms.txt gives AI engines the facts in plain text', () => {
  assert.ok(existsSync(join(root, 'llms.txt')), 'llms.txt missing');
  const t = read('llms.txt');
  for (const s of ['Sunshine Coin Laundry', '10808 S Vermont Ave', '(213) 684-8487', '6:00 AM', '10:00 PM', '8:30 PM', '80 lb', 'Westmont', origin]) {
    assert.ok(t.includes(s), `llms.txt lacks ${s}`);
  }
});

test('working notes, tests and drafts are not published by GitHub Pages', () => {
  const cfg = read('_config.yml');
  for (const p of ['docs', 'tests', 'scripts', 'SUPER_PROMPT.md']) assert.match(cfg, new RegExp(`- ${p.replace('.', '\\.')}\\b`));
  assert.ok(!existsSync(join(root, 'test')), 'stray "test" file is public at /test');
});
