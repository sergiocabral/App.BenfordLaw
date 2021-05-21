/**
 * Menu da aplicação.
 */
class Menu {

    /**
     * Itens de menu da aplicação.
     * @type {MenuItem[]}
     */
    items = this.generate([
        new MenuItem('About', '', 'fa fa-info', [
            new MenuItem('Author', '/author', 'fa fa-user')
        ])
    ]);

}

/**
 * Define os itens de menu da aplicação
 * @param original Informação padrão.
 * @return {MenuItem[]}
 */
Menu.prototype.generate = function(original) {

    // TODO:
    // Este método deve ser sobreescrito na camada customizada da aplicação.
    // Deve retorna a estrutura já montada.

    return original;

}


/**
 * ToString
 * @return {string}
 */
Menu.prototype.toString = function() {

    return `Menu items (${this.items.length})${this.items.length ? ':\n' : ''}${this.items.join('\n')}`.trim();

}
