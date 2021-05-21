app.factory('cache', function($cacheFactory, log) {

    /**
     * Cache.
     */
    const cache = $cacheFactory('expire-cache');

    /**
     * Grava um valor no cache.
     * @param {string} key Chave.
     * @param {any} value Valor.
     * @param expire Tempo de expiração.
     * @return {any} Objeto do cache.
     */
    function put(key, value, expire) {

        const cached = {
            value: value,
            expire: expire,
            created: performance.now()
        }

        if (cached.value !== null &&
            cached.value !== undefined) {

            cache.put(key, cached);

            log.debug(() => `[Factory Cache] Save key "${key}" with value: ${JSON.stringify(cached, undefined, 2)}`);
        }

        return cached;

    }

    /**
     * Lê um valor do cache e grava o valor padrão se não existe.
     * @param key Chave do cache.
     * @param defaultValue Valor padrão como valor ou função.
     * @param expire Tempo de expiração.
     * @return {any}
     */
    function get(key, defaultValue = null, expire = null) {

        if (key === null || key === undefined) return null;

        let cached = cache.get(String(key));

        let expired = Boolean(
            cached &&
            cached.expire > 0 &&
            cached.expire < performance.now() - cached.created
        );

        log.debug(() => `[Factory Cache] Read key "${key}". Expired: ${expired}. Value: ${JSON.stringify(cached, undefined, 2)}`);

        if (!cached || expired) {

            const value = typeof (defaultValue) === 'function' ? defaultValue() : defaultValue;

            const isPromise =
                typeof(value) === 'object' &&
                value && value.constructor && value.constructor.name === 'Promise' &&
                typeof(value.then) === 'function';

            if (isPromise) {

                return new Promise((resolve, reject) => value.then(promiseValue => {

                    cached = put(key, promiseValue, expire);
                    resolve(cached.value);

                }).catch(reject));

            } else {

                cached = put(key, value, expire);

            }

        }

        return cached.value;

    }

    /**
     * Remove uma chave do cache.
     * @param {string} key Nome da chave.
     */
    function remove(key) {

        cache.remove(key)
        log.debug(() => `[Factory Cache] Removed key "${key}".`);

    }

    /**
     * Limpa o cache.
     */
    function clear() {

        cache.removeAll()
        log.debug(() => `[Factory Cache] Removed all keys.`);

    }

    return {
        get: get,
        remove: remove,
        clear: clear,
    };
});
