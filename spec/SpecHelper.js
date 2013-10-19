beforeEach(function() {
    /**
     * Matcher to check two objects contains the same fields with the right values
     */
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
});
