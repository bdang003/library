let myLibrary = [];
for(let i=0; i<5; i++){ //creates temp list of books for library
    myLibrary.push(new Book(`book${i}`, `book${i}`));
} //remove when you are ready to do without it

initializePage();

function initializePage(){
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    createAddButton();  
    for(let i=0; i<myLibrary.length; i++){
        createBookDiv(myLibrary[i]);
    }
}

function createAddButton(){
    let addButton = document.createElement('button');
    addButton.innerHTML= 'Add Book';
    addButton.type='submit';
    addButton.onclick = function (){
        addBookToLibrary();
    }
    main.appendChild(addButton); //attaches addButton to main
}

function Book(title, author){
    this.title= title
    this.author= author
}

function addBookToLibrary(){ //uses window.prompt to add new book
    let title = prompt('title', 'default');
    let author = prompt('author', 'default');
    let newBook = new Book(title, author);
    myLibrary.push(newBook);
    createBookDiv(newBook); //create div with details
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