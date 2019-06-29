import './bookmarkList.scss';
import React from 'react';
import { throws } from 'assert';

export default class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.openEditHandler = this.openEditHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }

  takeCheckedItemText(targetElement) {
    const checkedItem = targetElement.closest('li');
    const checkedItemText = Array.from(checkedItem.children)
      .find(elem => elem.nodeName === 'A')
      .textContent.trim();
    return checkedItemText;
  }

  openEditHandler(event) {
    event.preventDefault();
    const editItemText = this.takeCheckedItemText(event.target);
    this.props.writeEditedTextToState(editItemText);
    this.props.showEditor();
  }

  removeHandler(event) {
    event.preventDefault();
    const removeItemText = this.takeCheckedItemText(event.target);
    this.props.removeFromState(removeItemText);
  }

  render() {
    return (
      <ul className="bookmark_list bookmark_list-js">
        {this.props.arrayForRender.length > 0 &&
          this.props.arrayForRender.map((elem, i) => {
            return (
              <li key={i} className="bookmark_item">
                <a
                  className="bookmark_link bookmark_link-js"
                  href={elem.url}
                  title={elem.link}>
                  {elem.title}
                </a>
                <button
                  type="button"
                  className="bookmark_buttons bookmark_rename bookmark_rename-js"
                  onClick={this.openEditHandler}>
                  Rename
                </button>
                <button
                  type="button"
                  className="bookmark_buttons bookmark_remove bookmark_remove-js"
                  onClick={this.removeHandler}>
                  Remove
                </button>
              </li>
            );
          })}
      </ul>
    );
  }
}
