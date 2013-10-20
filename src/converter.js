/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES */
PENNIES.namespace('Converter');

/**
 * Converter module
 */
PENNIES.Converter = (function () {
    'use strict';
    /**
     * defines the list of monies available.
     * @type {Array}
     */
    var moniesSizes = [
        {
            name: '\xA32',
            value: 200
        },
        {
            name: '\xA31',
            value: 100
        },
        {
            name: '50p',
            value: 50
        },
        {
            name: '20p',
            value: 20
        },
        {
            name: '10p',
            value: 10
        },
        {
            name: '5p',
            value: 5
        },
        {
            name: '2p',
            value: 2
        },
        {
            name: '1p',
            value: 1
        }
    ];

    /**
     * The input should already be formatted as float with max two decimals
     *
     * @param {Number} pennies an integer representing the amount to be converted
     */
    function convert(pennies) {
        var i, coin,
            countedCoins = [];

        if (arguments.length < 1 || typeof pennies !== 'number' || parseFloat(pennies) !== parseInt(pennies, 10)) {
            throw new Error('Wrong input type');
        }

        for (i=0; i<moniesSizes.length; i+=1) {
            coin = {};
            if (pennies / moniesSizes[i].value >= 1) {
                coin.name = moniesSizes[i].name;
                coin.value = moniesSizes[i].value;
                coin.count = parseInt(pennies / moniesSizes[i].value, 10);
                countedCoins.push(coin);
                // remainder
                pennies -= (coin.value * coin.count);
            }
        }

        return countedCoins;
    }

    /**
     * Init function.
     * Orders the moniesSizes from the higher to lower in value
     */
    (function init() {
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
    })();

    // expose methods
    return {
        convert: convert
    };
})();
