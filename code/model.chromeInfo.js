/**
 * Informações do Chrome.
 */
class ChromeInfo {

    /**
     * Contrutor.
     */
    constructor() { }

    /**
     * Aba atual.
     * @type {any}
     */
    tab = null;

    /**
     * Possui permissão na aba atual.
     * @type {boolean}
     */
    hasPermission = false;

    /**
     * Informações da url.
     * @type {Location}
     */
    location = null;

    /**
     * Conteúdo HTML.
     * @type {string}
     */
    html = '';

}

/**
 * ToString
 * @return {string}
 */
ChromeInfo.prototype.toString = function() {

    return JSON.stringify(this, undefined, 2);

}
