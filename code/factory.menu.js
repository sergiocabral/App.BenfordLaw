app.factory('menu', function(log, translate) {

    /**
     * Gera os itens de menu da aplicação.
     * @type {MenuItem[]}
     */
    function generate() {

        const menu = new Menu();
        const menuItems = translateItems(menu.items);

        log.debug(() => `[Factory Menu] Generated: ${menu}`);

        return menuItems;

    }

    /**
     * Traduz todos os itens de menu.
     * @param {MenuItem[]} items Itens de menu
     * @return {MenuItem[]} Mesma referência de entrada.
     */
    function translateItems(items) {

        items.forEach(item => {

            item.displayText = translate.text(item.displayText)
            translateItems(item.children);

        });

        return items;

    }

    return {
        generate: generate
    }
});
