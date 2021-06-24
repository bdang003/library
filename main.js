let myLibrary = [];

initializePage();

function initializePage(){
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    createAddButton();  
    if(!myLibrary.length){
        window.alert(`looks like your library is empty. Let's add a book.`);
        addBookToLibrary();
    }
}

function createAddButton(){
    let addButton = document.createElement('button');
    addButton.innerHTML= 'Add Book';
    addButton.type='submit';
    addButton.onclick = function (){
        addBookToLibrary();
    }
    main.appendChild(addButton);
}

function Book(title, author, year){
    this.title= title
    this.author= author
    this.year = year
}

function addBookToLibrary(){
    var title = prompt('title', '');
    var author = prompt('author', '');
    var yearPublished = prompt(' year published', '');
    myLibrary.push(new Book(title, author, yearPublished));
}