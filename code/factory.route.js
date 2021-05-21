app.factory('route', function(log, $rootScope, $timeout, $location, toast) {

    /**
     * Determina se pode navegar para outra url.
     * @type {Function|Promise<boolean>|null}
     */
    let navigateConfirmation = null;

    /**
     * Id da confirmação. Se houver alteração será abortada a confirmação atual.
     * @type {number}
     */
    let navigateConfirmationId = 0;

    /**
     * Navega para uma url.
     * @param {string} path
     */
    async function navigate(path) {

        const fromPath = $location.path();

        if (path === fromPath) return;

        let authorized = true;

        const myNavigateConfirmationId = ++navigateConfirmationId;
        const hasNavigateConfirmation = navigateConfirmation !== null && navigateConfirmation !== undefined;
        const hasChanges = $rootScope.hasChanges && $rootScope.hasChanges();
        const needConfirm = hasNavigateConfirmation || hasChanges;

        if (needConfirm) {

            log.debug(() => `[Factory Route] Confirming before navigating from "${fromPath}" to "${path}".`);

            if (typeof (navigateConfirmation) === 'function') {

                authorized = await navigateConfirmation();

            } else if (hasNavigateConfirmation) {

                authorized = Boolean(navigateConfirmation);

            } else if (hasChanges) {

                authorized = false;
                await toast('There is unsaved data. Exit this screen anyway?', {
                    action: {
                        text: 'Yes',
                        onClick: () => authorized = true
                    }
                });

            }

            if (myNavigateConfirmationId === navigateConfirmationId) {

                log.debug(() => `[Factory Route] ${authorized ? 'Confirmed' : 'Unconfirmed'} navigation from "${fromPath}" to "${path}".`);

            } else {

                log.debug(() => `[Factory Route] The confirmation was aborted by another more recent confirmation for navigate from "${fromPath}" to "${path}".`);

                return;

            }

        }

        if (authorized) {

            if ($rootScope.hasChanges) $rootScope.hasChanges(false);
            canNavigate(null);

            $location.path(path);

            $timeout(() => $rootScope.$apply(), 1);

        }

    }

    /**
     * Determina se pode navegar para outra url.
     * @param {Function|Promise<boolean>|null} confirmFunction
     */
    function canNavigate(confirmFunction) {

        navigateConfirmation = confirmFunction;

    }

    return {
        navigate: navigate,
        canNavigate: canNavigate
    };

});
