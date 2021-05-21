app.factory('translate', function(log, $document) {

    /**
     * Nome do atributo que identifica elementos que devem ser traduzidos.
     * @type {string}
     */
    const attributeName = 'translate-me';

    /**
     * Atributos que devem ser traduzidos.
     * @type {string[]}
     */
    const attributesToTranslate = [
        'title',
        'alt',
        'href'
    ];

    /**
     * Traduz um texto.
     * @param {string} text Texto.
     * @returns {string}
     */
    function text(text) {

        const translateKey = String(text)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/ig, '_')
            .replace(/__+/g, '_')
            .replace(/(^_+|_+$)/g, '');

        const translated = String(chrome.i18n.getMessage(translateKey));

        log.debug(() => `[Factory Storage] Translated text "${text}". From key "${translateKey}" to text "${translated}".`);

        return translated !== '' ? translated : text;

    }

    /**
     * Traduz os elementos filhos de um elemento pai.
     * @param {undefined|HTMLElement} element Opcional. Elemento do DOM. O padrão é o Document.
     * @returns {HTMLElement[]} Elementos traduzidos.
     */
    function element(element = undefined) {

        element = element || $document[0];

        const elements = Array.from(element.querySelectorAll(`*[${attributeName}]`));

        elements.forEach(element => {

            attributesToTranslate.forEach(attributeName => {

                let attributeValue = element.getAttribute(attributeName);

                if (attributeValue !== null) {

                    attributeValue = text(attributeValue);
                    element.setAttribute(attributeName, attributeValue);

                    log.debug(() => `[Factory Translate] Translated attribute "${attributeName}" of element "${element}"`);

                }

            });

            if (element.children.length === 0) {

                element.innerHTML = text(element.innerHTML);

                log.debug(() => `[Factory Storage] Translated text content of element "${(element + ' ' + element.id + ' ' + element.classList).replaceAll('  ', ' ').trim()}"`);

            }

            element.removeAttribute(attributeName);

        });

        log.debug(() => `[Factory Translate] Translated elements: ${elements.length}`);

        return elements;
    }

    return {
        text: text,
        element: element
    };

});
