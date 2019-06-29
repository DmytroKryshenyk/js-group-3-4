import './edit.scss';
import React from 'react';

export default class Edit extends React.Component {
  constructor() {
    super();
    this.editHandler = this.editHandler.bind(this);
  }

  editHandler(event) {
    event.preventDefault();
    const editedText = document.querySelector('.edit_input-js').value.trim();
    this.props.edit(editedText);
    this.props.closeEditor();
  }

  render() {
    return (
      <article className="edit">
        <textarea className="edit_input edit_input-js" />
        <button
          type="button"
          className="bookmark_buttons edit_submit edit_submit-js"
          onClick={this.editHandler}>
          Rename
        </button>
      </article>
    );
  }
}
