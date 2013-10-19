PENNIES.namespace('Validator');

/**
 * Validator module
 */
PENNIES.Validator = (function () {
    var messages = [],
        types = {},
        config = {};

    function validate(data) {
        var currencySymbol = '\xA3',
            subCurrencySymbol = 'p',
            regexValidInput = /^\xA3?\d*\.?\d*p?$/,
            // TODO there should be a better validation regex than the above
//            regexValidInput = /^\xA3?\(\d+\.?\d+|\d*\.?\d+|\d+\.?\d*)p?$/,
            regexPence      = /^\d+\.?\d*p$/,
            regexPoundFull  = /^\xA3\d+\.?\d*p?$/,
            regexInt        = /^\d+$/,
            regexDecimal    = /^\d[^\.]$/,
            regexDecimalDot = /^\d*\.\d+/,
            validated = 0;

        // return immediately in case it's a plain decimal
        if (typeof data === 'number'
            || data.match(regexInt)
        ) {
            return parseInt(data);
        }
        // reject any bad input
        else if (data.match(regexValidInput) === null) {
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
                if (data.match(regexDecimal)) {
                    data += '.';
                }
                data += '00'
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
        // round it to something
        else {
            validated = parseInt(data);
        }

        return validated;
    }


    /**
     * Will convert a decimal point number into an integer, rounding it when possible.
     * If an integer is passed, it will be returned as float.
     *
     * @param {string} decimalValue the value with decimal point
     * @param {Number} precision    the precision the resulting integer should be rounded to
     * @returns {Number}
     */
    function decimalToInt(decimalValue, precision) {
        var decimalSplit = decimalValue.split('.'),
            precision = precision || 2,
            i;

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

    /**
     * This should return whether we found any errors while parsing
     *
     * @returns {boolean}
     */
    function hasErrors() {
        return messages.length !== 0;
    }

    return {
        messages: messages,
        validate: validate,
        hasErrors: hasErrors
    };
})();