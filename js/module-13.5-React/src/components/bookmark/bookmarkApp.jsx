import './bookmarkApp.scss';
import React from 'react';
import BookmarkForm from './bookmarkForm.jsx';
import BookmarkList from './bookmarkList.jsx';
import Backdrop from '../backdrop/backdrop.jsx';
import Edit from '../edit/edit.jsx';

// Bookmark Component
export default class BookmarkApp extends React.Component {
  constructor() {
    super();
    this.state = {
      bookmarksArr: [],
      backdropStatus: false,
      editedItemTitle: '',
    };

    this.localStorageKey = 'bookmarkStorage';

    // assign father context 'this' in fathers methods which transfer to Child BookmarkForm component
    this.addToState = this.addToState.bind(this);
    this.isHaveFetchingItem = this.isHaveFetchingItem.bind(this);
    this.isHaveTypingValue = this.isHaveTypingValue.bind(this);
    this.updateLocalStorageFromState = this.updateLocalStorageFromState.bind(
      this,
    );

    // assign father context 'this' in fathers methods which transfer to Child Backdrop and  BookmarkList components
    this.closeBackdrop = this.closeBackdrop.bind(this);

    // assign father context 'this' in fathers methods which transfer to Child BookmarkList component
    this.removeFromState = this.removeFromState.bind(this);
    this.writeEditedTextToState = this.writeEditedTextToState.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    this.updateStateFromLocalStorage();
  }

  updateStateFromLocalStorage() {
    const storageData = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (storageData !== null)
      this.setState({
        bookmarksArr: [...this.state.bookmarksArr, ...storageData],
      });
  }

  updateLocalStorageFromState() {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.state.bookmarksArr),
    );
  }

  addToState(bookmarkItem) {
    this.setState({ bookmarksArr: [...this.state.bookmarksArr, bookmarkItem] });
  }

  removeFromState(bookmarkTitle) {
    this.setState(
      {
        bookmarksArr: this.state.bookmarksArr.filter(
          elem => elem.title !== bookmarkTitle,
        ),
      },
      () => {
        this.updateLocalStorageFromState();
      },
    );
  }

  writeEditedTextToState(text) {
    this.setState({ editedItemTitle: text });
  }

  showEditor() {
    this.setState({ backdropStatus: true });
  }

  edit(text) {
    this.setState(
      prevstate => {
        {
          bookmarksArr: prevstate.bookmarksArr.map(elem => {
            if (elem.title === this.state.editedItemTitle) {
              elem.title = text;
            }
          });
        }
      },
      () => {
        this.updateLocalStorageFromState();
      },
    );
  }

  closeBackdrop() {
    this.setState({ backdropStatus: false });
  }

  // // HELPERS ===============================
  // Сhecking, do we have this fetching item
  isHaveFetchingItem(newBookmark) {
    return this.state.bookmarksArr.some(
      elem =>
        elem.url === newBookmark.url ||
        elem.typingValue === newBookmark.typingValue ||
        elem.title === newBookmark.title,
    );
  }

  isHaveTypingValue(value) {
    return this.state.bookmarksArr.some(elem => elem.typingValue === value);
  }

  render() {
    return (
      <article className="bookmark">
        <BookmarkForm
          addToState={this.addToState}
          isHaveFetchingItem={this.isHaveFetchingItem}
          isHaveTypingValue={this.isHaveTypingValue}
          updateLocalStorageFromState={this.updateLocalStorageFromState}
        />
        <BookmarkList
          removeFromState={this.removeFromState}
          writeEditedTextToState={this.writeEditedTextToState}
          showEditor={this.showEditor}
          arrayForRender={this.state.bookmarksArr}
        />
        {this.state.backdropStatus && (
          <Backdrop closeBackdrop={this.closeBackdrop}>
            <Edit
              edit={this.edit}
              editedItemTitle={this.state.editedItemTitle}
              closeEditor={this.closeBackdrop}
            />
          </Backdrop>
        )}
      </article>
    );
  }
}
