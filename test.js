'use strict';

require('mocha');
var assert = require('assert');
var normalize = require('./');

describe('gulp-normalize-pkg', function() {
  it('should export a function', function() {
    assert.equal(typeof normalize, 'function');
  });

  it('should export an object', function() {
    assert(normalize);
    assert.equal(typeof normalize, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      normalize();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
