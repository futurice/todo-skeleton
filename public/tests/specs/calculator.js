/**
	This is an example file which shows how to use
	Mocha tests
*/

var expect = chai.expect;

define(['calculator'], function(calculator) {
	describe("calculator", function() {
		describe("#sum", function() {
			it('sums any number of parameters', function() {
				var sum = calculator.sum;

				expect(sum()).to.be.eql(0);
				expect(sum(1)).to.be.eql(1);
				expect(sum(1, 2)).to.be.eql(3);
				expect(sum(1, 2, 3)).to.be.eql(6);
			});
		});
		describe("#mult", function() {
			it('multiplies any number of paramaters', function() {
				var mult = calculator.mult;

				expect(mult()).to.be.eql(0);
				expect(mult(1)).to.be.eql(1);
				expect(mult(1, 2)).to.be.eql(2);
				expect(mult(1, 2, 3)).to.be.eql(6);
				expect(mult(1, 2, 3, 4)).to.be.eql(7);
			});
		});
	});
});