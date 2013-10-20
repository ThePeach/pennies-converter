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
        /**
         * Main function used to validate the input
         *
         * @param {String} data the input, should be in the format of
         *                      <currency><number>[.<number><subcurrency>]
         * @returns {Number} the parsed data expressed in <subcurrency>
         */
        function validate(data) {
            var currencySymbol = '\xA3',
                subCurrencySymbol = 'p',
                regexValidInput = /^\xA3?(\d+\.?\d+|\d*\.?\d+|\d+\.?\d*)p?$/,
                regexPence      = /^\d+\.?\d*p$/,
                regexPoundFull  = /^\xA3\d+\.?\d*p?$/,
                regexInt        = /^\d+$/,
                regexDecimalDot = /^\d*\.\d+/,
                validated = 0;

            // return immediately in case it's a plain decimal
            if (typeof data === 'number' || data.match(regexInt)
            ) {
                return parseInt(data);
            }
            // reject any bad input
            else if (data.match(regexValidInput) === null) {
                this.messages.push('Bad input format');
                return validated;
            }

            // value with pound symbol
            if (data.match(regexPoundFull)) {
                // strip leading currency sign
                data = data.replace(currencySymbol, '');

                // cleanup pence symbol
                if (data.match(regexPence)) {
                    data = data.replace(subCurrencySymbol, '');
                }
                // add leading decimals if missing
                if (data.match(regexDecimalDot) === null) {
                    if (data.match(regexInt)) {
                        data += '.';
                    }
                    data += '00';
                }
            }

            // strip out pence symbol if still there
            if (data.match(regexPence)) {
                data = data.replace(subCurrencySymbol, '');
            }

            // convert the decimal into integer
            if (data.match(regexDecimalDot)) {
                validated = decimalToInt(data);
            }
            // otherwise it's already an integer
            else if (data.match(regexDecimalDot) === null) {
                validated = parseInt(data);
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
     * @param {String, Number} decimalValue the value with decimal point
     * @param {Number} [precision]  the precision the resulting integer should be rounded to
     * @returns {Number}
     */
    function decimalToInt(decimalValue, precision) {
        var decimalSplit, i;

        // set a default value for the precision
        if (arguments.length === 1 || typeof precision !== 'Number') {
            precision = 2;
        }
        // convert the decimalValue into a string
        if (typeof decimalValue === 'Number') {
            decimalValue = decimalValue.toString();
        }

        decimalSplit = decimalValue.split('.');

        if (decimalSplit[0] === '') {
            decimalSplit[0] = '0';
        }

        if (typeof decimalSplit[1] === 'undefined') {
            decimalSplit[1] = '';
        }
        if (decimalSplit[1].length < precision) {
            for (i=0; i < (precision - decimalSplit[1].length); i+=1) {
                decimalSplit[1] += '0';
            }
        }
        else if (decimalSplit[1].length > precision) {
            decimalSplit[1] = roundInt(decimalSplit[1], precision);
        }

        return parseInt(decimalSplit[0] + decimalSplit[1]);
    }

    /**
     * Will round any integer value to the given precision
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