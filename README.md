# gulp-normalize-pkg [![NPM version](https://img.shields.io/npm/v/gulp-normalize-pkg.svg?style=flat)](https://www.npmjs.com/package/gulp-normalize-pkg) [![NPM downloads](https://img.shields.io/npm/dm/gulp-normalize-pkg.svg?style=flat)](https://npmjs.org/package/gulp-normalize-pkg) [![Build Status](https://img.shields.io/travis/jonschlinkert/gulp-normalize-pkg.svg?style=flat)](https://travis-ci.org/jonschlinkert/gulp-normalize-pkg)

Gulp plugin for normalize-pkg.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save gulp-normalize-pkg
```

## Usage

```js
var normalize = require('gulp-normalize-pkg');
var gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src('package.json')
    .pipe(normalize())
    .pipe(gulp.dest('.'))
});
```

## Options

### .match

Custom function for matching files to normalize. By default only `package.json` is matched.

This gives you control over which files to match, in case you're generating files from templates or something.

**Example**

```js
gulp.src('package.json')
  .pipe(normalize({
    match: function(file) {
      return file.basename = 'foo.js';
    }
  }))
```

### .fields

[normalize-pkg][] uses a schema that has a `field` for each property on the object being normalized. If a property is not recognized, normalize-pkg will just pass it through as-is.

You can use this option to add `fields` to the schema. See [normalize-pkg][] for more details.

**Example**

The following example adds normalizers for fields `foo` and `bar`:

```js
gulp.src('package.json')
  .pipe(normalize({
    fields: {
      foo: {
        type: ['string', 'array'],
        normalize: function(val, key, config, schema) {
          // do stuff to val
          return val;
        }
      },
      bar: {
        type: 'object',
        normalize: function(val, key, config, schema) {
          // do stuff to val
          return val;
        }
      }
    }
  }))
```

## Contributing

This document was generated by [verb-readme-generator][] (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator][] project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/gulp-normalize-pkg/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 10, 2016._