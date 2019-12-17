import React from 'react';
import Alert from './Alert';
import '../styles/AddNewBook.scss';

class AddNewBook extends React.Component {

state = {
    showAlert: false,
}

//to bring tho focus to the first input field
setFocus = () => {
    this.titleInput.focus();
}

//success alert displayd if there are no errors
showAlert = (errorNew) => {
    if(!errorNew){
    this.setState({
      showAlert: true,
    });

    setTimeout(() => {
      this.setState({
        showAlert: false
      });
    }, 2000);

    this.setFocus();
   }
}

  render() {

    const {handleAdd, handleChange, author, title, description, errorNew} = this.props;
    const errorTxt = " - This field cannot be empty!";

    return (
        <div id="accordion1">
          <Alert
              showAlert={this.state.showAlert}
              errorNew={errorNew}
              />
          <div className="card">
           <div id="add-hdr" className="card-header">
              <button type="button" className="btn btn-primary btn-lg btn-block add-btn" data-toggle="collapse" href="#collapseNew" onClick={this.setFocus}>Add New Book</button>
            </div>
              <div id="collapseNew" className="collapse" data-parent="#accordion1">
                      <div className="card-body">
                          <form onSubmit={(event) => handleAdd(event)}>
                            <div className="form-group">
                              <label htmlFor="title" className={errorNew ? 'text-danger' : ''}>Title {errorNew && <small id="titleHelp" className="text-danger">
                                {errorTxt}</small>}</label>
                              <input value={title} name="title" ref={(input) => {this.titleInput = input;}} className={errorNew ? 'form-control is-invalid' : 'form-control'} id="title" aria-describedby="titleHelp"
                              onChange={(event) => handleChange(event)} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="author">Author</label><small>&nbsp; (optional)</small>
                              <input ref={(input) => {this.authorInput = input;}} name="author" className="form-control" id="author"
                              value={author} onChange={(event) => handleChange(event)} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="description">Description</label><small>&nbsp; (optional)</small>
                              <textarea value={description} name="description" className="form-control" id="description" rows="3" onChange={(event) => handleChange(event)}></textarea>
                            </div>
                            <div className="form-group float-right">
                              {/* <button type="button" className="btn btn-secondary mr-3" onClick={this.props.resetInputs}>Clear</button> */}
                              <button type="button" data-toggle="collapse" href="#collapseNew" className="btn btn-default mr-3" onClick={this.props.resetInputs}>Cancel</button>
                              <button type="submit" className="btn btn-success save-btn" onClick={() => this.showAlert(errorNew)}>Save New</button>
                            </div>
                          </form>
                     </div>
                </div>
            </div>
        </div>
    );
        }
}

export default AddNewBook;
