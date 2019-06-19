import '../styles/styles.scss';

import View from './bookmark_module/view.js';
import Model from './bookmark_module/model.js';
import Controller from './bookmark_module/controller.js';

// Bookmark working info
let bookmarkData = [];
const localStorageKeyName = "bookmarkStorage";
const APIkey = "5cf2af23508d7454cec43118791a3b9e494a2e5d8ad2a";
const API = `https://api.linkpreview.net/?key=${APIkey}&q=`;


const bookmarkView = new View;
const bookmarkModule = new Model(localStorageKeyName, bookmarkData, API);
const bookmarkController = new Controller(bookmarkView, bookmarkModule);


// First Page Opening function
bookmarkController.firstPageOpenCreatingBookmarkList();
// ============================================================================================

/* Туту використовується безплатний API для отримання інфи про введений сайт. 
Тому скорочена назва(title) сайту буде записуватись в зкладку, якщо 
записів буде менше чим 60 за годину. В іншому випадку заклдка буде записуватись 
в такому вигляді, як Ви ввели*/

// Bookmark CLASS


// class Bookmark {
//   constructor(storageKey, data, template, domElement, input, API) {
//     this.storageKey = storageKey;
//     this.data = data;
//     this.template = template;
//     this.domElement = domElement;
//     this.input = input;
//     this.API = API;
//     this.notValidMessage =
//       "Синтаксична помилка! Введене вами значення не являється ссилкою. Виправте будь ласка.";
//     this.existsMessage = "Така закладка уже існує!";

//     this.firstPageOpenCreatingBookmarkList = function() {
//       const isActive = "localStorage" in window;
//       if (!window || !isActive) return;

//       const storageKeyData = JSON.parse(localStorage.getItem(this.storageKey));
//       if (storageKeyData !== null) {
//         this.data.push(...storageKeyData);
//         this.createBookmarkList();
//       }
//     };

//     this.createBookmarkList = function() {
//       const handlebarsTamplate = this.template.innerHTML.trim();
//       const handlebarsFunction = Handlebars.compile(handlebarsTamplate);
//       const handlebarsMarkup = handlebarsFunction(this.data);
//       this.domElement.innerHTML = handlebarsMarkup;
//     };

//     this.addToStorage = function() {
//       localStorage.setItem(this.storageKey, JSON.stringify(this.data));
//     };

//     this.isValidValue = function(value) {
//       const urlValidationRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
//       return urlValidationRegExp.test(value);
//     };

//     this.isHaveItem = function(newData) {
//       return this.data.some(
//         element =>
//           element.url === newData.url ||
//           element.typingValue === newData.typingValue ||
//           element.title === newData.title
//       );
//     };

//     this.fetchUrlInfoAndCreateListAndStorage = function(value) {
//       fetch(`${this.API}${value}`)
//         .then(response => {
//           if (response.status === 200) return response.json();
//           return response.status;
//         })
//         .then(data => {
//           let newDataItem = null;

//           if (typeof data === "number") {
//             newDataItem = { url: value, title: value, typingValue: value };
//           } else {
//             data.typingValue = value;
//             newDataItem = data;
//           }

//           if (this.isHaveItem(newDataItem)) return alert(this.existsMessage);

//           this.data.unshift(newDataItem);
//           this.createBookmarkList();
//           this.addToStorage();
//         })
//         .catch(error => console.log(error.statusText));
//     };

//     this.listenerAddBookmarkItem = function(event) {
//       event.preventDefault();
//       const value = this.input.value.trim();

//       const isValid = this.isValidValue(value);
//       if (!isValid) {
//         return alert(this.notValidMessage);
//       }

//       this.fetchUrlInfoAndCreateListAndStorage(value);
//     };

//     this.listenerRemoveBookmarkItem = function(event) {
//       event.preventDefault();
//       const target = event.target;
//       if (target.nodeName !== "BUTTON") return;

//       const itemValue = target.previousElementSibling.textContent.trim();
//       this.data = this.data.filter(element => element.title !== itemValue);

//       this.createBookmarkList();
//       this.addToStorage();
//     };
//   }
// }



// // Create Bookmark class object
// const bookmark = new Bookmark(
//   localStorageKeyName,
//   bookmarkData,
//   bookmarkItemTemplate,
//   bookmarkList,
//   bookmarkInput,
//   API
// );


// // Listeners for Bookmark form
// bookmarkForm.addEventListener("submit", bookmark.listenerAddBookmarkItem.bind(bookmark));
// bookmarkList.addEventListener("click", bookmark.listenerRemoveBookmarkItem.bind(bookmark));
