var vows = require('vows'),
    assert = require('assert');

var compiler = require('../src/compiler');

vows.describe('basic-compiler').addBatch({
  'single note': {
    topic: compiler.compile({ tag: 'note', pitch: 'c6', dur: 250 }),

    'compiles to': function(notes) {
      assert.equal(1, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c6', start: 0, dur: 250 }, notes[0]);
    }
  },
  'single seq note': {
    topic: compiler.compile({
      tag: 'seq',
      left: { tag: 'note', pitch: 'c3', dur: 100 },
      right: { tag: 'note', pitch: 'c5', dur: 200 }
    }),

    'compiles to': function(notes) {
      assert.equal(2, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c3', start: 0, dur: 100 }, notes[0]);
      assert.deepEqual(
        { tag: 'note', pitch: 'c5', start: 100, dur: 200 }, notes[1]);
    }
  },
  'single par note': {
    topic: compiler.compile({
      tag: 'par',
      left: { tag: 'note', pitch: 'c3', dur: 100 },
      right: { tag: 'note', pitch: 'c5', dur: 200 }
    }),

    'compile to': function(notes) {
      assert.equal(2, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c3', start: 0, dur: 100 }, notes[0]);
      assert.deepEqual(
        { tag: 'note', pitch: 'c5', start: 0, dur: 200 }, notes[1]);
    }
  },
  'seq with nested par note': {
    topic: compiler.compile({
      tag: 'seq',
      left: {
        tag: 'par',
        left: { tag: 'note', pitch: 'c1', dur: 200 },
        right: { tag: 'note', pitch: 'c2', dur: 200 }
      },
      right: { tag: 'note', pitch: 'c3', dur: 200 }
    }),

    'compiles to': function(notes) {
      assert.equal(3, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c1', start: 0, dur: 200 }, notes[0]);
      assert.deepEqual(
        { tag: 'note', pitch: 'c2', start: 0, dur: 200 }, notes[1]);
      assert.deepEqual(
        { tag: 'note', pitch: 'c3', start: 200, dur: 200 }, notes[2]);
    }
  }
}).export(module);
