/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES */
PENNIES.namespace('utils');

/**
 * utils module: contains the Validator
 *               and some general purpose conversion functions.
 */
PENNIES.utils = (function () {
    'use strict';

    /**
     * The Validator is the main object used to validate the input
     * @constructor
     */
    function Validator() {
        this.messages = [];
    }

    Validator.prototype = (function () {
        /* jshint validthis: true */
        /**
         * Main function used to validate the input
         *
         * @param {String} input the input, should be in the format of
         *                      <currency><number>[.<number><subcurrency>]
         * @returns {Number} the parsed data expressed in <subcurrency>
         */
        function validate(input) {
            var currencySymbol = '\xA3',
                subCurrencySymbol = 'p',
                regexValidInput = /^\xA3?(\d+\.?\d+|\d*\.?\d+|\d+\.?\d*)p?$/,
                regexPence      = /^\d+\.?\d*p$/,
                regexPoundFull  = /^\xA3\d+\.?\d*p?$/,
                regexInt        = /^\d+$/,
                regexDecimalDot = /^\d*\.\d+/,
                validated = 0;

            // return immediately in case it's a plain decimal
            if (typeof input === 'number' || input.match(regexInt)
            ) {
                return parseInt(input, 10);
            }
            // reject any bad input
            else if (input.match(regexValidInput) === null) {
                this.messages.push('Bad input format');
                return validated;
            }

            // value with pound symbol
            if (input.match(regexPoundFull)) {
                // strip leading currency sign
                input = input.replace(currencySymbol, '');

                // cleanup pence symbol
                if (input.match(regexPence)) {
                    input = input.replace(subCurrencySymbol, '');
                }
                // add leading decimals if missing
                if (input.match(regexDecimalDot) === null) {
                    if (input.match(regexInt)) {
                        input += '.';
                    }
                    input += '00';
                }
            }

            // strip out pence symbol if still there
            if (input.match(regexPence)) {
                input = input.replace(subCurrencySymbol, '');
            }

            // convert the float into integer
            if (input.match(regexDecimalDot)) {
                validated = floatToInt(input);
            }
            // otherwise it's already an integer
            else if (input.match(regexDecimalDot) === null) {
                validated = parseInt(input, 10);
            }

            return validated;
        }

        /**
         * This should return whether we found any errors while parsing
         *
         * @returns {boolean}
         */
        function hasErrors() {
            return this.messages.length !== 0;
        }

        // expose functions
        return {
            validate: validate,
            hasErrors: hasErrors
        };
    })();


    /**
     * Will convert a decimal point number into an integer, rounding it when possible.
     * If an integer is passed, it will be returned as float.
     *
     * @param {String, Number} floatValue  the value with decimal point
     * @param {Number}         [precision] the precision the resulting integer should be rounded to
     *                                     defaults to 2
     * @returns {Number}
     */
    function floatToInt(floatValue, precision) {
        var floatSplit, i;

        // set a default value for the precision
        if (arguments.length === 1 || typeof precision !== 'Number') {
            precision = 2;
        }
        // convert the decimalValue into a string
        if (typeof floatValue === 'Number') {
            floatValue = floatValue.toString();
        }

        floatSplit = floatValue.split('.');

        if (floatSplit[0] === '') {
            floatSplit[0] = '0';
        }
        if (typeof floatSplit[1] === 'undefined') {
            floatSplit[1] = '';
        }

        if (floatSplit[1].length < precision) {
            for (i=0; i < (precision - floatSplit[1].length); i+=1) {
                floatSplit[1] += '0';
            }
        }
        else if (floatSplit[1].length > precision) {
            floatSplit[1] = roundInt(floatSplit[1], precision);
        }

        return parseInt(floatSplit[0] + floatSplit[1], 10);
    }

    /**
     * Will round any integer value to the given amount of numbers
     *
     * @param {String} value     the value to round
     * @param {Number} precision
     * @returns {Number}
     */
    function roundInt(value, precision) {
        var i, newVal = '';

        if (typeof value === 'Number') {
            value = value.toString();
        }

        // let's build a float we can round
        for (i=0; i<precision; i+=1) {
            newVal += value.substr(i, 1);
        }

        newVal += '.';

        for (i=precision; i<value.length; i+=1) {
            newVal += value.substr(i, 1);
        }

        return Math.round(parseFloat(newVal));
    }

    // expose functions
    return {
        Validator: Validator
    };
})();