app.filter('translate', function(log, translate) {

    return input => {

        const output = translate.text(input);

        log.debug(() => `[Filter Translate] Input "${input}". Output "${output}".`);

        return output;

    }

});
