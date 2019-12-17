import React from 'react';
import Modal from './Modal';
import BookItem from './BookItem';
import '../styles/BookList.scss';


class BookList extends React.Component {

state = {
        delItemName: '', //state property to hold item name to be deleted
        delItemId: null, //state property to hold item id to be deleted
        activeItemId: null //state property to hold selected item
          }

/*id and name of the item to be deleted
to be displayed in the confirmation modal*/
  getDeleteModal = (books) => {
    this.setState ({
      delItemName: books.title,
      delItemId: books.id,
    })
  }

//highlights selected item in the list
  selectItem(activeId) {
    if(this.state.activeItemId !== activeId) {
    this.setState({ activeItemId: activeId });
  }
  else {
    this.setState({ activeItemId: null });
  }
  }


  render() {

    const {books, errorUpd} = this.props;

    return (<div id="accordion2">
             {books.map((books) => (
                 <BookItem
                    books={books}
                    handleUpdate={this.props.handleUpdate}
                    getDeleteModal={this.getDeleteModal}
                    errorUpd={errorUpd}
                    activeItemId={this.state.activeItemId}
                    selectItem={() => this.selectItem(books.id)}
                    key={books.id}
                    />
                ))}

               <Modal handleDelete={this.props.handleDelete}
                       delItemId={this.state.delItemId}
                       delItemName={this.state.delItemName}
                       />
           </div>
         );
        }
}

export default BookList;
