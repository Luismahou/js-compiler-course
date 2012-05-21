var vows = require('vows'),
    assert = require('assert');

var compiler = require('../src/compiler');

vows.describe('rest-compiler').addBatch({
  'single rest': {
    topic: compiler.compile({ tag: 'rest', dur: 100 }),

    'compiles to': function(notes) {
      assert.equal(0, notes.length);
    }
  },
  'inside seq note': {
    topic: compiler.compile({ 
      tag: 'seq', 
      left: { tag: 'rest', dur: 100 },
      right: { tag: 'note', pitch: 'c6', dur: 200 }
    }),

    'compiles to': function(notes) {
      assert.equal(1, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c6', start: 100, dur: 200 }, notes[0]);
    }
  },
  'inside par note': {
    topic: compiler.compile({
      tag: 'par',
      left: { tag: 'rest', dur: 150 },
      right: { tag: 'note', pitch: 'c3', dur: 100 }
    }),

    'compiles to': function(notes) {
      assert.equal(1, notes.length);
      assert.deepEqual(
        { tag: 'note', pitch: 'c3', start: 0, dur: 100 }, notes[0]);
    }
  },
  'inside seq with subsequent par': {
    topic: compiler.compile({
      tag: 'seq',
      left: { tag: 'rest', dur: 150 },
      right: {
        tag: 'par',
        left: { tag: 'note', pitch: 'c4', dur: 100 },
        right: { tag: 'note', pitch: 'c3', dur: 100 }
      }
    }),

    'compiles to': function(notes) {
      assert.equal(2, notes.length);
      assert.deepEqual([
        { tag: 'note', pitch: 'c4', start: 150, dur: 100 }, 
        { tag: 'note', pitch: 'c3', start: 150, dur: 100 }], notes);
    }
  }
}).export(module);