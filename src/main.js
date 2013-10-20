/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/*global PENNIES, jQuery */
/**
 * @requires jQuery 2+
 *
 * This is the main controller for the JS application.
 * Handles the DOM and it's manipulation
 */
(function ($) {
    'use strict';

    var Converter = PENNIES.Converter,
        Validator = new PENNIES.utils.Validator(),
        $outputBox = $('.result');

    $('#pennies-converter').submit(function (e) {
        var pennies,
            monies,
            $resultStack = $('<ul></ul>'),
            i, error;

        e.preventDefault();

        try {
            pennies = Validator.validate(this.pennies.value);
        } catch (error) {
            $outputBox.html('<p class="result-error">'+error.message+'</p>');
            return false;
        }

        if (Validator.hasErrors()) {
            $outputBox.empty();

            for (i=0; i<Validator.messages.length; i+=1) {
                $outputBox.append('<p class="result-error">'+Validator.messages[i]+'</p>');
            }
            return false;
        }

        try {
            monies = Converter.convert(pennies);
        } catch (error) {
            $outputBox.html('<p class="result-error">'+error.message+'</p>');
            return false;
        }

        for (i in monies) {
            $resultStack.append('<li>' + monies[i].name + ': x' + monies[i].count + '</li>');
        }

        $outputBox.empty().append($resultStack);
        return true;
    });
})(jQuery);