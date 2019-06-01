import '../styles/styles.scss';

let bookmarkData = [];
const localStorageKeyName = 'bookmarkStorage';

const bookmark = document.querySelector('.bookmark');
const bookmarkForm = bookmark.querySelector('.bookmark_form-js');
const bookmarkInput = bookmarkForm.querySelector('.bookmark_input-js');
const bookmarkList = bookmark.querySelector('.bookmark_list-js');
const bookmarkItemTemplate = document.querySelector('.bookmark_item-template');
// const APIKey = '5cf2af23508d7454cec43118791a3b9e494a2e5d8ad2a';
// const API = `http://api.linkpreview.net/?key=${APIKey}&q=`;

firstPageOpenCreatingBookmarkList(
  localStorageKeyName,
  bookmarkData,
  bookmarkItemTemplate,
  bookmarkList,
);

bookmarkForm.addEventListener('submit', addBookmarkItem);
bookmarkList.addEventListener('click', removeBookmarkItem);

function addBookmarkItem(event) {
  event.preventDefault();
  const value = bookmarkInput.value.trim();
  const notValidMessage =
    'Синтаксична помилка! Введене вами значення не являється ссилкою. Виправте будь ласка.';
  const existsMessage = 'Така закладка уже існує!';

  const isValid = isValidValue(value);
  if (!isValid) {
    return alert(notValidMessage);
  }

  const isHaveItem = bookmarkData.some(element => element.url === value);
  if (isHaveItem) {
    return alert(existsMessage);
  }

  let newItemObj = { url: value };
  bookmarkData.unshift(newItemObj);

  createBookmarkList(bookmarkData, bookmarkItemTemplate, bookmarkList);
  addToStorage(localStorageKeyName, bookmarkData);
}

function removeBookmarkItem(event) {
  const target = event.target;
  const isRemoveBtn = target.classList.contains('bookmark_remove-js');
  if (!isRemoveBtn) return;

  const itemValue = target.previousElementSibling.textContent.trim();
  bookmarkData = bookmarkData.filter(element => element.url !== itemValue);

  createBookmarkList(bookmarkData, bookmarkItemTemplate, bookmarkList);
  addToStorage(localStorageKeyName, bookmarkData);
}

// ===============================================================
// HELPERS
function firstPageOpenCreatingBookmarkList(
  storageKey,
  data,
  template,
  domElement,
) {
  const isActive = 'localStorage' in window;
  if (!window || !isActive) return;

  const storageKeyData = JSON.parse(localStorage.getItem(storageKey));
  if (storageKeyData !== null) {
    data.push(...storageKeyData);
    createBookmarkList(data, template, domElement);
  }
}

function addToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function createBookmarkList(data, template, domElement) {
  const handlebarsTamplate = template.innerHTML.trim();
  const handlebarsFunction = Handlebars.compile(handlebarsTamplate);
  const handlebarsMarkup = handlebarsFunction(data);
  domElement.innerHTML = handlebarsMarkup;
}

function isValidValue(value) {
  const urlValidationRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  return urlValidationRegExp.test(value);
}
