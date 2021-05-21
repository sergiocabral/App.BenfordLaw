class Helper {

    /**
     * Normaliza um texto para sem acentos.
     * @param {string} text Texto.
     * @param {boolean} trim Remove espaços.
     * @param {boolean} toLowerCase Converte para minúscula.
     * @param {boolean} noDiacritics Remove acentuação ou caracteres especiais.
     * @param {boolean} onlyLetterAndNumbers Mantém apenas letras e números.
     */
    slug(text, trim = true, toLowerCase = true, noDiacritics = true, onlyLetterAndNumbers = true) {

        if (typeof(trim) === 'object') {
            const config = trim;
            trim = Boolean(config.trim);
            toLowerCase = Boolean(config.toLowerCase);
            noDiacritics = Boolean(config.noDiacritics);
            onlyLetterAndNumbers = Boolean(config.onlyLetterAndNumbers);
        }

        if (noDiacritics) text = text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (trim) text = text
            .trim();

        if (toLowerCase) text = text
            .toLowerCase();

        if (onlyLetterAndNumbers) text = text
            .replace(/[^\w\d]+/g, '-')
            .replace(/-{2,}/g, '-')
            .replace(/(^-|-$)/g, '');

        return text;

    }

    /**
     * Simplifica a exibição de uma url, sem "http://www..."
     * @param {string} url
     */
    simplifyUrl(url) {

        if (typeof(url) !== 'string') return url;

        url = url.replace(/(^(\w+:|)\/\/(www\.|)|\/$)/g, '');

        return url;

    }

    /**
     * Copia um texto para a área de transferência.
     * @param {string} text Texto.
     */
    copyToClipboard(text) {

        const element = document.createElement("textarea");
        element.textContent = text;
        element.style.position = 'absolute';

        document.body.prepend(element);
        element.select();

        document.execCommand('copy');

        document.body.removeChild(element);

    }

    /**
     * Idioma atual.
     * @return {string}
     */
    currentLanguage() {

        const language = String(navigator.language)
            .replace(/-\w*$/, '')
            .toLowerCase();

        return language === 'pt' || language === 'en' ? language : 'en';

    }

    /**
     * Formatar data
     * @param {string} date Data
     * @param {string} format Formato
     */
    formatDate(date, format = 'LLLL') {

        const mDate = moment(date);
        if (!mDate.isValid()) return '';

        let formatted = mDate.format(format);
        formatted = formatted.replace(/\d\d:\d\d.*/, '').trim();

        return formatted;

    }

    /**
     * Converte um código HTML em um documento DOM.
     * @param {string} html Código HTML.
     */
    htmlToDocument(html) {

        if (typeof(html) === 'string') return new DOMParser().parseFromString(html, 'text/html');
        else return null;

    }

    /**
     * Executa uma função depois de esperar algum tempo.
     * @param {number} interval Intervalo
     * @param {Function} callback Função a ser executada.
     * @return {Promise<any>}
     */
    wait(callback, interval) {

        return new Promise(resolve => setTimeout(() => resolve(callback()), interval));

    }

    /**
     * Move a data até o dia da semana esperado.
     * @param {Date} date Data
     * @param {number} dayOfWeek Dia da semana
     * @param {boolean} moveBefore Move para trás, ou para frente
     * @return {Date}
     */
    setDayOfWeek(date, dayOfWeek, moveBefore = true) {

        if (date && typeof(date) === 'object' && date.constructor.name === 'Date') {

            const oneDay = 1000 * 60 * 60 * 24 * (moveBefore ? -1 : 1);

            while (date.getDay() !== dayOfWeek) {

                date = new Date(date.getTime() + oneDay);

            }

        }

        return date;
    }

    /**
     * Ordena um array como texto desconsiderando acentuação, etc.
     * @param {string[]} array
     * @return {string[]} Mesmo array de entrada.
     */
    sortText(array) {

        const normalize = text => `${this.slug(text)}${text}`;

        return array.sort((a, b) => normalize(a).localeCompare(normalize(b)));

    }

    /**
     * Remove entradas duplicadas
     * @param {any[]} array Array.
     * @param {boolean} normalizeText Faz as verificações como texto sem acento, etc.
     * @return {any[]} Mesmo array de entrada.
     */
    removeDuplicateText(array, normalizeText = true) {

        const arrayToCompare = !normalizeText ? array : [].concat(array).map(value => this.slug(value));

        return array.filter((value, index) => {

            const valueToCompare = !normalizeText ? value : this.slug(value);

            return arrayToCompare.indexOf(valueToCompare) === index;

        });

    }
}

Helper.instance = new Helper();

app.constant('helper', new Helper());
