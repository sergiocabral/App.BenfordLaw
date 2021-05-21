app.constant('emptyRoute', '/empty');

app.config(function($routeProvider, $locationProvider, emptyRoute) {

    let firstLoad = true;
    let waitBeforeLoadStopwatch;

    const resolve = {
        waitBeforeLoad: ($rootScope, $timeout, log, $route, spinner, toast) => new Promise(resolve => {

            toast(null);

            spinner.transition(true).then(() => {

                waitBeforeLoadStopwatch = performance.now();

                log.debug(() => `[Config Routing] Navigating to path "${$route.current.$$route.path}".`);

                const waitBeforeLoad = firstLoad ? 250 : 0;
                $timeout(() => resolve(waitBeforeLoad), waitBeforeLoad);

            });

            if (firstLoad) $rootScope.$on('$routeChangeSuccess', () => {

                log.debug(() => `[Config Routing] Navigation finished for path "${$route.current.$$route.path}" after ${performance.now() - waitBeforeLoadStopwatch} milliseconds.`);

                spinner.transition(false);

            });

            firstLoad = false;

        })
    };

    const customRoutes = new Route().items;

    customRoutes.concat(new RouteItem(emptyRoute))
        .forEach(route => $routeProvider.when(
            route.path,
            Object.assign({ resolve: resolve }, route)
        ));

    if (customRoutes.length) {
        $routeProvider.otherwise({redirectTo: customRoutes[0].path});
    }

    $locationProvider.html5Mode(false);

});
