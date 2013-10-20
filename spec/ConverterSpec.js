/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES, describe, it, expect */
/**
 * Basic set of tests for the converter
 */
describe('Converter', function () {
    'use strict';
    var Converter = PENNIES.Converter;

    it('should return the right calculated amount', function () {
        var values =   [ 100, 120, 350, 1000 ],
            expected = [
                [{ name: '\xA31', count: 1, value: 100 }],
                [{ name: '\xA31', count: 1, value: 100 }, { name: '20p', count: 1, value: 20 }],
                [{ name: '\xA32', count: 1, value: 200 }, { name: '\xA31', count: 1, value: 100 }, { name: '50p', count: 1, value: 50 }],
                [{ name: '\xA32', count: 5, value: 200 }]
            ],
            i;

        for (i=0; i<values.length; i+=1) {
            expect(Converter.convert(values[i])).toBeSimilar(expected[i]);
        }
    });

    it('should throw an error if the input is badly formatted', function () {
        /*jshint loopfunc:true */
        var values = [ null, '', 'x', '1', '1.4', 1.4],
            i;

        for (i=0; i<values.length; i+=1) {
            expect(function () { Converter.convert(values[i]); }).toThrow(new Error('Wrong input type'));
        }
    });
});
