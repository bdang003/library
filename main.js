let myLibrary = [];

myLibrary.push(new Book('hello','dude',2023));
myLibrary.push(new Book('hell','dud',202));
myLibrary.push(new Book('hel','du',20));

initializePage();

function initializePage(){
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    createAddButton();  
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