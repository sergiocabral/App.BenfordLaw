app.factory('toast', function($mdToast, translate, log) {

    /**
     * Último toast disprado.
     * @type {null|mdToast}
     */
    let lastToastMessage = null;

    /**
     * Exibe uma mensagem toast para o usuário.
     * @param {string} message Mensagem.
     * @param {any} config Configurações.
     * @return {Promise<void>}
     */
    function toast(message, config = { }) {

        if (lastToastMessage) {
            $mdToast.hide(lastToastMessage);
            lastToastMessage = null;
        }

        if (!message) return new Promise(resolve => resolve());

        return new Promise(resolve => {

            message = translate.text(message);

            const stopwatch = performance.now();
            log.debug(() => `[Factory Toast] Message "${message}" was created.`);

            let toastMessage = lastToastMessage = $mdToast
                .simple()
                .textContent(message)
                .hideDelay(config && config.delay > 0 ? config.delay : 5000);

            const action = config && config.action && config.action.text && config.action.onClick && config.action;
            if (action) {

                action.text = translate.text(action.text);

                toastMessage
                    .action(action.text)
                    .highlightAction(true);
            }

            const isError = config && config.error;
            if (isError) toastMessage.toastClass('md-toast-error');

            const isSuccess = config && config.success;
            if (isSuccess) toastMessage.toastClass('md-toast-success');

            $mdToast
                .show(toastMessage)
                .then(response => {

                    const actionClicked = action && response === 'ok';

                    log.debug(() => `[Factory Toast] Message "${message}" was destroyed after ${performance.now() - stopwatch} milliseconds. ${action ? `Action "${action.text}" clicked: ${actionClicked}` : ''}`.trim());

                    if (actionClicked) {
                        action.onClick();
                    }

                    resolve();

                });

        });

    }

    return toast;

});
