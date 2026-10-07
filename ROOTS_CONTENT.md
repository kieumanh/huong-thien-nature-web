# Roots journal release — 0.4.0

This release implements the twelve priority articles agreed for phase-one Roots. It does not publish the other eighteen future/expansion ideas. The original three bilingual journal articles remain available at their existing URLs.

## Publication order and URLs

| ID | Vietnamese URL | English URL |
| --- | --- | --- |
| A01 | /vi/tan-van/thien-cho-nguoi-moi-bat-dau/ | /en/journal/meditation-for-beginners/ |
| B01 | /vi/tan-van/thien-hoi-tho-cho-nguoi-moi/ | /en/journal/breath-meditation/ |
| A03 | /vi/tan-van/bat-dau-tap-thien-tai-nha/ | /en/journal/start-meditating-at-home/ |
| B02 | /vi/tan-van/quan-sat-hoi-tho-tu-nhien/ | /en/journal/natural-breathing/ |
| D02 | /vi/tan-van/ngoi-thien-nhieu-suy-nghi/ | /en/journal/wandering-mind/ |
| D03 | /vi/tan-van/dau-chan-khi-ngoi-thien/ | /en/journal/meditation-posture/ |
| A02 | /vi/tan-van/thien-la-gi/ | /en/journal/what-is-meditation/ |
| C02 | /vi/tan-van/chanh-niem-co-the/ | /en/journal/body-mindfulness/ |
| E01 | /vi/tan-van/chanh-niem-trong-doi-song/ | /en/journal/everyday-mindfulness/ |
| E02 | /vi/tan-van/thien-khi-lam-vuon/ | /en/journal/mindful-gardening/ |
| E04 | /vi/tan-van/thien-tam-tu-cho-nguoi-moi/ | /en/journal/loving-kindness-meditation/ |
| F05 | /vi/tan-van/duy-tri-thoi-quen-thien/ | /en/journal/meditation-habit/ |

## Editorial treatment

- Source: the supplied Google document “Thiền Tinh Hoa: Bản Đồ Khởi Hành”.
- Articles adapt the manuscript; chapters that were outlines receive explicitly acknowledged editorial expansions.
- Natural breathing replaces an instruction to force a deep breath. The beginner exercise does not claim to reproduce the full Anapanasati sequence.
- The project's Calm–Observe–Understand framework is labelled as an interpretation, not a universal account of every tradition.
- Historical dates, unsupported timelines for attainment, automatic enlightenment claims and speculative physiological claims are not published as facts.
- Posture guidance was checked against NHS resources. Health-related limitations are grounded in NCCIH guidance. Resources are linked on relevant articles.
- All new pages include their own practice exercise, localized CTA, ordered related reading, description, keyword, publication date and translated illustration alt text.
- Keywords are editorial targets, not measured search-volume estimates.
- Book acknowledgements and private family information are not reproduced in article text.
- The private Google Drive document URL is excluded from public source, page links and the content export. Only the manuscript title is credited; further-reading links point to public NHS/NCCIH resources.

## Illustrations

Six complete landscape scenes, made with the built-in image-generation tool; optimized assets live in `public/media/`. All are 1200×800 WebP. Related articles intentionally share a thematic cover. No stock-photo attribution or real-person likeness is claimed.

| Asset | Scene | Used by |
| --- | --- | --- |
| roots-beginning.webp | Empty cushion on a Vietnamese garden veranda | A01, E01, F05 |
| roots-breath.webp | Seated adult seen from behind beside a pond | B01, B02 |
| roots-buffalo.webp | Farmer and calm buffalo beside a pond | D02, A02 |
| roots-posture.webp | Chair and alternative floor cushion | A03, D03 |
| roots-garden.webp | Gardener watering vegetables | C02, E02 |
| roots-kindness.webp | Two people sharing a basket of vegetables | E04 |

Prompt shared style: “Use case: illustration-story. Landscape editorial blog illustration for Hương Thiền Nature Roots. Refined hand-painted watercolor and gouache, botanical detail, natural proportions, warm ivory paper texture, forest green, muted sage, earth brown and warm morning gold. Calm spacious composition, 3:2 framing. No text, typography, logos, watermark, mystical glow, religious iconography, or identifiable public figures. One complete scene, not a collage.” Scene specifics are listed above.

## Content architecture

`src/data/roots-articles.ts` holds the twelve authored bilingual entries. `src/data/articles.ts` adds the existing library and resolves localized paths. `public/content/roots-articles.json` is a versioned, reusable export of the same content, URLs and reading order. This is static content; no external CMS or database is implied.

There are 15 editorial entries, 30 localized article pages, 36 HTML pages including listing/home/root/404, and 34 sitemap URLs. The homepage features three articles; the journal lists the complete library.

## Deployment

The existing deployment remains GitHub → Cloudflare Pages. A GitHub commit is source publication, not proof of a live Cloudflare deployment. Release validation and the exact delivery status are recorded in the final handoff.
