var assert = require('assert');
var should = require('should');


describe('RegExp Test', function() {
  it('should return true when regex match', function() {
    assert.equal(new RegExp('11-\\d').test('11-2'), true);
  });
  it('should return false when regex doesn\'t match', function() {
    assert.equal(new RegExp('[A-Z]{5}').test('HFWR1'), false);
  });
});

