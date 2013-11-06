'use strict';

var _ = require('underscore');

function allowContext(fn) {
  fn.on = function (ctx) {
    return _.bind(fn, ctx);
  };
  return fn;
}

exports.dot = function (name) {
  return function (o) {
    return o[name];
  };
};

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

exports.call = function (fn) {
  return allowContext(function () {
    return fn.apply(this, _.toArray(arguments));
  });
};

exports.apply = function (fn) {
  return allowContext(function () {
    return fn.apply(this, _.first(_.toArray(arguments)));
  });
};