"""Read published routes from the same typed content used by the static build."""
import json
import subprocess
from pathlib import Path

def load_site_manifest():
    result = subprocess.check_output([
        'node', '--input-type=module', '-e', '''
        import { articles, articlePath, journalPath } from './src/data/articles.ts';
        import { languages } from './src/data/site.ts';
        import info from './package.json' with { type: 'json' };
        console.log(JSON.stringify({
          version: info.version,
          journals: Object.fromEntries(languages.map(lang => [lang, journalPath(lang)])),
          articles: articles.map(article => ({
            slug: article.slug,
            paths: Object.fromEntries(languages.map(lang => [lang, articlePath(lang, article.slug)])),
          })),
        }));
        '''
    ], cwd=Path(__file__).resolve().parents[1], text=True)
    return json.loads(result)
