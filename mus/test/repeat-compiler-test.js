var vows = require('vows'),
    assert = require('assert');

var compiler = require('../src/compiler');

vows.describe('repeate-compiler').addBatch({
  'single repeat': {
    topic: compiler.compile({ 
      tag: 'repeat', 
      section: { tag: 'note', pitch: 'c4', dur: 100 }, 
      count: 3
    }),

    'compiles to': function(notes) {
      assert.equal(notes.length, 3);
      assert.deepEqual(
        notes, 
        [{ tag: 'note', pitch: 'c4', start: 0, dur: 100 }, 
        { tag: 'note', pitch: 'c4', start: 100, dur: 100 }, 
        { tag: 'note', pitch: 'c4', start: 200, dur: 100 }]);
    }
  },
  'repeat with seq': {
    topic: compiler.compile({
      tag: 'repeat',
      section: { 
        tag: 'seq', 
        left: { tag: 'note', pitch: 'c6', dur: 100 },
        right: { tag: 'note', pitch: 'c3', dur: 200 }},
      count: 2
    }),

    'compiles to': function(notes) {
      assert.equal(notes.length, 4);
      assert.deepEqual(
        notes, 
        [{ tag: 'note', pitch: 'c6', start: 0, dur: 100 },
        { tag: 'note', pitch: 'c3', start: 100, dur: 200 },
        { tag: 'note', pitch: 'c6', start: 300, dur: 100 },
        { tag: 'note', pitch: 'c3', start: 400, dur: 200 }]);
    }
  },
  'repeat with par': {
    topic: compiler.compile({
      tag: 'repeat',
      section: { 
        tag: 'par', 
        left: { tag: 'note', pitch: 'c6', dur: 100 },
        right: { tag: 'note', pitch: 'c3', dur: 200 }},
      count: 2
    }),

    'compiles to': function(notes) {
      assert.equal(notes.length, 4);
      assert.deepEqual(
        notes, 
        [{ tag: 'note', pitch: 'c6', start: 0, dur: 100 },
        { tag: 'note', pitch: 'c3', start: 0, dur: 200 },
        { tag: 'note', pitch: 'c6', start: 200, dur: 100 },
        { tag: 'note', pitch: 'c3', start: 200, dur: 200 }]);
    }
  },
  'repeat inside seq': {
    topic: compiler.compile({
      tag: 'seq',
      left: { 
        tag: 'repeat', 
        section: { tag: 'note', pitch: 'c4', dur: 100 }, 
        count: 1 
      },
      right: { 
        tag: 'repeat', 
        section: { tag: 'note', pitch: 'c5', dur: 200 },
        count: 2
      }
    }),

    'compiles to': function(notes) {
      assert.equal(notes.length, 3);
      assert.deepEqual(
        notes,
        [{ tag: 'note', pitch: 'c4', start: 0, dur: 100 },
        { tag: 'note', pitch: 'c5', start: 100, dur: 200 },
        { tag: 'note', pitch: 'c5', start: 300, dur: 200 }]);
    }
  }
}).export(module);