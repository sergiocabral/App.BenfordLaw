/**
 * Item de rota.
 */
class RouteItem {

    /**
     * Contrutor.
     * @param {any|string} path Caminho para ser acessado.
     * @param {string} controller Nome do controller.
     * @param {string} template Url ou conteúdo do template. É determinado se termina com extensão .html
     */
    constructor(
        path = '/',
        template = undefined,
        controller = undefined) {

        if (typeof(path) === 'string') {

            this.path = path;

            if (typeof(template) === 'string' && template.toLowerCase().endsWith('.html')) {
                this.templateUrl = template;
            } else {
                this.template = template;
            }

            this.controller = controller;

        } else {

            Object.assign(this, path);

        }

    }

    /**
     * Caminho para ser acessado.
     * @type {string}
     */
    path;

    /**
     * Template.
     * @type {string}
     */
    template;

    /**
     * Url do template.
     * @type {string}
     */
    templateUrl;

    /**
     * Nome do controller.
     * @type {string}
     */
    controller;

}

/**
 * ToString
 * @return {string}
 */
RouteItem.prototype.toString = function() {

    return `Route to "${this.path}" with controller "${this.controller}"`;

}
