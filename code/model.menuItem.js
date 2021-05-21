/**
 * Item de menu.
 */
class MenuItem {

    /**
     * Contrutor.
     * @param displayText Texto de exibição.
     * @param {string} path Caminho para ser acessado.
     * @param {string} icon Ícone.
     * @param {MenuItem[]} children Sub-itens de menu.
     */
    constructor(
        displayText = 'MenuItem',
        path= '/',
        icon = '',
        children = []) {

        this.displayText = displayText;
        this.path = path;
        this.icon = icon;
        this.children = children;

    }

    /**
     * Texto de exibição.
     * @type {string}
     */
    displayText;

    /**
     * Caminho para ser acessado.
     * @type {string}
     */
    path;

    /**
     * Ícone.
     * @type {string}
     */
    icon;

    /**
     * Sub-itens de menu.
     * @type {MenuItem[]}
     */
    children;

}

/**
 * ToString
 * @return {string}
 */
MenuItem.prototype.toString = function() {

    let text = this.displayText;
    this.children.forEach(child => text += '\n  ' + child.toString().replaceAll('\n', '\n  '));
    return text;

}
