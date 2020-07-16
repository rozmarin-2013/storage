window.addEventListener('load', () => {
    const configuration = {
        urlForward: 'contactList.html',
        urlAuth: '/',
        storage: {
            auth: new CookieStorage(),
            contactList: new LocStorage()
        },
        auth: new Auth()
    }

    let ContactBoxWithStorage = {

        addLists: function () {
            this.containerForContactBox.querySelector('.add_contact').addEventListener('click', (param) => {
                let storage = configuration.storage.contactList,
                    items = (storage.get('items')) ? JSON.parse(storage.get('items')) : [],
                    itemsHTML = this.containerForContactBox.querySelectorAll('.contact_box_item'),
                    lastItem = this.containerForContactBox.querySelector('.contact_box_item:last-child');

                if (itemsHTML.length > items.length) {
                    items.push({
                        name: lastItem.querySelector('.contact_box_item_name').innerHTML,
                        phone: lastItem.querySelector('.contact_box_item_phone').innerHTML,
                        email: lastItem.querySelector('.contact_box_item_email').innerHTML
                    });

                    lastItem.querySelector('.contact_box_item_remove')
                        .addEventListener('click', this.removeItemFromStorage)

                    storage.set('items', items);

                    lastItem.dataset.id = items.length - 1;
                }
            });
        },

        drawAll: function () {
            let storage = configuration.storage.contactList,
                items = (storage.get('items')) ? JSON.parse(storage.get('items')) : [];

            if (items.length) {
                for (let i = 0; i < items.length; i++) {
                    this.drowItem(items[i]);
                    this.containerForContactBox.querySelector('.contact_box_item:last-child').dataset.id = i;

                    this.containerForContactBox.querySelector('.contact_box_item:last-child').querySelector('.contact_box_item_remove')
                        .addEventListener('click', this.removeItemFromStorage);
                }
            }

        },

        deleteAll: function () {
            this.containerForContactBox.querySelector('.clear_contact').addEventListener('click', (param) => {
                configuration.storage.contactList.delete('items')
            });
        },

        removeItemFromStorage: function () {
            let id = this.closest('.contact_box_item').dataset.id,
                items = configuration.storage.contactList.get('items');

            items = JSON.parse(items);

            if (items && items.length) {
                items.splice(id, 1);
            }

            configuration.storage.contactList.set('items', items)
        },

        init: function () {
            this.addLists();
            this.drawAll();
            this.deleteAll();
        },
    }

    /*
        - класс AuthForm для получения элементов формы

        - класс Authentication содержит в себе логику login и
        logout и сохранения в хранилище данных

        - класс Storage определяет интерфейс для классов хранилища
          класс CookieStorage, LocStorage содержат методы для удаления,
          добавления, получения значений

          класс Auth хранит в себе юзеров, и содержит логику авторизации

          класс ContactBoxWithStorage содержит примесь к классу ContactBox(взяла его из предыдущего задания)
     */
    function init() {
        let auth = new Authentication(configuration);
        if (configuration.auth.currentUser) {

            Object.assign(contactListHtml.prototype, ContactBoxWithStorage);

            let contact = new ContactList({
                containerId: 'contact-box-wrapper'
            });
            contact.drow();

            let contactBox = contact.contactBox;
            contactBox.init();
        }
    }

    init();
});


