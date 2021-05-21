const app = angular.module('mainApplication', [
    'ngRoute',
    'ngMessages',
    'ngSanitize',
    'ngMaterial',
    'ngAnimate',
    'ngAria']);

app.run(function(
    $rootScope,
    environment,
    helper,
    cache,
    chrome,
    http,
    log,
    menu,
    route,
    spinner,
    storage,
    translate) {

    log.debug(() => `[Module MainApplication] Running.`);

    $rootScope.moment = moment;
    $rootScope.helper = helper;
    $rootScope.environment = environment;
    $rootScope.hasChanges = hasChanges;
    $rootScope.hasScrollbar = hasScrollbar;

    spinner.progress(false);
    spinner.loading(true);

    if (!environment.isProduction) {

        window.debug = Object.assign({}, window.debug, {
            $rootScope,
            environment,
            helper,
            cache,
            chrome,
            http,
            log,
            menu,
            route,
            spinner,
            storage,
            translate,
        });

    }

    let hasChangesValue = false;

    /**
     * Sinaliza se há alterações pendentes que impedem a sair da tela.
     * @param {boolean} mode
     */
    function hasChanges(mode= undefined) {

        if (mode !== undefined) hasChangesValue = Boolean(mode);

        return hasChangesValue;

    }

    /**
     * Verifica se a barra de rolagem está visível.
     * @param {string} type 'h' para barra horizontal, 'v' para barra vertical. Outro valor para ambas.
     */
    function hasScrollbar(type = 'hv') {

        const element = document.querySelector('md-content');

        if (!element) return false;

        const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;
        const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;

        switch (type) {

            case 'h': return hasHorizontalScrollbar;
            case 'v': return hasVerticalScrollbar;
            default: return hasHorizontalScrollbar || hasVerticalScrollbar;

        }

    }

});
