import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const component = readFileSync(path.join(root, 'components/Footer.jsx'), 'utf8');
const styles = readFileSync(path.join(root, 'app/globals.css'), 'utf8');
const file = path.join(root, 'public/images/farhan-ali-portrait.jpg');

test('founder photo is bundled locally, references the exact image, and has accessible alt text', () => {
  assert.ok(statSync(file).size > 30_000, 'actual professional portrait must be bundled');
  assert.match(component, /src="\/images\/farhan-ali-portrait\.jpg"/);
  assert.match(component, /alt="Portrait of Farhan Ali[^\"]*"/);
});

test('founder section names Farhan Ali and his verified professional disciplines', () => {
  assert.match(component, /Farhan Ali/);
  assert.match(component, /MERN Stack Developer/);
  assert.match(component, /Cloud Engineer/);
  assert.match(component, /Cybersecurity Specialist/);
  assert.match(component, /Next\.js/);
  assert.match(component, /MongoDB/);
  assert.match(component, /AI Assistant/);
  assert.match(component, /Password Manager/);
});

test('founder contact links are explicit, secure, and non-placeholder', () => {
  assert.match(component, /github\.com\/FARHANALi-DEve/);
  assert.match(component, /linkedin\.com\/in\/farhan-ali-985901241/);
  assert.match(component, /mailto:farhan2545426@gmail\.com/);
  assert.match(component, /rel="noopener noreferrer"/);
  assert.doesNotMatch(component, /href="(?:#|https?:\/\/(?:example|placeholder)\.)/);
});

test('footer has responsive and reduced-motion founder styles', () => {
  assert.match(styles, /\.founder-spotlight/);
  assert.match(styles, /\.founder-photo/);
  assert.match(styles, /@media\(max-width:680px\)/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
});
