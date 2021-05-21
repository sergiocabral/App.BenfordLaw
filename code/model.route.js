/**
 * Rota da aplicação.
 */
class Route {

    /**
     * Itens de rota da aplicação.
     * @type {RouteItem[]}
     */
    items = this.generate([
        new RouteItem(
            '/author',
            '/code/controller.author.html',
            'authorController'
        )
    ]);

}

/**
 * Define os itens de rota da aplicação
 * @param original Informação padrão.
 * @return {RouteItem[]}
 */
Route.prototype.generate = function(original) {

    // TODO:
    // Este método deve ser sobreescrito na camada customizada da aplicação.
    // Deve retorna a estrutura já montada.

    return original;

}


/**
 * ToString
 * @return {string}
 */
Route.prototype.toString = function() {

    return `Route items (${this.items.length})${this.items.length ? ':\n' : ''}${this.items.join('\n')}`.trim();

}
