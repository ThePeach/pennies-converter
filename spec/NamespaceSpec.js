/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES, describe, it, expect */
/**
 * Basic set of tests for the namespace utils
 */
describe('Namespace', function () {
    'use strict';

    it('defines the property if not previously declared', function () {
        PENNIES.namespace('test');
        expect(PENNIES.test).toBeDefined();
    });

    it('defines vla', function () {
        PENNIES.namespace('test2.foo');
        PENNIES.test2.foo = {
            variable: 'test'
        };
        expect(PENNIES.test2.foo.variable).toEqual('test');
    });
});
