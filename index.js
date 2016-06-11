'use strict';

var extend = require('extend-shallow');
var Normalize = require('normalize-pkg');
var through = require('through2');

module.exports = function(options) {
  var opts = extend({}, options);

  var isMatch = opts.match || function isMatch(file) {
    return file.basename === 'package.json';
  };

  return through.obj(function(file, enc, next) {
    if (!isMatch(file)) {
      next(null, file);
      return;
    }

    if (file.isNull()) {
      next(null, file);
      return;
    }

    var normalizer = new Normalize(opts);
    var str = file.contents.toString();
    var pkg = normalizer.normalize(JSON.parse(str));
    file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    next(null, file);
  });
};
