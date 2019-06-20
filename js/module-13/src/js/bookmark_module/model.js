export default class Model {
  constructor(storageKey, data, API) {
    this.storageKey = storageKey;
    this.API = API;
    this.data = data;

    
    this.updatingDataFromLocalStorage = function() {
      const storageData = JSON.parse(localStorage.getItem(this.storageKey));
      if (storageData !== null) this.data.push(...storageData);
    };

    this.updatingLocalStorageFromData = function() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    };

    this.addItemToData = function(newItem) {
      this.data.unshift(newItem);
    };

    this.removeItemFromData = function(ItemValue) {
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
        return { url: inputValue, title: inputValue, typingValue: inputValue};
      } 

      fetchingItem.typingValue = inputValue;
      return fetchingItem;
      
    }
  }
}

