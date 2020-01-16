import React from "react";

function Modal(props) {
  return (
    <div className="modal-overlay file-details-modal" onClick={props.onClose}>
      <section className="modal-container" onClick={props.containerClick}>
        <header className="modal-header">
          <h1>About</h1>
        </header>
        <div className="modal-contents">
          <p>Putting some text in the modal</p>
        </div>
        <footer className="modal-footer tabset-modal-file-details-footer">
          <button tabIndex="-1" className="button button-filled" onClick={props.onClose}>
            OK
          </button>
        </footer>
        <button tabIndex="-1" className="modal-close-button close-modal" onClick={props.onClose} />
      </section>
    </div>
  );
}

export default Modal;
