const myLibrary=[];

const addBookButton = document.getElementById("addBook");
const dialog = document.getElementById("dialog");
const submitButton = document.getElementById("submitBook");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readStatus = this.read ? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const bookContainer = document.getElementById("booksGrid");
    bookContainer.innerHTML = "";
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        const deleteButton = document.createElement("button");
        bookCard.classList.add("bookCard");
        bookCard.innerHTML = `
            <h2>Title:${book.title}</h2>
            <p>Author:${book.author}</p>
            <p>Pages:${book.pages}</p>
            <p>Read status:${book.read ? 'Read' : 'Not Read'}</p>        
            <button class="deleteButton">Delete</button>
            <button class="readButton">Read</button>
        
        `;
        bookContainer.appendChild(bookCard);           
    });
    bookContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("deleteButton")) {
            const button= event.target;
            const bookCard = button.parentElement;
            const index= Array.from(bookCard.parentElement.children).indexOf(bookCard);
            myLibrary.splice(index, 1);
            displayBooks();
        }
    }); 
    bookContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("readButton")) {
            const button= event.target;
            const bookCard = button.parentElement;
            const index= Array.from(bookCard.parentElement.children).indexOf(bookCard);
            myLibrary[index].read = !myLibrary[index].read;
            displayBooks();
        }
    });
};

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

submitButton.addEventListener("click", () => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
});

