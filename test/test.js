/* global describe, it */
'use strict';

var chai, assert, futil, _;
chai = require('chai');
futil = require('..');
_ = require('underscore');
assert = chai.assert;
chai.Assertion.includeStack = true;

describe('futil', function () {
  _.mixin(futil);

  function sum(a, b) {
    return a + b;
  }

  function sumUsingContext(a) {
    /* jshint validthis: true */
    return a + this.b;
  }

  describe('dot', function () {
    it('shoud get the property', function () {
      assert.equal('value', _.dot('name')({name: 'value'}));
    });
  });

  describe('callWith', function () {
    it('should call the function', function () {
      assert.equal(5, _.callWith(2, 3)(sum));
    });
  });

  describe('callWith on', function () {
    it('should call the function on the given context', function () {
      assert.equal(5, _.callWith(2).on({b: 3})(sumUsingContext));
    });
  });

  describe('applyWith', function () {
    it('should apply the function', function () {
      assert.equal(5, _.applyWith([2, 3])(sum));
    });
  });

  describe('applyWith on', function () {
    it('should apply the function on the given context', function () {
      assert.equal(5, _.applyWith([2]).on({b: 3})(sumUsingContext));
    });
  });

  describe('call', function () {
    it('should call the function with the given args', function () {
      assert.equal(5, _.call(sum)(2, 3));
    });
  });

  describe('call on', function () {
    it('should call the function on the given context with the given args', function () {
      assert.equal(5, _.call(sumUsingContext).on({b: 3})(2));
    });
  });

  describe('apply', function () {
    it('should apply the function with the given args', function () {
      assert.equal(5, _.apply(sum)([2, 3]));
    });
  });

  describe('apply on', function () {
    it('should apply the function on the given context with the given args', function () {
      assert.equal(5, _.apply(sumUsingContext).on({b: 3})([2]));
    });
  });
});