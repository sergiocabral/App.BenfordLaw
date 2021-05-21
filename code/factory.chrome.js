app.factory('chrome', function(log) {

    /**
     * Informações carregadas do Chrome.
     * @type {ChromeInfo}
     */
    let chromeInfo = new ChromeInfo();

    /**
     * Carrega as informações do Chrome.
     * @return {Promise<ChromeInfo>}
     */
    async function loadInfo() {

        chromeInfo = new ChromeInfo();

        log.debug(() => `[Factory Chrome] Loading information.`);

        chromeInfo.tab = await currentTab();
        chromeInfo.hasPermission = Boolean(chromeInfo.tab && chromeInfo.tab.url);
        if (chromeInfo.hasPermission) {
            chromeInfo.location = await getObject('window.location');
            chromeInfo.html = await getObject('window.document.querySelector("body").outerHTML');
        }

        log.debug(() => `[Factory Chrome] Information loaded: ${chromeInfo}`)

        return chromeInfo;

    }

    /**
     * Obtem as informações previamente carregadas do Chrome.
     * @return {ChromeInfo}
     */
    function info() {

        return chromeInfo;

    }

    /**
     * Retorna a aba atual.
     * @returns {Promise<any>}
     */
    function currentTab() {

        log.debug(() => `[Factory Chrome] Querying current tab.`);

        return new Promise(resolve => {

            chrome.tabs.query({
                    active: true,
                    windowId: chrome.windows.WINDOW_ID_CURRENT
                }, tabs => {

                    const currentTab = (tabs.length && tabs[0]) || null;

                    log.debug(() => `[Factory Chrome] Current tab: ${JSON.stringify(currentTab, undefined, 2)}`);

                    resolve(currentTab);

                }
            );

        });

    }

    /**
     * Executa um código JavaScript na aba atual.
     * @param {string} javascriptCode
     * @type {Promise<any>}
     */
    function executeCode(javascriptCode) {

        log.debug(() => `[Factory Chrome] Executing code: ${javascriptCode}`);

        return new Promise(resolve =>

            chrome.tabs.executeScript(
                this.id,
                { code: javascriptCode },
                results => {

                    const result = Array.isArray(results) ? results[0] : results;

                    log.debug(() => `[Factory Chrome] Executed code (${javascriptCode}) results: ${JSON.stringify(result, undefined, 2)}`);

                    resolve(result);

                }
            )

        );

    }

    /**
     * Retorna um objeto como JSON.
     * @param {string} objectReference
     * @returns {Promise<any>}
     */
    async function getObject(objectReference) {

        log.debug(() => `[Factory Chrome] Getting object reference: ${objectReference}`);

        const objectAsString = await executeCode(`
            JSON.stringify({
                object: ${objectReference}
            })
        `);

        const objectAsJson = JSON.parse(objectAsString);
        const object = objectAsJson.object;

        log.debug(() => `[Factory Chrome] Object reference "${objectReference}" results: ${JSON.stringify(object, undefined, 2)}`);

        return object;

    }

    return {
        executeCode: executeCode,
        getObject: getObject,
        loadInfo: loadInfo,
        info: info
    };
});
