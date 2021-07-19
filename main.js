let myLibrary = [];
if(localStorage["library"]){
    myLibrary = JSON.parse(localStorage.getItem("library"));
}

initializePage();

function Book(title, author, readStatus){ //Book constructor
    this.title= title
    this.author= author
    this.readStatus = readStatus //read status assigned either true/false
}

function initializePage(){
    const main = document.querySelector('#main');
    const library = document.querySelector('#library');
    for(let i=0; i<myLibrary.length; i++){
        createBookDiv(myLibrary[i]);
    }
    const form = document.querySelector('#form'); //creates form that allows user to add new book
    form.addEventListener('submit', addBookToLibrary); //submit button adds new book to library
}

function addBookToLibrary(e){ 
    e.preventDefault(); //prevents page from refreshing
    let title = normalizeText(form.elements['title'].value);
    let author = normalizeText(form.elements['author'].value);
    let readStatus = form.elements['readStatus'].value=='true'; //read status assign boolean true/false
    let newBook = new Book(title,author,readStatus);
    form.reset(); 
    myLibrary.push(newBook);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    createBookDiv(newBook);
    //alert(`${title} by ${author} is already in your library`);
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
    bookDiv.id = `book${book.title.replace(/ +/g, "")+book.author.replace(/ +/g, "")}`; //adds id to allow for changes based on library[] 
    let title = document.createElement('div'); //creates and attaches title
    title.innerHTML= book.title;
    title.classList.add('bookText');
    let author = document.createElement('div'); //creates and attaches author
    author.innerHTML='By: ' + book.author;
    author.classList.add('bookText');
    let readBtn = document.createElement('button'); //creates read button
    readBtn.id = `book${book.title.replace(/ +/g, "")+book.author.replace(/ +/g, "")}ReadBtn`;
    if(book.readStatus) bookDiv.classList.add('beenRead'); //adds 'beenRead' status if needed
    book.readStatus ? readBtn.innerHTML='Read' : readBtn.innerHTML='Not Read'; //assign text based on read status
    readBtn.onclick = ()=>changeReadStatus(book); //attaches function to read button to change status and text
    let rmBtn = document.createElement('button');
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
    localStorage.setItem("library", JSON.stringify(myLibrary));
    let targetBookDiv = document.querySelector(`#book${book.title.replace(/ +/g, "")+book.author.replace(/ +/g, "")}`); //finds div related to book
    let targetBookReadBtn = document.querySelector(`#book${book.title.replace(/ +/g, "")+book.author.replace(/ +/g, "")}ReadBtn`);
    book.readStatus ? targetBookReadBtn.innerHTML = "Read" : targetBookReadBtn.innerHTML = "Not Read";
    book.readStatus ? targetBookDiv.classList.add('beenRead') //add/remove beenRead class
                    : targetBookDiv.classList.remove('beenRead');
}

function removeBook(targetBook){
    let targetBookDiv = document.querySelector(`#book${targetBook.title.replace(/ +/g, "")+targetBook.author.replace(/ +/g, "")}`);
    targetBookDiv.remove();
    myLibrary.splice(myLibrary.indexOf(targetBook),1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
}