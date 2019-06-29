import './backdrop.scss';
import React from 'react';

export default class Backdrop extends React.Component {
  constructor(props) {
    super(props);
    this.closeBackdropHandler = this.closeBackdropHandler.bind(this);
  }

  closeBackdropHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('backdrop')) {
      this.props.closeBackdrop();
    }
  }

  render() {
    return (
      <div className="backdrop" onClick={this.closeBackdropHandler}>
        {this.props.children}
      </div>
    );
  }
}
