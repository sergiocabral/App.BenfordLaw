/**
 * Definições do ambiente.
 */
class Environment {

    /**
     * Construtor
     */
    constructor() {
        Object.assign(this, this.generate(this));
    }

    /**
     * Informações do autor
     * @type {any}
     */
    author = {
        'Email': 'contact@sergiocabral.com',
        'Whatsapp': '+55 (22) 9-8184-2500',
        'Website': 'https://sergiocabral.com/',
        'StackOverflow': 'https://stackoverflow.com/users/story/1396511/',
        'Linkedin': 'https://www.linkedin.com/in/sergiocabraljr/',
        'Instagram': 'https://www.instagram.com/sergiocabraljunior/',
        'Bitcoin': '1A1xpNjAgqNdHSh9LNaRzqMixyUa5NgNKG',
    };

    /**
     * Sinaliza que é o ambiente de produção.
     * @type {boolean}
     */
    isProduction = false;

    /**
     * Intervalo para evitar múltiplos disparos de ações ao clicar repetidas vezes.
     * @type {number}
     */
    debounceInterval = 500;

}

/**
 * Define os itens de menu da aplicação
 * @param original Informação padrão.
 * @return {any}
 */
Environment.prototype.generate = function(original) {

    // TODO:
    // Este método deve ser sobreescrito na camada customizada da aplicação.
    // Deve retorna a estrutura já montada.

    return original;

}


/**
 * ToString
 * @return {string}
 */
Environment.prototype.toString = function() {

    return `Environment: ${JSON.stringify(this, undefined, 2)}`;

}
