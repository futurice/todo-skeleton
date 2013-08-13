/**
	This is only a test file to demostrate testing with Mocha
*/
define(['underscore'], function(_) {
	"use strict";

	return {
		sum: function() {
			var args = arguments.length ? _.toArray(arguments) : [0];

			return args.reduce(function(a, b) {
				return a + b;
			});
		},
		mult: function() {
			var args = arguments.length ? _.toArray(arguments) : [0];

			return args.reduce(function(a, b) {
				return a * b;
			});
		}
	};
});