/**
 * @requires jQuery 2+
 *
 * This is the main controller for the JS application.
 * Handles the DOM and it's manipulation
 */

(function ($) {
    var Converter = PENNIES.Converter,
        Validator = PENNIES.Validator,
        $outputBox = $('.result');

    $('#pennies-converter').submit(function (e) {
        var pennies,
            monies,
            $resultStack = $('<ul></ul>'),
            i;

        e.preventDefault();

        pennies = Validator.validate(this.pennies.value);

        if (Validator.hasErrors()) {
            for (i=0; i<Validator.messages.length; i+=1) {
                $outputBox.html('<p>'+Validator.messages[i]+'</p>');
            }
            return false;
        }

        monies = Converter.convert(pennies);

        for (i in monies) {
            $resultStack.append('<li>' + monies[i].name + ': x' + monies[i].count + '</li>');
        }

        $outputBox.empty().append($resultStack);
    });
})(jQuery);