PENNIES.namespace('Validator');

/**
 * Validator module
 */
PENNIES.Validator = (function () {
    var messages = [],
        types = {},
        config = {};

    function validate(data) {
        return false;
    }

    return {
        validate: validate
    };
})();