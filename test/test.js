/* global describe, it, beforeEach */

var chai, assert, sinon, spy, futil;
chai = require('chai');
futil = require('..');
assert = chai.assert;
chai.Assertion.includeStack = true;

describe('futil', function () {
  'use strict';

  describe('dot', function () {
    it('shoud get the property', function () {
      assert.equal('value', futil.dot('name')({name: 'value'}));
    });
  });
});