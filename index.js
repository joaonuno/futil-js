'use strict';

var _ = require('underscore');
var funop = require('funop');

function allowContext(fn) {
  fn.on = function (ctx) {
    return _.bind(fn, ctx);
  };
  return fn;
}

function callWith() {
  var args = _.toArray(arguments);
  return allowContext(function (fn) {
    return fn.apply(this, args);
  });
};

function applyWith() {
  var args = _.toArray(arguments);
  return allowContext(function (fn) {
    return fn.apply(this, _.first(args));
  });
};

function apply(fn) {
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

function fixArgs(positions, fn) {
  return _.bind(function () {
    var argsFixed = _.map(positions, _.partial(funop.at, arguments));
    return fn.apply(this, argsFixed);
  }, this);
}

// Module exports
exports.callWith = callWith;
exports.applyWith = applyWith;
exports.apply = apply;
exports.curryAs = curryAs;
exports.eq = curryAs([1, 1], funop.equal);
exports.not = _.partial(_.compose, funop.not);
exports.fixArgs = fixArgs;
exports.at = curryAs([1, 1], funop.at);
exports.dot = curryAs([1, 1], fixArgs([1, 0], funop.at));
exports.parseInt = curryAs([1, 1], fixArgs([1, 0], parseInt));
