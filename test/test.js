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
    it('should get the property', function () {
      assert.equal('value', _.dot('name')({name: 'value'}));
    });
  });

  describe('eq', function () {
    it('should compare by strict equality', function () {
      assert.equal(true, _.eq(1)(1));
      assert.equal(false, _.eq(1)(2));
    });
  });

  describe('not', function () {
    it('should negate the predicate', function () {
      assert.equal(true, _.not(_.eq(1))(2));
      assert.equal(false, _.not(_.eq(1))(1));
    });
  });

  describe('parseInt', function () {
    it('should correctly parse string for the given base', function () {
      assert.equal(2, _.parseInt(10)("2"));
      assert.equal(2, _.parseInt(2)("10"));
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

  describe('dot and callWith', function () {
    it('shoud get the function and call it with the given args', function () {
      var joe = {
        greet: function (greeting) {
          return greeting + 'joe' + this.ending;
        }
      };
      assert.equal('hello joe!', _.compose(_.callWith('hello ').on({ending: '!'}), _.dot('greet'))(joe));
    });
  });
});