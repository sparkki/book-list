import React from 'react';
import Modal from './Modal';
import '../styles/BookItem.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsisV);

class BookItem extends React.Component {

    render() {

    const {books, handleUpdate, getDeleteModal, errorUpd, selectItem, activeItemId} = this.props;
    const errorTxt = " - This field cannot be empty!";

        return (
          <div  id={books.id} className="card book">
           <a className={'card-link ' + (books.id === activeItemId ? 'active' : '')} data-toggle="collapse"
           href={"#row" + books.id} onClick={selectItem}>
            <div className="card-header">
                 <span className="titleName pr-3">{books.title}</span><span className="authorName">{books.author}</span>
                 <span id="ellipsis" className="float-right"><FontAwesomeIcon icon={faEllipsisV}/></span>
            </div>
            </a>
            <div id={"row" + books.id} className="collapse" data-parent="#accordion2">
              <div className="card-body">
                  <form onSubmit={(event) => handleUpdate(event)}>
                    <div className="form-group">
                    <label htmlFor="title" className={errorUpd ? 'text-danger' : ''}>Title {errorUpd && <small className="text-danger">
                    {errorTxt}</small>}</label>
                      <input className={errorUpd ? 'form-control is-invalid' : 'form-control'} name="title" aria-describedby="titleHelp" defaultValue={books.title}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="author">Author</label><small>&nbsp; (optional)</small>
                      {/*uncontrolled since defaultValue is in use*/}
                      <input className="form-control" name="author"  defaultValue={books.author} />
                      <input type="hidden" className="form-control" name="id" value={books.id}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label><small>&nbsp; (optional)</small>
                      <textarea className="form-control" name="description" rows="3" defaultValue={books.description}></textarea>
                    </div>
                    <div className="form-group float-right">
                    <button onClick={() => getDeleteModal(books)} data-toggle="modal"
                    data-target="#deleteModal" type="button" className="btn btn-danger mr-3">Delete</button>
                      <button type="submit" className="btn btn-success save-btn">Save Changes</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        );



    }
}

export default BookItem;
