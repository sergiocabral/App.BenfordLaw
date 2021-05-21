app.component('appLoading', {
    templateUrl: '/code/component.spinner.html',
    bindings: {
        loading: '<',
        progress: '<',
    },
    controller: function($timeout, spinner) {

        const ctrl = this;

        ctrl.canRender = false;
        ctrl.hide = false;
        ctrl.hideTimeout = 0;

        ctrl.$onInit = $onInit;
        ctrl.$onChanges = $onChanges;

        /**
         * Evento angular: Ao inicializar componente.
         */
        function $onInit() {

            ctrl.hide = !ctrl.loading;
            $timeout(() => ctrl.canRender = true, 100); // Bug no height da janela da Chrome Extension.

        }

        /**
         * Evento angular: quando binding sofre alterações.
         */
        function $onChanges() {

            $timeout.cancel(ctrl.hideTimeout);

            if (!ctrl.loading) {
                ctrl.hideTimeout = $timeout(() => ctrl.hide = true, spinner.animationInterval.transaction);
            } else if (ctrl.hide) {
                ctrl.loading = false;
                ctrl.hide = false;
                ctrl.hideTimeout = $timeout(() => ctrl.loading = true, spinner.animationInterval.transaction);
            }

        }

    }
});
