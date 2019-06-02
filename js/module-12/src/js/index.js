import '../styles/styles.scss';

// Bookmark CLASS
class Bookmark {
  constructor(storageKey, data, template, domElement, input) {
    this.storageKey = storageKey;
    this.data = data;
    this.template = template;
    this.domElement = domElement;
    this.input = input;
    this.notValidMessage = "Синтаксична помилка! Введене вами значення не являється ссилкою. Виправте будь ласка.";
    this.existsMessage = "Така закладка уже існує!";
    
    this.firstPageOpenCreatingBookmarkList = function() {
      const isActive = "localStorage" in window;
      if (!window || !isActive) return;

      const storageKeyData = JSON.parse(localStorage.getItem(this.storageKey));
      if (storageKeyData !== null) {
        this.data.push(...storageKeyData);
        this.createBookmarkList();
      }
    };

    this.createBookmarkList = function() {
      const handlebarsTamplate = this.template.innerHTML.trim();
      const handlebarsFunction = Handlebars.compile(handlebarsTamplate);
      const handlebarsMarkup = handlebarsFunction(this.data);
      this.domElement.innerHTML = handlebarsMarkup;
    };

    this.addToStorage = function() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    };

    this.isValidValue = function(value) {
      const urlValidationRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      return urlValidationRegExp.test(value);
    };

    this.listenerAddBookmarkItem = function(event) {
      event.preventDefault();
      const value = this.input.value.trim();

      const isValid = this.isValidValue(value);
      if (!isValid) {
        return alert(this.notValidMessage);
      }

      const isHaveItem = this.data.some(element => element.url === value);
      if (isHaveItem) {
        return alert(this.existsMessage);
      }

      const newDataItemObj = { url: value };
      this.data.unshift(newDataItemObj);

      this.createBookmarkList();
      this.addToStorage();
    };

    this.listenerRemoveBookmarkItem = function(event) {
      event.preventDefault();
      const target = event.target;     
      if (target.nodeName !== "BUTTON") return;
    
      const itemValue = target.previousElementSibling.textContent.trim();
      this.data = this.data.filter(element => element.url !== itemValue);
    
      this.createBookmarkList();
      this.addToStorage();
    }
  }
}

// Select DOM Elements
const bookmarkForm = document.querySelector(".bookmark_form-js");
const bookmarkInput = bookmarkForm.querySelector(".bookmark_input-js");
const bookmarkList = document.querySelector(".bookmark_list-js");
const bookmarkItemTemplate = document.querySelector(".bookmark_item-template");

// Bookmark working info
const localStorageKeyName = "bookmarkStorage";
let bookmarkData = [];
const APIKey = "5cf2af23508d7454cec43118791a3b9e494a2e5d8ad2a";
const API = `http://api.linkpreview.net/?key=${APIKey}&q=`;

// Create Bookmark class object
const bookmark = new Bookmark(
  localStorageKeyName,
  bookmarkData,
  bookmarkItemTemplate,
  bookmarkList,
  bookmarkInput
);

// First Page Opening function
bookmark.firstPageOpenCreatingBookmarkList();

// Listeners for Bookmark form
bookmarkForm.addEventListener("submit", bookmark.listenerAddBookmarkItem.bind(bookmark));
bookmarkList.addEventListener("click", bookmark.listenerRemoveBookmarkItem.bind(bookmark));



