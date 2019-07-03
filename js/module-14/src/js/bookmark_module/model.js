export default class Model {
  constructor(storageKey, data, API) {
    this.storageKey = storageKey;
    this.API = API;
    this.data = data;

    // =====================================

    this.updatingDataFromLocalStorage = function(data = this.data, key = this.storageKey) {
      const storageData = JSON.parse(localStorage.getItem(key));
      if (storageData !== null) data.push(...storageData);
    };

    this.updatingLocalStorageFromData = function(data = this.data, key = this.storageKey ) {
      localStorage.setItem(key, JSON.stringify(data));
    };

    this.addItemToData = function(newItem, data = this.data) {
      if (newItem instanceof Object && !(newItem instanceof Array)) {
        data.unshift(newItem);
      } else{return null}
      

    };

    this.removeItemFromData = function(ItemValue) {
      if (typeof ItemValue !== 'string') {return null}
      this.data = this.data.filter(element => element.title !== ItemValue);
    };

    // Fetching url info and return object with this info
    this.fetchUrlInfo = function(inputValue) {
      return fetch(`${this.API}${inputValue}`)
        .then(response => {
          if (response.ok) return response.json();
          return response.status;
        })
        .then(fetchingData => {
          return this.creatingDataItem(fetchingData, inputValue);
        })
        .catch(error => console.log(error.statusText));
    };

    this.creatingDataItem = function(fetchingItem, inputValue) {
      if (typeof fetchingItem === 'number') {
        return { url: inputValue, title: inputValue, typingValue: inputValue };
      }

      fetchingItem.typingValue = inputValue;
      return fetchingItem;
    };
  }
}
