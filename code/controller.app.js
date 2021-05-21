app.controller('appController', function($rootScope, $scope, route, $timeout, log, emptyRoute, toast, menu, spinner, chrome) {

    log.debug(() => `[Controller App] Running.`);

    route.navigate(emptyRoute);

    $scope.menuItems = menu.generate();
    $scope.contentHeight = $scope.menuItems.length ? '498px' : '538px';

    $scope.onMenuClick = onMenuClick;
    $scope.onCloseClick = onCloseClick;

    chrome
        .loadInfo()
        .then(() => $timeout(() => {

            route.navigate(null); //Redirect to to default route.

            spinner.loading(false);

        }, spinner.animationInterval.loading + 500));

    /**
     * Evento: Ao clicar, item de menu.
     */
    function onMenuClick(menuItem) {

        log.debug(() => `[Controller App] Menu item "${menuItem.displayText}" with path "${menuItem.path}" was clicked.`);

        route.navigate(menuItem.path);

    }

    /**
     * Evento: Ao clicar, botão fechar.
     */
    function onCloseClick() {

        window.close();

    }

});
