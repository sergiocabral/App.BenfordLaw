app.component('appMenu', {
    templateUrl: '/code/component.menu.html',
    bindings: {
        items: '<',
        level: '<',
        onClick: '&'
    },
    controller: function() {

        const ctrl = this;

        ctrl.onMenuItemClick = onMenuItemClick;

        /**
         * Event: Ao clicar, item de menu.
         * @param {Event} event
         * @param {MenuItem} menuItem
         */
        function onMenuItemClick(menuItem) {

            ctrl.onClick({
                menuItem: menuItem
            });

        }

    }
});
