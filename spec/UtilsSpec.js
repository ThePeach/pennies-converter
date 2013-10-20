/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES, describe, it, expect */
/**
 * Basic set of tests for the utils and the validator
 */
describe('Utils', function () {
    'use strict';

    describe('Validator', function () {
        var Validator = new PENNIES.utils.Validator();

        it('should keep digits intact', function () {
            var values = [ '4', '25', '138', '1234' ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(parseInt(values[i]));
            }
        });

        it('should strip out the pence symbol', function () {
            var values = [ '4p', '25p', '168p', '1254p' ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(parseInt(values[i]));
            }
        });

        it('should remove decimal point from digits', function () {
            var values   = [ '1.0', '1.00', '1.2', '1.23' ],
                expected = [ 100,  100, 120,  123 ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(expected[i]);
            }
        });

        it ('should convert pounds into pennies', function () {
            var values   = [ '\xA31', '\xA31.0', '\xA31.10', '\xA310' ],
                expected = [  100,    100,     110,  1000 ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(expected[i]);
            }
        });

        it ('should interpret pounds and pennies symbols', function () {
            var values   = [ '\xA31p', '\xA31.p', '\xA31.10p', '\xA31.34p' ],
                expected = [  100,     100,      110,      134 ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(expected[i]);
            }
        });

        it ('should remove leading zeroes', function () {
            var values   = [ '0010', '010p', '\xA31.10p', '\xA31.34p' ],
                expected = [   10,     10,      110,      134 ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(expected[i]);
            }
        });

        it ('should round to two decimal places', function () {
            var values   = [ '0.235', '0.125p', '1.125p', '\xA31.34512345p' ],
                expected = [    24,       13,      113,            135 ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(expected[i]);
            }
        });

        it('should discard non-valid input', function () {
            var values = [ '-1', '', 'x', 'x8', '\xA31x.4p', '\xA3p', '\xA3-1.3', '\xA31,3p' ],
                i;

            for (i=0; i<values.length; i+=1) {
                expect(Validator.validate(values[i])).toEqual(0);
                expect(Validator.hasErrors()).toBeTruthy();
            }
        });
    });

    describe('Conversion utilities', function () {
        var utils = PENNIES.utils;

        describe('Decimal to Integer', function () {
            it('should take a float and return it as an integer', function () {
                var values = [ 2, 1.2, '1.2', '0.3', '.3' ],
                    expected = [ 200, 120, 120, 30, 30 ],
                    i;

                for (i=0; i<values.length; i+=1) {
                    expect(utils.floatToInt(values[i])).toEqual(expected[i]);
                }
            });
        });

    });
});
