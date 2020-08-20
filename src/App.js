import React from 'react';
import axios from 'axios';
import AddNewBook from './components/AddNewBook';
import BookList from './components/BookList';
import './styles/App.scss';
//const apiEndpoint = 'http://localhost:5000/books';
//const apiEndpoint = 'https://my-json-server.typicode.com/books/';
const apiEndpoint = 'http://sparkki.github.io/book-list/db.json';


class App extends React.Component {

  state = {
    author: "",
    title: "",
    description: "",
    books: [],
    errorNew: false,
    errorUpd: false,
  }

async getBooks() {
    try {
      const response = await axios.get(apiEndpoint);
      this.setState({
        books: response.data
      });
       console.log(response);
    } catch (error) {
      console.error(error);
    }
}

componentDidMount() {
    this.getBooks();
}

handleChange = (event) => {
    this.setState({
         [event.target.name]: event.target.value,
         errorNew: false,
    });
}

handleAdd = async (event) => {
    event.preventDefault();
    if(this.handleValidation()){
          const bookObj = {
            author: this.state.author,
            title: this.state.title,
            description: this.state.description
          };
      try{
          const { data: book } = await axios.post(apiEndpoint, bookObj);
          const books = [...this.state.books, book];
          this.setState({
            books: books,
            author: "",
            title: "",
            description: "",
            errorNew: false,
          });
        } catch (error) {
          console.error(error);
        }
      }
}

handleUpdate = async (event) => {
     // event.preventDefault();
     const bookObj = {
       id: event.target.id.value,
       author: event.target.author.value,
       title: event.target.title.value,
       description: event.target.description.value
     };

    if(this.handleValidationUpd(event)){
      try {
        const {data} = await axios.put(apiEndpoint + '/' + bookObj.id, bookObj);
        const books = [...this.state.books];
        const index = books.indexOf(bookObj);
         books[index] = bookObj;
         this.setState({ books: books, errorUpd: false });
       } catch (error) {
          console.error(error);
        }
      }
      else if (!this.handleValidationUpd(event) && !bookObj.title) {
        event.preventDefault();
      }
}


handleDelete = async id => {
    try {
      await axios.delete(apiEndpoint + '/' + id);
      const books = this.state.books.filter(b => b.id !== id);
      this.setState({ books });
    } catch (error) {
      console.error(error);
    }
}

resetInputs = () => {
    this.setState({
      author: "",
      title: "",
      description: "",
      errorNew: false,
    });
}

//at least title must be filled in
handleValidation(){
        let titleNew = this.state.title;
        let formIsValid = true;

        if(!titleNew){
           formIsValid = false;
           this.setState({
             errorNew: true,
           });
        }
        return formIsValid;
}

/*
at least title must be filled in
this function is needed since update is implemented
without state property (due to defaultValues in input fields)
*/
handleValidationUpd(event) {
         let titleUpd = event.target.title.value;
         let formIsValid = true;

         if(!titleUpd){
           formIsValid = false;
           this.setState({
             errorUpd: true,
           });
         }
         return formIsValid;
}


render() {

  return (
    <div className="App">
        <div className="container">
        <h1 id="app-hdr">Book List</h1>
         <AddNewBook
             handleAdd={this.handleAdd}
             handleChange={this.handleChange}
             resetInputs={this.resetInputs}
             author={this.state.author}
             title={this.state.title}
             description={this.state.description}
             errorNew={this.state.errorNew}
          />
         <BookList
             books={this.state.books}
             handleUpdate={this.handleUpdate}
             handleDelete={this.handleDelete}
             errorUpd={this.state.errorUpd}
          />
         </div>
    </div>
  );
}
}
export default App;
