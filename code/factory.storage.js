app.factory('storage', function(log) {

    /**
     * Lê uma chave do storage
     * @param key {string} Nome da chave.
     * @param defaultValue {undefined|any} Valor padrão caso nenhum exista gravado.
     * @return {Promise<undefined|any>} Valor previamente gravado.
     */
    function get(key, defaultValue = null) {

        log.debug(() => `[Factory Storage] StorageSync. Reading key "${key}".`);

        return new Promise(resolve => {

            chrome.storage.sync.get([key], data => {

                const valueAsString = data[key];
                const success = valueAsString !== undefined;

                const value =
                    success
                        ? JSON.parse(valueAsString)
                        : defaultValue;

                log.debug(() => `[Factory Storage] StorageSync. Key "${key}" ${success ? 'exists' : 'not exists'}". Return ${success ? 'value' : 'default value'} as "${value}".`);

                resolve(value);

            });

        });

    }

    /**
     * Grava uma chave e valor no storage.
     * @param key {string} Nome da chave.
     * @param value {undefined|any} Valor padrão caso nenhum exista gravado.
     * @return {Promise<void>} Valor previamente gravado.
     */
    function set(key, value = null) {

        log.debug(() => `[Factory Storage] StorageSync. Setting key "${key}" as value "${value}".`);

        return new Promise(resolve => {

            if (value === undefined || value === null) {

                chrome.storage.sync.remove([key], () => {

                    log.debug(() => `[Factory Storage] StorageSync. Key "${key}" was removed.`);

                    resolve();

                });

            } else {

                const data = {};
                data[key] = JSON.stringify(value);
                chrome.storage.sync.set(data, () => {

                    log.debug(() => `[Factory Storage] StorageSync. Key "${key}" was defined as "${value}".`);

                    resolve();

                });

            }

        });

    }

    /**
     * Apaga todos os dados.
     * @return {Promise<any>}
     */
    function deleteAll() {

        return new Promise(resolve => {

            chrome.storage.sync.get(null, function(items) {

                const keys = Object.keys(items);

                log.debug(() => `[Factory Storage] StorageSync. Erasing all keys: ${keys}`);

                const promises = keys.map(key => new Promise(innerResolve => {

                    chrome.storage.sync.remove([key], () => {

                        log.debug(() => `[Factory Storage] StorageSync. Key "${key}" was removed.`);

                        innerResolve();

                    });

                }));

                Promise.all(promises).then(resolve);

            });

        });

    }

    return {
        get: get,
        set: set,
        deleteAll: deleteAll
    };

});
