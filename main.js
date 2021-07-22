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
    const readCount = document.querySelector('#readCount');
    if(!myLibrary.length){
        createTempLibrary();
    }
    else{
        updateReadCount();
        for(let i=0; i<myLibrary.length; i++){
            createBookDiv(myLibrary[i]);
        }
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
    updateReadCount();
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
    let notReadBtn = document.createElement('button');
    readBtn.id = `book${book.index}ReadBtn`;
    notReadBtn.id = `book${book.index}NotReadBtn`;
    if(book.readStatus) bookDiv.classList.add('beenRead'); //adds 'beenRead' status if needed
    readBtn.innerHTML = 'Read';
    notReadBtn.innerHTML = 'Not Read';
    readBtn.onclick = ()=>changeReadStatus(book,true); //attaches function to read button to change status and text
    notReadBtn.onclick = ()=>changeReadStatus(book,false);
    let rmBtn = document.createElement('button'); //create remove button
    rmBtn.id = "rmBtn";
    rmBtn.innerHTML ='X';
    rmBtn.onclick = ()=>removeBook(book);
    let rmBtnDiv = document.createElement('div'); //creates div for rmBtn to allow it to be align on right side
    rmBtnDiv.id='rmBtnDiv';
    rmBtnDiv.append(rmBtn);
    bookDiv.appendChild(rmBtnDiv);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(notReadBtn);
    library.appendChild(bookDiv);
}

function changeReadStatus(book, readStatus){ 
    book.readStatus = readStatus; //changes read status
    localStorage.setItem("library", JSON.stringify(myLibrary)); //stores 'read status' on local storage
    let targetBookDiv = document.querySelector(`#book${book.index}`); //finds div related to book
    book.readStatus ? targetBookDiv.classList.add('beenRead') //adds/removes beenRead class for CSS
                    : targetBookDiv.classList.remove('beenRead');
    updateReadCount();
}

function removeBook(targetBook){
    let targetBookDiv = document.querySelector(`#book${targetBook.index}`);
    targetBookDiv.remove(); //removes book entry from user's page
    myLibrary.splice(myLibrary.indexOf(targetBook),1); //removes book entry from myLibrary[]
    localStorage.setItem("library", JSON.stringify(myLibrary)); //updates local storage library
    updateReadCount();
}

function resetLibrary(){
    myLibrary.forEach(book=>{
        let targetBook = document.querySelector(`#book${book.index}`);
        targetBook.remove();
    });
    localStorage.clear();
    localStorage.setItem('libIncrIndex', 0);
    myLibrary = [];
    updateReadCount();
}

function updateReadCount(){
    readCount.innerHTML=`${myLibrary.filter(book=>book.readStatus == true).length} read / ${myLibrary.length} total`;
}

function createTempLibrary(){
    let Book1 = new Book('temp1', 'To Kill a Mocking Bird', 'Harper Lee', true);
    myLibrary.push(Book1); //adds new book entry to library
    createBookDiv(Book1);
    let Book2 = new Book('temp2', 'The Great Gatsby', 'F. Scott Fitzgerald', true);
    myLibrary.push(Book2); //adds new book entry to library
    createBookDiv(Book2);
    let Book3 = new Book('temp3', 'One Hundred Years of Solitude', 'Gabriel García Márquez', false);
    myLibrary.push(Book3); //adds new book entry to library
    createBookDiv(Book3);
    localStorage.setItem("library", JSON.stringify(myLibrary)); //stores on local storage
    updateReadCount();
}