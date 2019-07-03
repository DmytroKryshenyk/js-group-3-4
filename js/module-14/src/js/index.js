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
bookmarkController.firstPageOpenFn();
// ============================================================================================

/* Туту використовується безплатний API для отримання інфи про введений сайт.
Тому скорочена назва(title) сайту буде записуватись в зкладку, якщо
записів буде менше чим 60 за годину. В іншому випадку заклдка буде записуватись
в такому вигляді, як Ви ввели*/


