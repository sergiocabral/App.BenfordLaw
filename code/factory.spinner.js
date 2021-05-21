app.factory('spinner', function(log, $rootScope, $timeout) {

    /**
     * Tempo das animações
     * @type {any}
     */
    const animationInterval = {
        loading: 300,
        transaction: 150
    };

    /**
     * Exibe o spinner de "carregando..."
     * @param {boolean} show Exibe ou esconde.
     * @return {Promise<void>}
     */
    function loading(show = true) {

        $rootScope.loading = show;
        $timeout(() => $rootScope.$apply(), 1);

        log.debug(() => `[Factory Spinner] Set visibility of loading as: ${Boolean(show)}`);

        return new Promise(resolve => $timeout(resolve, animationInterval.loading));

    }

    /**
     * Exibe a barra de progresso
     * @param {boolean} show Exibe ou esconde.
     * @return {void}
     */
    function progress(show = true) {

        $rootScope.progress = show;
        $timeout(() => $rootScope.$apply(), 1);

        log.debug(() => `[Factory Spinner] Set visibility of progress as: ${Boolean(show)}`);

    }

    /**
     * Exibe o efeito de transição entre página.
     * @param {boolean} show Exibe ou esconde.
     * @return {Promise<void>}
     */
    function transition(show = true) {

        const containerElement = document.querySelector('html');

        if (show) containerElement.classList.add('spinner-transition');
        else containerElement.classList.remove('spinner-transition');

        log.debug(() => `[Factory Spinner] Set visibility of transition as: ${Boolean(show)}`);

        return new Promise(resolve => $timeout(resolve, animationInterval.transaction));

    }

    return {
        loading: loading,
        progress: progress,
        transition: transition,
        animationInterval: animationInterval
    };

});
