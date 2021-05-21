app.config(function($mdDateLocaleProvider, helper) {

    moment.locale(helper.currentLanguage());

    /**
     * @param date {Date}
     * @returns {string} string representation of the provided date
     */
    $mdDateLocaleProvider.formatDate = function(date) {

        return date ? moment(date).format('L') : '';

    };

    $mdDateLocaleProvider.parseDate = function(dateString) {

        const m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);

    };

});
