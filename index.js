var _ = require('underscore');

exports.dot = function dot(name) {
	return function(o) {
		return o[name];
	}
}

exports.callWith = function callWith() {
	var args = _.toArray(arguments);
	return function (fn) {
		fn.apply(this, args);
	};
}

exports.applyWith = function applyWith() {
	var args = _.toArray(arguments);
	return function (fn) {
		fn.apply(this, _.first(args));
	};
}

exports.apply = function apply(fn) {
	return function () {
		fn.apply(this, _.first(_.toArray(arguments)));
	};
}