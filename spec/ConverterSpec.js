/**
 * Basic set of tests for the converter
 */
describe('Converter', function () {
    var Converter = PENNIES.Converter;

    it('should return the right calculated amount', function () {
        var values =   [ 100, 120, 350, 1000 ],
            expected = [
                { '£1': 1 },
                { '£1': 1, '20p': 1 },
                { '£2': 1, '£1': 1, '50p': 1 },
                { '£2': 5 }
            ],
            i;

        for (i in values) {
            expect(Converter.convert(values[i])).toContain(expected[i]);
        }
    });
});