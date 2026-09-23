import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const runtimeRequire = createRequire(import.meta.url);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

// Exercise the real route with only the external provider mocked.
const modules = new Map();
function load(relative) {
  const file = path.resolve(testDirectory, '..', relative);
  if (modules.has(file)) return modules.get(file).exports;
  const loadedModule = { exports: {} }; modules.set(file, loadedModule);
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  new Function('require', 'module', 'exports', source)(
    id => id.startsWith('@/') ? load('src/' + id.slice(2) + '.ts') : runtimeRequire(id), loadedModule, loadedModule.exports,
  );
  return loadedModule.exports;
}
const { orderedReferences, referenceUrl } = load('src/lib/imagine-views.ts');
const { interpretImagineLocally, isImagineScene } = load('src/lib/imagine.ts');
const { POST } = load('src/app/api/imagine/route.ts');
const originalFetch = global.fetch;
const originalKey = process.env.OPENAI_API_KEY;
after(() => { global.fetch = originalFetch; if (originalKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = originalKey; });
let calls = [];
global.fetch = async (url, options) => {
  calls.push({ url, options });
  if (url.endsWith('/responses')) return Response.json({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(interpretImagineLocally('Passion luce viola prosecco')) }] }] });
  return Response.json({ data: [{ b64_json: 'dGVzdA==' }] });
};
function request(body, ip = crypto.randomUUID()) {
  return new Request('http://localhost/api/imagine', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify(body) });
}

test('each suite supplies three existing, distinct references with selected camera first', () => {
  for (const suite of ['Passion', 'Infinity']) for (const view of ['room', 'spa', 'bed']) {
    const refs = orderedReferences(suite, view);
    assert.equal(refs.length, 3); assert.equal(new Set(refs.map(ref => ref.file)).size, 3);
    assert.equal(refs[0].id, view);
    refs.forEach(ref => assert.ok(fs.existsSync(path.join('public', ref.file))));
  }
});
test('invalid input and missing provider never masquerade as generated photos', async () => {
  assert.equal((await POST(request({ idea: 'short' }))).status, 400);
  assert.equal((await POST(request({ idea: 'Una bella serata', view: '../secret' }))).status, 400);
  delete process.env.OPENAI_API_KEY;
  const response = await POST(request({ idea: 'Una bella serata', suite: 'Passion' }));
  assert.equal(response.status, 503); assert.equal((await response.json()).image, undefined);
  process.env.OPENAI_API_KEY = 'test-placeholder';
});
test('selected suite overrides interpretation; multipart references and original match chosen viewpoint', async () => {
  calls = [];
  const response = await POST(request({ idea: 'Luce viola e prosecco', suite: 'Infinity', view: 'spa' }));
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.scene.suite, 'Infinity'); assert.equal(result.reference, referenceUrl('Infinity', 'spa'));
  const edit = calls.find(call => call.url.endsWith('/edits'));
  assert.equal(edit.options.body.getAll('image[]').length, 3);
  assert.equal(edit.options.body.getAll('image[]')[0].name, 'euphoria-Infinity-spa.jpg');
  assert.match(edit.options.body.get('prompt'), /master camera view \(spa\)/);
  assert.match(edit.options.body.get('prompt'), /Images 2 and 3/);
  assert.equal(edit.options.body.get('size'), 'auto');
});
test('different views do not share image cache; identical view can reuse its result', async () => {
  calls = [];
  for (const view of ['bed', 'room', 'bed']) {
    assert.equal((await POST(request({ idea: 'Una serata color ambra', suite: 'Passion', view }))).status, 200);
  }
  assert.equal(calls.filter(call => call.url.endsWith('/edits')).length, 2);
});
test('cooldown includes actionable Retry-After; invalid requests do not consume it', async () => {
  const ip = crypto.randomUUID();
  assert.equal((await POST(request({ idea: 'x' }, ip))).status, 400);
  assert.equal((await POST(request({ idea: 'Una serata tranquilla' }, ip))).status, 200);
  const blocked = await POST(request({ idea: 'Una serata tranquilla' }, ip));
  assert.equal(blocked.status, 429); assert.ok(Number(blocked.headers.get('Retry-After')) > 0);
});
test('runtime validation rejects malformed structured scenes', () => {
  const scene = interpretImagineLocally('Una serata tranquilla');
  assert.ok(isImagineScene(scene)); assert.equal(isImagineScene({ ...scene, objects: ['pool'] }), false);
  assert.equal(isImagineScene({ ...scene, suite: 'Unknown' }), false);
});
test('provider failure returns an explicit error, never a real-photo success', async () => {
  const mock = global.fetch;
  global.fetch = async (url, options) => url.endsWith('/edits') ? Response.json({ error: { code: 'test_failure' } }, { status: 503 }) : mock(url, options);
  try {
    const response = await POST(request({ idea: 'Scenario di errore del provider', view: 'bed' }));
    assert.equal(response.status, 502); assert.equal((await response.json()).image, undefined);
  } finally { global.fetch = mock; }
});

test('fallback respects lists of exclusions and does not mistake pink light for roses', () => {
  const quiet = interpretImagineLocally('Jacuzzi accesa, luce viola e prosecco. Senza petali, fiori o altre decorazioni.');
  assert.equal(quiet.flowers, false); assert.equal(quiet.petals, false); assert.equal(quiet.prosecco, true);
  assert.equal(interpretImagineLocally('Atmosfera rosa e prosecco').flowers, false);
  assert.deepEqual(interpretImagineLocally('Una serata senza torta, palloncini e candele').objects, []);
});
