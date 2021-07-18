let myLibrary = [];
for(let i=0; i<1; i++){ //creates temp list of books for library
    myLibrary.push(new Book(`book${i}`, `book${i}`));
} //remove when you are ready to do without it

initializePage();

function initializePage(){
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    for(let i=0; i<myLibrary.length; i++){
        createBookDiv(myLibrary[i]);
    }
    const form = document.querySelector('#form');
    console.log(form);
    form.addEventListener('submit', addBookToLibrary);
}

function Book(title, author){
    this.title= title
    this.author= author
}

function addBookToLibrary(e){
    e.preventDefault();
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let newBook = new Book(title,author);
    myLibrary.push(newBook);
    createBookDiv(newBook);
}

function createBookDiv(book){
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    let title = document.createElement('h1');
    title.appendChild(document.createTextNode(book.title));
    let author = document.createElement('h2');
    author.appendChild(document.createTextNode(book.author));
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    library.appendChild(bookDiv);
}