PENNIES.namespace('Converter');

/**
 * Converter module
 */
PENNIES.Converter = (function () {
    /**
     * defines the list of monies available.
     * @type {Array}
     */
    var moniesSizes = [
        {
            name: '\xA32',
            value: 200,
            count: 0
        },
        {
            name: '\xA31',
            value: 100,
            count: 0
        },
        {
            name: '50p',
            value: 50,
            count: 0
        },
        {
            name: '20p',
            value: 20,
            count: 0
        },
        {
            name: '10p',
            value: 10,
            count: 0
        },
        {
            name: '5p',
            value: 5,
            count: 0
        },
        {
            name: '2p',
            value: 2,
            count: 0
        },
        {
            name: '1p',
            value: 1,
            count: 0
        }
    ];

    /**
     * Orders the moniesSizes from the higher to lower in value
     */
    function orderSizes() {
        moniesSizes.sort(function (a, b) {
            if (a.value < b.value) {
                return 1;
            }
            if (a.value > b.value) {
                return -1;
            }
            // a and b values are equal
            return 0;
        });
    }

    /**
     * The input should already be formatted as float with max two decimals
     *
     * @param pennies
     */
    function convert(pennies) {
        var size, coin,
            countedCoins = [];

        orderSizes();

        for (size in moniesSizes) {
            coin = {};
            if (pennies / moniesSizes[size].value >= 1) {
                coin.name = moniesSizes[size].name;
                coin.value = moniesSizes[size].value;
                coin.count = parseInt(pennies / moniesSizes[size].value);
                countedCoins.push(coin);
                // remainder
                pennies -= (coin.value * coin.count);
            }
        }

        return countedCoins;
    }

    return {
        convert: convert
    }
})();