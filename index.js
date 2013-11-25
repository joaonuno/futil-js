'use strict';

var _ = require('underscore');

function allowContext(fn) {
  fn.on = function (ctx) {
    return _.bind(fn, ctx);
  };
  return fn;
}

exports.callWith = function () {
  var args = _.toArray(arguments);
  return allowContext(function (fn) {
    return fn.apply(this, args);
  });
};

exports.applyWith = function () {
  var args = _.toArray(arguments);
  return allowContext(function (fn) {
    return fn.apply(this, _.first(args));
  });
};

exports.apply = function (fn) {
  return allowContext(function () {
    return fn.apply(this, _.first(_.toArray(arguments)));
  });
};

function curryRecur(pattern, fn, args) {
  return _.bind(function () {
    // FIXME This looses the missing arguments, which should be undefined.
    var innerArgs = args.concat(_.first(arguments, pattern[0]));
    if (pattern.length === 1) {
      return fn.apply(this, innerArgs);
    } else {
      return curryRecur.call(this, _.rest(pattern), fn, innerArgs);
    }
  }, this);
}

function curryAs(pattern, fn) {
  return curryRecur.call(this, pattern, fn, []);
}
exports.curryAs = curryAs;

// Similar to bracket notation access.
function at(obj, key) {
  return obj[key];
}

function fixArgs(positions, fn) {
  return _.bind(function () {
    var argsFixed = _.map(positions, _.partial(at, arguments));
    return fn.apply(this, argsFixed);
  }, this);
}
exports.fixArgs = fixArgs;

exports.dot = curryAs([1, 1], fixArgs([1, 0], at));