/**
 * Basic set of tests for the converter
 */
describe('Converter', function () {
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

        this.addMatchers({
            toBeSimilar: function(expected) {
                var similar = true;
                for (field in expected) {
                    if (expected.field !== this.actual.field) {
                        similar = false;
                    }
                }
                return similar;
            }
        });

        for (i in values) {
            expect(Converter.convert(values[i])).toBeSimilar(expected[i]);
        }
    });
});