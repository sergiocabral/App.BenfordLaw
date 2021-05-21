app.controller('authorController', function($rootScope, $scope, $window, $timeout, helper, environment, toast) {

    $scope.actions = Object.keys(environment.author).map(ínfo => {
        return {
            type: ínfo,
            value: environment.author[ínfo],
            icon: icon(ínfo)
        }
    });

    $scope.onActionClick = onActionClick;

    /**
     * Define o ícone de exibição para um tipo de contato.
     * @param {string} type Tipo
     * @return {string}
     */
    function icon(type) {

        type = helper.slug(type);

        switch (type) {
            case 'email': return 'fa fa-envelope';
            case 'website': return 'fa fa-internet-explorer';
            case 'instagram': return 'fa fa-instagram';
            case 'stackoverflow': return 'fa fa-stack-overflow';
            case 'linkedin': return 'fa fa-linkedin';
            case 'phone': return 'fa fa-phone';
            case 'whatsapp': return 'fa fa-whatsapp';
            case 'bitcoin': return 'fa fa-btc';
            default: return 'fa fa-star-o';
        }

    }

    /**
     * Evento: Ao clicar, botão de ação.
     * @param {string} type Tipo de ação.
     * @param {string} value Valor da ação.
     */
    function onActionClick(type, value) {

        switch (helper.slug(type)) {

            case 'email':
                $window.open(`mailto:${value}`);
                break;

            case 'phone':
                $window.open(`tel:${value}`);
                break;

            case 'whatsapp':
                $window.open(`https://api.whatsapp.com/send?phone=${helper.slug(value)}&text=Olá! Cheguei até você através de um app que você fez.`);
                break;

            case 'website':
            case 'instagram':
            case 'stackoverflow':
            case 'linkedin':
                $window.open(value);
                break;

            case 'bitcoin':

                helper.copyToClipboard(value);

                toast('Make a donation by sending Bitcoins to this wallet.');
                $timeout(() => toast('The wallet code has been copied to the clipboard.'), 4000);

                if (helper.currentLanguage() === 'pt') $timeout(() => toast('Para doar usando PIX envie para o email: pix@sergiocabral.com'), 8000);

                break;
        }
    }

});
