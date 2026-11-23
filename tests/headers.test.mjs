import assert from 'node:assert/strict';
import test from 'node:test';
import { contentSecurityPolicy, headerBlock, inlineScriptHashes, permissionsPolicy, turnstileHost } from '../scripts/secure-headers.mjs';

const page = (scripts) => `<!doctype html><html><head>${scripts}</head><body></body></html>`;

test('only inline executable scripts are hashed', () => {
  const hashes = inlineScriptHashes([
    page('<script>window.a=1</script><script src="/x.js"></script><script type="application/ld+json">{"a":1}</script><script>  </script>'),
    page('<script>window.a=1</script><script is:inline>window.b=2</script>'),
  ]);
  assert.equal(hashes.length, 2, 'identical bodies collapse, JSON-LD / external / empty scripts are skipped');
  for (const hash of hashes) assert.match(hash, /^'sha256-[A-Za-z0-9+/]{43}='$/);
});

test('the policy blocks everything except self, hashed scripts and Turnstile', () => {
  const csp = contentSecurityPolicy(["'sha256-AAAA'"]);
  const directives = Object.fromEntries(csp.split('; ').map(part => [part.split(' ')[0], part.split(' ').slice(1)]));
  assert.deepEqual(directives['default-src'], ["'self'"]);
  assert.deepEqual(directives['script-src'], ["'self'", "'sha256-AAAA'", turnstileHost]);
  assert(!csp.includes("'unsafe-eval'") && !directives['script-src'].includes("'unsafe-inline'"), 'scripts never get unsafe-inline/eval');
  assert.deepEqual(directives['object-src'], ["'none'"]);
  assert.deepEqual(directives['base-uri'], ["'self'"]);
  assert.deepEqual(directives['form-action'], ["'self'"]);
  assert.deepEqual(directives['frame-ancestors'], ["'self'"]);
  assert.deepEqual(directives['frame-src'], [turnstileHost]);
  assert.ok('upgrade-insecure-requests' in directives);
});

test('header block carries CSP, HSTS, permissions and cache rules', () => {
  const block = headerBlock(contentSecurityPolicy([]));
  for (const needle of ['Content-Security-Policy:', 'Strict-Transport-Security: max-age=31536000', 'Permissions-Policy:', 'Cross-Origin-Opener-Policy: same-origin', '/_astro/*', 'immutable']) assert(block.includes(needle), needle);
  assert(!/includeSubDomains|preload/.test(block), 'HSTS scope stays on the apex until every subdomain is confirmed HTTPS-only');
  assert(permissionsPolicy.includes('camera=()') && permissionsPolicy.includes('microphone=()') && !permissionsPolicy.includes('autoplay'));
});
