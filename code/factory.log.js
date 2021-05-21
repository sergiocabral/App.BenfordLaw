app.factory('log', function($log, environment) {

    /**
     * Nível de log que será postado. 0-debug, 1-info, 2-warn, 3-error
     * @type {number}
     */
    let levelValue = environment.isProduction ? 1 : 0;

    /**
     * Define e retorna o nível de log que será postado. 0-debug, 1-info, 2-warn, 3-error
     * @param {number} level Opcional.
     */
    function level(level = undefined) {

        if (Number.isFinite(level)) {

            levelValue = level;

        }

        return levelValue;
    }

    /**
     * Nome do nícel.
     * @param {number} level Nível.
     * @return {string}
     */
    function levelName(level) {

        switch (level) {
            case 3: return 'ERROR';
            case 2: return 'WARN';
            case 1: return 'INFO';
            case 0: return 'DEBUG';
            default: return 'UNKNOW';
        }

    }

    /**
     * Posta uma mensagem de log.
     * @param {string|Function} message Mensagem.
     * @param {number} level Nível.
     */
    async function post(message, level) {

        if (level < levelValue) return;

        if (typeof(message) === 'function') {

            message = await message();

        }

        const timestamp = new Date().toISOString().replace(/[TZ]/g, ' ').trim();
        const prefix = `${timestamp} [${levelName(level)}]`;
        message = `${prefix} ${message}`.trim();

        switch (level) {
            case 3: return $log.error(message);
            case 2: return $log.warn(message);
            case 1: return $log.info(message);
            default: return $log.debug(message);
        }

    }

    /**
     * Posta uma mensagem de log: debug
     * @param {string|Function} message Mensagem.
     */
    function debug(message) {
        post(message, 0);
    }

    /**
     * Posta uma mensagem de log: debug
     * @param {string|Function} message Mensagem.
     */
    function info(message) {
        post(message, 1);
    }

    /**
     * Posta uma mensagem de log: debug
     * @param {string|Function} message Mensagem.
     */
    function warn(message) {
        post(message, 2);
    }

    /**
     * Posta uma mensagem de log: debug
     * @param {string|Function} message Mensagem.
     */
    function error(message) {
        post(message, 3);
    }


    return {
        level: level,
        debug: debug,
        info: info,
        warn: warn,
        error: error
    };
});
