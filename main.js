let myLibrary;
let libIncrIndex;

initializePage();

function Book(index, title, author, readStatus){ //Book constructor
    this.index = index
    this.title= title
    this.author= author
    this.readStatus = readStatus //read status assigned either true/false
}

function initializePage(){
    localStorage['library'] ? myLibrary = JSON.parse(localStorage.getItem('library')) : myLibrary = []; //retrieves saved library array or intializes empty array
    localStorage['libIncrIndex'] ? libIncrIndex = JSON.parse(localStorage.getItem('libIncrIndex')) : //retrieves current library index to help with queryselector
                                   localStorage.setItem('libIncrIndex', 0); 
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    for(let i=0; i<myLibrary.length; i++){
        createBookDiv(myLibrary[i]);
    }
    const form = document.querySelector('#form'); //creates form that allows user to add new book
    form.addEventListener('submit', addBookToLibrary); //submit button adds new book to library
    const reset = document.querySelector('#reset');
    reset.onclick=()=>resetLibrary();
}

function addBookToLibrary(e){ 
    e.preventDefault(); //prevents page from refreshing
    let index = localStorage.getItem('libIncrIndex'); //assign book index for queryselector usage
    localStorage.setItem('libIncrIndex', parseInt(localStorage.getItem('libIncrIndex'))+1); //increments index for later use for next book added
    let title = normalizeText(form.elements['title'].value);
    let author = normalizeText(form.elements['author'].value);
    let readStatus = form.elements['readStatus'].value=='true'; //'read status' assign boolean true/false
    if(myLibrary.find(book=>book.title==title && book.author==author)) alert('This book is already in your library!');
    else{
        let newBook = new Book(index,title,author,readStatus);
        myLibrary.push(newBook); //adds new book entry to library
        localStorage.setItem("library", JSON.stringify(myLibrary)); //stores on local storage
        createBookDiv(newBook);
    }
    form.reset(); 
}

function normalizeText(string){
    let str = string.toLowerCase().split(/\s+/);
    for(let i=0; i<str.length; i++){
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function createBookDiv(book){
    let bookDiv = document.createElement('div'); //creates book div
    bookDiv.classList.add('book');
    bookDiv.id = `book${book.index}`; //adds id to allow for changes based on library[] 
    let title = document.createElement('div'); //creates and attaches title div
    title.innerHTML= book.title;
    title.classList.add('bookText');
    let author = document.createElement('div'); //creates and attaches author div
    author.innerHTML='By: ' + book.author;
    author.classList.add('bookText');
    let readBtn = document.createElement('button'); //creates read button
    readBtn.id = `book${book.index}ReadBtn`;
    if(book.readStatus) bookDiv.classList.add('beenRead'); //adds 'beenRead' status if needed
    book.readStatus ? readBtn.innerHTML='Read' : readBtn.innerHTML='Not Read'; //assign text based on read status
    readBtn.onclick = ()=>changeReadStatus(book); //attaches function to read button to change status and text
    let rmBtn = document.createElement('button'); //create remove button
    rmBtn.innerHTML ='Remove';
    rmBtn.onclick = ()=>removeBook(book);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(rmBtn);
    library.appendChild(bookDiv);
}

function changeReadStatus(book){ 
    book.readStatus = book.readStatus ? false : true; //changes read status
    localStorage.setItem("library", JSON.stringify(myLibrary)); //stores 'read status' on local storage
    let targetBookDiv = document.querySelector(`#book${book.index}`); //finds div related to book
    let targetBookReadBtn = document.querySelector(`#book${book.index}ReadBtn`);
    book.readStatus ? targetBookReadBtn.innerHTML = "Read" : targetBookReadBtn.innerHTML = "Not Read"; //changes innerHTML to reflect change
    book.readStatus ? targetBookDiv.classList.add('beenRead') //adds/removes beenRead class for CSS
                    : targetBookDiv.classList.remove('beenRead');
}

function removeBook(targetBook){
    let targetBookDiv = document.querySelector(`#book${targetBook.index}`);
    targetBookDiv.remove(); //removes book entry from user's page
    myLibrary.splice(myLibrary.indexOf(targetBook),1); //removes book entry from myLibrary[]
    localStorage.setItem("library", JSON.stringify(myLibrary)); //updates local storage library
}

function resetLibrary(){
    myLibrary.forEach(book=>{
        let targetBook = document.querySelector(`#book${book.index}`);
        targetBook.remove();
    });
    localStorage.clear();
    localStorage.setItem('libIncrIndex', 0);
    myLibrary = [];
}