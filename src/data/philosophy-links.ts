// Resolves the link targets named in src/data/philosophy.ts to real routes, so the data file stays free of paths
// and a renamed page cannot leave a dead link behind (tests/philosophy.test.mjs checks every target).
import type { Language } from './site.ts';
import type { PhilosophyTarget } from './philosophy.ts';
import { journeyPath, partnerProfiles } from './journey-pages.ts';
import { articlePath, journalPath } from './articles.ts';
import { shopPath } from './products.ts';
import { themeById, themePath } from './shop-themes.ts';
import { contactPath } from './contact-channels.ts';

export interface ResolvedTarget { href: string; external: boolean }

export function resolveTarget(lang: Language, target: PhilosophyTarget): ResolvedTarget {
  switch (target.to) {
    case 'guidance': return { href: journeyPath(lang, 'guidance'), external: false };
    case 'practice': return { href: journeyPath(lang, 'practice'), external: false };
    case 'feedback': return { href: journeyPath(lang, 'feedback'), external: false };
    case 'support': return { href: journeyPath(lang, 'support'), external: false };
    case 'story': return { href: journeyPath(lang, 'story'), external: false };
    case 'ecosystem-partners': return { href: `${journeyPath(lang, 'ecosystem')}#partnerships`, external: false };
    case 'journal': return { href: journalPath(lang), external: false };
    case 'shop': return { href: shopPath(lang), external: false };
    case 'shop-food': return { href: themePath(lang, themeById('thuc-pham-sach')!), external: false };
    case 'contact': return { href: contactPath(lang), external: false };
    case 'zenwork': return { href: partnerProfiles.find(partner => partner.name === 'ZenWork')!.site, external: true };
    case 'article': return { href: articlePath(lang, target.slug), external: false };
  }
}
