import React from 'react';
import '../styles/Modal.scss';

class Modal extends React.Component {

    render() {

      const {delItemId, delItemName, handleDelete} = this.props;
      const hdrTxt = "Delete Book";
      const modalTxt = "Are you sure you want to delete this item?";

        return (<div className="modal fade" id="deleteModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{hdrTxt}</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">
                <p>{modalTxt}</p>
                <span className="font-weight-bold">{delItemName}</span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => handleDelete(delItemId)} data-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>);
    }
}

export default Modal;
