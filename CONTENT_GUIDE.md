# Content guide and source inventory

## Project identity

Hương Thiền Nature brings together meditation, mindfulness and natural wellbeing. Hương Thiền is the initiating founder, author and teacher; Kiều Mạnh is a teacher and co-founder. No credentials, medical qualifications, locations, prices, schedules or personal biographies beyond those supplied have been invented.

## Supplied files reviewed

| File | How it informs the site |
|---|---|
| `Chủ shop.jpg` | Founder portrait for the founder section and small brand introduction. |
| `Gemini_Generated_Image_9sf6xs9sf6xs9sf6.png` | Dark-green Hương Thiền Nature logo variant. |
| `Gemini_Generated_Image_hxa6r3hxa6r3hxa6.png` | Light-background Hương Thiền Nature logo variant. |
| `thien dinh thuc hanh 1.jpg` | Four-step attention cycle: attend, wander, notice, return without argument. |
| `thien dinh thuc hanh(2).jpg` | Corrects common assumptions about meditation; the practice trains noticing and returning. |
| `7 tầng năng lượng bản thể.png` | Visual source for a seven-part contemplative model: body, energy/emotion, mind, values/intention, habit/karma, awareness, and emptiness/dependent arising. |
| `7 tầng năng lượng trong cơ thể .png` | A second seven-part expression (body, feeling, mind, spirit, karma, awareness, emptiness) and a project-made comparison with Buddhist and Yoga Vedanta terms. The comparison is an analogy, not proof of canonical equivalence. |
| `Cộng hưởng từ trường thiên nhiên.png` | Nature-connection exercise and imagery. Scientific-sounding energy language is qualified. |
| `Cộng hưởng từ trường thực vật.png` | Plant-connection reflection. No claim that people can detect a plant's electromagnetic field is made. |
| `Những cách nhận thông điệp từ thiên nhiên.png` | Prompts for observing, listening, sensing, noticing patterns and reflecting on dreams. Reframed as personal meaning-making. |

## Current website artwork

V3 Roots reuses the supplied WebP artwork and adds a decorative vector seedling/root mark. Its visual language uses forest green, warm paper and earth tones, with readable system serif headings and sans-serif body text. No additional founder biography or credentials were invented.

The previous educational infographics are no longer shown in the interface. Their underlying contemplative ideas remain in accessible written form. The redesigned site uses a new, coordinated set of editorial illustrations:

| Asset | Placement |
|---|---|
| `hero-canopy-v2.webp` | Forest path in the homepage hero and nature reflection cards. |
| `practice-cushion-v2.webp` | Quiet outdoor meditation setting. |
| `woodland-stream-v2.webp` | Nature listening and observation. |
| `fern-study-v2.webp` | Botanical observation and the nature journal. |

## Background music

The user supplied `Lotus_at_First_Light.mp3` for background playback. The original audio is retained at `public/audio/lotus-at-first-light.mp3` (approximately 2 minutes 42 seconds). No artist or license attribution has been invented. Playback loops, with visible pause and volume controls; audible autoplay follows the browser's permission rules and respects a saved pause choice.

## Editorial guardrails

Tản văn / Journal lists the articles in `src/data/articles.ts` at `/vi/journal/` and `/en/journal/`. To add a sharing article, supply a unique slug, local cover image, reading time and complete Vietnamese/English translations with title, description and body sections using the existing structure. The listing, homepage preview, article routes and sitemap are generated from that array; retain existing slugs when editing published articles. There is no publishing admin or database in this version.

The three journal pieces now have full Vietnamese and English routes, covering returning attention, the seven-layer framework and sensory observation of nature. Their content develops the existing source material; it is not an imported transcript of the unavailable ChatGPT Work conversation. Bilingual text lives in `src/data/site.ts` and `src/data/articles.ts`.

- Use invitations: “notice”, “you may experience”, “reflect”, “for some people”.
- Avoid promises of healing, diagnosis, guaranteed spiritual messages or measurable human/plant energy exchange.
- Keep spiritual models identified as the project's lens rather than universal fact.
- Make practices optional and offer gentle, non-judgemental language.
- Add qualified review and a clear scope statement before offering health, nutrition or therapeutic services.

## Three-phase structure

1. **Open the door:** bilingual brand site, practice introduction and editorial content.
2. **Gather and learn:** retreat enquiries, courses, member space and learning resources.
3. **Deepen the community:** fuller course library, events and community tools based on actual demand.
