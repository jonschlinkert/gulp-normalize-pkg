'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var File = require('vinyl');
var normalize = require('./');

function readExpected(filepath) {
  var cwd = path.resolve(__dirname, 'expected', path.basename(filepath));
  return fs.readFileSync(cwd, 'utf8');
}

describe('gulp-normalize-pkg', function() {
  it('should export a function', function() {
    assert.equal(typeof normalize, 'function');
  });

  it('should return a stream', function() {
    var stream = normalize();
    assert(stream);
    assert.equal(typeof stream, 'object');
    assert.equal(typeof stream.pipe, 'function');
  });

  it('should not fail on non-existent files', function(cb) {
    var stream = normalize();
    var buffer = [];

    stream.write(new File({
      base: __dirname,
      path: path.resolve(__dirname, 'foofofofof/package.json')
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].relative, 'foofofofof/package.json');
      cb();
    });

    stream.end();
  });

  it('should normalize a package.json', function(cb) {
    var stream = normalize();

    var buffer = [];
    var filepath = path.resolve(__dirname, 'fixtures/package.json');
    var expected = readExpected(filepath);

    stream.write(new File({
      base: __dirname,
      path: filepath,
      contents: fs.readFileSync(filepath)
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].contents.toString(), expected);
      assert.equal(buffer[0].relative, 'fixtures/package.json');
      cb();
    });

    stream.end();
  });

  it('should use custom normalizer fields', function(cb) {
    var stream = normalize({
      fields: {
        foo: {
          type: ['array', 'string'],
          normalize: function() {
            return 'bar';
          }
        }
      }
    });

    var buffer = [];
    var filepath = path.resolve(__dirname, 'fixtures/package.json');
    var expected = readExpected('custom.json');

    stream.write(new File({
      base: __dirname,
      path: filepath,
      contents: fs.readFileSync(filepath)
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].contents.toString(), expected);
      assert.equal(buffer[0].relative, 'fixtures/package.json');
      cb();
    });

    stream.end();
  });

  it('should overwrite default normalizer fields', function(cb) {
    var stream = normalize({
      fields: {
        name: {
          type: ['string'],
          normalize: function(val, key, config) {
            if (!/-foo$/.test(val)) {
              val += '-foo';
            }
            return val;
          }
        }
      }
    });

    var buffer = [];
    var filepath = path.resolve(__dirname, 'fixtures/package.json');
    var expected = readExpected('overwrite.json');

    stream.write(new File({
      base: __dirname,
      path: filepath,
      contents: fs.readFileSync(filepath)
    }));

    stream.on('data', function(file) {
      buffer.push(file);
    });

    stream.on('end', function() {
      assert.equal(buffer.length, 1);
      assert.equal(buffer[0].contents.toString(), expected);
      assert.equal(buffer[0].relative, 'fixtures/package.json');
      cb();
    });

    stream.end();
  });
});
