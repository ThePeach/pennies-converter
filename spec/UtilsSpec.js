/**
 * Basic set of tests for the input validator
 */
describe('Utils', function () {
    describe('Namespace', function () {

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
});