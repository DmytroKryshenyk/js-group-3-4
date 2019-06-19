export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;


    this.form = document.querySelector('.bookmark_form-js');
    this.input = document.querySelector('.bookmark_input-js');
    this.list = document.querySelector('.bookmark_list-js');

    this.firstPageOpenCreatingBookmarkList = function() {
      const isActive = 'localStorage' in window;
      if (!window || !isActive) return;

      const storageKeyData = JSON.parse(
        localStorage.getItem(this.model.storageKey),
      );
      if (storageKeyData !== null) {
        this.model.firstStorageUpdateData(...storageKeyData);
        this.view.createBookmarkList(this.model.data, this.list);
      }
    };

    this.isValidValue = function(value) {
      const urlValidationRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      return urlValidationRegExp.test(value);
    };

    this.isHaveItem = function(newData) {
      return this.model.data.some(
        element =>
          element.url === newData.url ||
          element.typingValue === newData.typingValue ||
          element.title === newData.title,
      );
    };

    this.fetchUrlInfoAndCreateListAndStorage = function(value) {
      fetch(`${this.model.API}${value}`)
        .then(response => {
          if (response.status === 200) return response.json();
          return response.status;
        })
        .then(data => {
          let newDataItem = null;

          if (typeof data === 'number') {
            newDataItem = { url: value, title: value, typingValue: value };
          } else {
            data.typingValue = value;
            newDataItem = data;
          }

          if (this.isHaveItem(newDataItem)) return this.view.showExistMessage();

          this.model.addItemToData(newDataItem);
          this.view.createBookmarkList(this.model.data, this.list);
          this.model.addToStorage();
        })
        .catch(error => console.log(error.statusText));
    };

    this.listenerAddBookmarkItem = function(event) {
      event.preventDefault();
      const value = this.input.value.trim();

      const isValid = this.isValidValue(value);
      if (!isValid) {
        this.view.showNotValidMessage();
        return;
      }

      this.fetchUrlInfoAndCreateListAndStorage(value);
    };

    this.listenerRemoveBookmarkItem = function(event) {
      event.preventDefault();
      const target = event.target;
      if (target.nodeName !== 'BUTTON') return;

      const itemValue = target.previousElementSibling.textContent.trim();

      this.model.addToStorage();
      this.model.removeDuplicateValue(itemValue);
      this.view.createBookmarkList(this.model.data, this.list);
    };

    // Listeners for Bookmark form
    this.form.addEventListener(
      'submit',
      this.listenerAddBookmarkItem.bind(this),
    );
    this.list.addEventListener(
      'click',
      this.listenerRemoveBookmarkItem.bind(this),
    );
  }
}
