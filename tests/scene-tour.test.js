import test from 'node:test';
import assert from 'node:assert/strict';
import {tourStops, getTourStop, floorForStop, isInteriorStop, nextTourStop} from '../lib/scene-tour.js';

test('tour covers exterior perspectives and actual inside-the-building rooms', () => {
  assert.deepEqual(tourStops.map(x=>x.id), ['aerial','facade','pool','lounge','suite','terrace']);
  for (const stop of tourStops) {
    assert.equal(stop.camera.length,3);
    assert.equal(stop.target.length,3);
    assert.ok(stop.camera.every(Number.isFinite));
    assert.ok(stop.target.every(Number.isFinite));
    assert.ok(stop.title.length > 0);
  }
  assert.ok(getTourStop('lounge').camera[1] < 2.95,'lounge eye must be inside ground floor');
  assert.ok(getTourStop('suite').camera[1] > 3.1 && getTourStop('suite').camera[1] < 5.6,'suite eye must be inside upper floor');
  assert.equal(isInteriorStop('lounge'),true);
  assert.equal(isInteriorStop('aerial'),false);
  assert.equal(floorForStop('suite'),'upper');
  assert.equal(floorForStop('lounge'),'ground');
  assert.equal(floorForStop('aerial'),'all');
});

test('tour lookup and stepping are predictable for unknown and boundary stops', () => {
  assert.equal(getTourStop('not-a-stop').id,'aerial');
  assert.equal(nextTourStop('terrace').id,'aerial');
  assert.equal(nextTourStop('not-a-stop').id,'facade');
  assert.equal(nextTourStop('suite').id,'terrace');
});
