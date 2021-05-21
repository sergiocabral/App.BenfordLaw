app.factory('http', function($http, $timeout, log) {

    /**
     * Requisições pendentes.
     * @type {any}
     */
    const pending = { };

    /**
     * Cria um registro de entrada na lista de requisições pendentes.
     * @param {string} status
     * @param {any} state Registro anterior para ser atualizado.
     */
    function updateSate(state, status= undefined) {

        if (status === undefined) {

            const key = JSON.stringify(state);

            if (!pending[key]) {

                state = {
                    key,
                    created: performance.now(),
                    config: state,
                    status: 'creating',
                    count: 0
                };

                log.debug(() => `[Factory HTTP] Creating request Id 1: ${JSON.stringify(state.config, undefined, 2)}`);

            } else {

                state = pending[key];

                log.debug(() => `[Factory HTTP] Request ${state.count + 1} is waiting: ${JSON.stringify(state.config, undefined, 2)}`);

            }

        } else {

            state.status = status;

            log.debug(() => `[Factory HTTP] The status was updated to "${state.status}" after ${performance.now() - state.created} milliseconds. Request: ${JSON.stringify(state.config, undefined, 2)}`);

        }

        return state;
    }

    /**
     * Requisição HTTP mas evita chamadas duplicadas.
     * @param config
     */
    function http(config) {

        const interval = 100;

        return new Promise((resolve, reject) => {

            const state = updateSate(config);
            const requestId = ++state.count;

            const end = state => {

                if (state.$httpSuccess) resolve(state.$httpResponse);
                else reject(state.$httpResponse);

                log.debug(() => `[Factory HTTP] Answered request ${requestId}/${state.count} after ${performance.now() - state.created} milliseconds. Request: ${JSON.stringify(state.config, undefined, 2)}`);

                $timeout.cancel(state.destroyTimeout);
                state.destroyTimeout = $timeout(() => {

                    delete pending[state.key];

                    log.debug(() => `[Factory HTTP] The information was discarded after ${performance.now() - state.created} milliseconds. Request: ${JSON.stringify(state.config, undefined, 2)}`);

                }, interval * 10);

            };

            if (!pending[state.key]) {

                pending[state.key] = state;

                state.$httpPromise = $http(config);

                updateSate(state, 'requesting');

                const promiseProcessor = (response, success) => {

                    state.$httpSuccess = success;
                    state.$httpResponse = response;
                    updateSate(state, 'requested');

                    end(state);

                    $timeout(() => updateSate(state, `finished with ${success ? 'success' : 'error'}`), interval);

                }

                state.$httpPromise
                    .then(response => promiseProcessor(response, true))
                    .catch(response => promiseProcessor(response, false));

            } else {

                const whilePending = () => {

                    if (!state.status.includes('finished')) {

                        $timeout(whilePending, interval);

                    } else {

                        end(state);

                    }

                };
                whilePending();

            }

        });

    }

    return http;

});
