import './bookmarkForm.scss';
import React from 'react';

export default class BookmarkForm extends React.Component {
  constructor(props) {
    super(props);

    this.APIkey = '5cf2af23508d7454cec43118791a3b9e494a2e5d8ad2a';
    this.API = `https://api.linkpreview.net/?key=${this.APIkey}&q=`;
    this.notValidMessage = 'Невірний формат ссилки!';
    this.existsMessage = 'Така закладка уже існує!';
    this.urlValidationRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

    this.addHandler = this.addHandler.bind(this);
  }

  // Fetching url info and return object with this info
  fetchUrlInfo(inputValue) {
    return fetch(`${this.API}${inputValue}`)
      .then(response => {
        if (response.ok) return response.json();
        return response.status;
      })
      .then(data => {
        if (typeof data !== 'number') {
          data.typingValue = inputValue;
          return data;
        }
        return { url: inputValue, title: inputValue, typingValue: inputValue };
      })
      .catch(error => console.log(error.statusText));
  }

  // LISTENERS Handlers
  addHandler(event) {
    event.preventDefault();

    const addInput = document.querySelector('.bookmark_addInput');
    const addInputValue = addInput.value.trim();

    const isValid = this.isValidUrl(addInputValue);
    const isHaveTypingValue = this.props.isHaveTypingValue(addInputValue);

    if (isHaveTypingValue) {
      return this.showExistMessage();
    }
    if (!isValid) {
      return this.showNotValidMessage();
    }

    this.fetchUrlInfo(addInputValue).then(newBookmarkItem => {
      if (this.props.isHaveFetchingItem(newBookmarkItem)) {
        this.showExistMessage();
        return;
      }
      this.props.addToState(newBookmarkItem);
      this.props.updateLocalStorageFromState();
    });
  }

  // HELPERS ===============================
  // Url validation
  isValidUrl(value) {
    return this.urlValidationRegExp.test(value);
  }

  showExistMessage() {
    alert(this.existsMessage);
  }

  showNotValidMessage() {
    alert(this.notValidMessage);
  }

  render() {
    return (
      <form
        className="bookmark_form bookmark_form-js"
        onSubmit={this.addHandler}>
        <label className="bookmark_label" htmlFor="bookmark_input">
          Add your new bookmark link
        </label>
        <input
          type="text"
          className="bookmark_addInput bookmark_addInput-js"
          id="bookmark_input"
          placeholder="Add new link here"
        />
        <button
          type="submit"
          className="bookmark_buttons bookmark_submit bookmark_submit-js">
          Add
        </button>
      </form>
    );
  }
}
