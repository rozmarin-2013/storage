class ContactList {

    _contactsContainerId = null;
    _contactBox = null;

    constructor(params) {
        if (!params.containerId) {
            return;
        }

        this._contactsContainerId = params.containerId;
    }

    get contactsContainerId() {
        return this._contactsContainer;
    }

    set contactsContainerId(param) {
        if (param.trim()) {
            this._contactsContainer = param;
        }
    }

    drow() {
        let container = document.getElementById(this._contactsContainerId);

        if (!container) {
            console.log(`Элемент с id ${this._contactsContainerId} не найден`);
            return null;
        }

        this._contactBox = new contactListHtml(container);
        this._contactBox.appendToContainer();
    }

    get contactBox() {
        return this._contactBox;
    }
}

class contactListHtml {
    #contactBox = `<div class="contact_box">
        <h2>Список контактов</h2>
        <div class="contact_box_form">
            <div class="contact_box_form_title">Новый контакт</div>
            <div class="contact_box_form_row">
                <input type="text" name="name" placeholder="Имя" required>
            </div>
            <div class="contact_box_form_row">
                <input type="text" name="email" placeholder="Электронная почта" required>
            </div>
            <div class="contact_box_form_row">
                <input type="text" name="phone" placeholder="Телефон" required>
            </div>
            <div class="contact_box_form_row">
                <button class="add_contact"><span></span></button>
                <button class="clear_contact"><img src="../contactsBook/images/delete.jpg"></button>
            </div>
        </div>
        
        <div class="contact_box_list">
        </div>
     </div>`;

    containerForContactBox = null;

    constructor(containerForContactBox) {
        this.containerForContactBox = containerForContactBox;
    }

    appendToContainer() {
        this.containerForContactBox.innerHTML = this.#contactBox;
        this.initAddItems();
        this.initClearAll();
    }

    initClearAll() {
        this.containerForContactBox.querySelector('.clear_contact').addEventListener('click', (param) => {
            this.containerForContactBox.querySelector('.contact_box_list').innerHTML = '';
        });
    }

    initAddItems() {
        this.containerForContactBox.querySelector('.add_contact').addEventListener('click', (param) => {
            let data = this.getInputValue();
            this.drowItem(data);
        });
    }

    drowItem(data) {
        if (!data) return false;

        let listItem = this.containerForContactBox.querySelector('.contact_box_list');
        let item = this.createItem(data);

        listItem.appendChild(item);
    }

    getInputValue() {
        let name = this.containerForContactBox.querySelector('input[name="name"]').value,
            email = this.containerForContactBox.querySelector('input[name="email"]').value,
            phone = this.containerForContactBox.querySelector('input[name="phone"]').value;

        let result = null;

        if (name && email && phone) {
            result = {
                name: name,
                email: email,
                phone: phone
            }
        }

        return result;
    }

    createItem(data) {
        if (!data) return false;
        let item = document.createElement('div');
        item.classList.add('contact_box_item');
        let name = document.createElement('div'),
            phone = document.createElement('div'),
            email = document.createElement('div'),
            remove = document.createElement('div');

        name.classList.add('contact_box_item_name');
        name.innerHTML = data.name;

        phone.classList.add('contact_box_item_phone');
        phone.innerHTML = data.phone;

        email.classList.add('contact_box_item_email');
        email.innerHTML = data.email;

        remove.classList.add('contact_box_item_remove');
        remove.addEventListener('click',
            this.removeItem
        );
        item.appendChild(name);
        item.appendChild(email);
        item.appendChild(phone);
        item.appendChild(remove);

        return item;
    }

    removeItem() {
        this.closest('.contact_box_item').remove();
    }
}

