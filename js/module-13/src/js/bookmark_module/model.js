export default class Model {
  constructor(storageKey, data, API) {
    this.storageKey = storageKey;
    this.data = data;
    this.API = API;

    this.firstStorageUpdateData = function(storageValues) {
      this.data.push(storageValues);
    };

    this.addToStorage = function() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    };

    this.addItemToData = function(newDataItem) {
      this.data.unshift(newDataItem);
    };

    this.removeDuplicateValue = function(value) {
        this.data = this.data.filter(element => element.title !== value);
    }
  }
}
