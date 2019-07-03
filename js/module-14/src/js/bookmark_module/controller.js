export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // Select DOM elements
    this.form = document.querySelector('.bookmark_form-js');
    this.input = document.querySelector('.bookmark_input-js');
    this.list = document.querySelector('.bookmark_list-js');

    // First Page Opening function
    this.firstPageOpenFn = function() {
      if (!window || !('localStorage' in window)) return;
      this.model.updatingDataFromLocalStorage();
      this.view.createBookmarkList(this.model.data, this.list);
    };

    // Listener function for adding bookmark item
    this.listenerAddHandler = function(event) {
      event.preventDefault();
      const Itemvalue = this.input.value.trim();

      const isValid = this.isValidValue(Itemvalue);
      if (!isValid) {
        this.view.showNotValidMessage();
        return;
      }

      this.model.fetchUrlInfo(Itemvalue).then(newDataItem => {
        if (this.isHaveItem(newDataItem)) {
          this.view.showExistMessage();
          return;
        }
        this.model.addItemToData(newDataItem);
        this.model.updatingLocalStorageFromData();
        this.view.createBookmarkList(this.model.data, this.list);
      });
    };

    // Listener function for removing bookmark item
    this.listenerRemoveHandler = function(event) {
      const target = event.target;
      if (target.nodeName !== 'BUTTON') return;

      const itemValue = target.previousElementSibling.textContent.trim();

      this.model.removeItemFromData(itemValue);
      this.model.updatingLocalStorageFromData();
      this.view.createBookmarkList(this.model.data, this.list);
      console.log(this.model.data);
    };

    // Add Listeners for bookmark form
    this.form.addEventListener('submit', this.listenerAddHandler.bind(this));
    this.list.addEventListener('click', this.listenerRemoveHandler.bind(this));

    // HELPERS ===============================
    // Input url validation
    this.isValidValue = function(value) {
      const urlValidationRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      return urlValidationRegExp.test(value);
    };

    // Сhecking, do we have this item
    this.isHaveItem = function(newData) {
      return this.model.data.some(
        element =>
          element.url === newData.url ||
          element.typingValue === newData.typingValue ||
          element.title === newData.title,
      );
    };
  }
}
