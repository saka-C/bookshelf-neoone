// DOM Manipulation
const books = [];
const customEvent = 'custom-event';

// Storage
const eventSaved = 'saved-Books';
const storageKey = 'Books';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.querySelector('.form-container form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBooks();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function saveData() {
    if (isStorageExist()) {
        const parsedBooks = JSON.stringify(books);
        localStorage.setItem(storageKey, parsedBooks);
        document.dispatchEvent(new Event(customEvent));
    }
}

function isStorageExist() {
    if (typeof (Storage) === 'undefined') {
        alert('Browser tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const dataSaved = localStorage.getItem(storageKey);
    let data = JSON.parse(dataSaved);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(customEvent));
}

function addBooks() {
    let titleBook = document.getElementById('judulBuku').value;
    let authorBook = document.getElementById('penulisBuku').value;
    let yearBook = document.getElementById('tanggalBaca').value;
    let isReadBook = document.getElementById('sudahDibaca').checked;

    const makeUniqId = generateId();
    const bookObject = makeBookObject(makeUniqId, titleBook, authorBook, yearBook, isReadBook);

    books.push(bookObject);

    document.dispatchEvent(new Event(customEvent));
    saveData();
}

function generateId() {
    return +new Date();
}

function makeBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    };
}

function makeBookItem(bookObject) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${bookObject.title}</td>
        <td>${bookObject.author}</td>
        <td>${bookObject.year}</td>
    `;

    if (bookObject.isCompleted) {
        const completedDate = new Date().toLocaleDateString();
        row.innerHTML += `<td>${completedDate}</td>`;

        const actions = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = ' ❌';
        deleteButton.classList.add('btn-delete');
        deleteButton.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        actions.appendChild(deleteButton);
        row.appendChild(actions);
    } else {
        const actions = document.createElement('td');
        const doneButton = document.createElement('button');
        doneButton.innerText = '✔️';
        doneButton.classList.add('btn-done');

        doneButton.addEventListener('click', function () {
            markAsRead(bookObject.id);
        });

        actions.appendChild(doneButton);
        row.appendChild(actions);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = ' ❌';
        deleteButton.classList.add('btn-delete');
        deleteButton.addEventListener('click', function () {
            deleteBook(bookObject.id);
        });

        actions.appendChild(deleteButton);
        row.appendChild(actions);
        
    }

    return row;
}

function markAsRead(booksId) {
    const bookIndex = findBookIndex(booksId);

    if (bookIndex === -1) return;

    alert('Yakin ingin menandai sudah selesai dibaca ?');

    books[bookIndex].isCompleted = true;
    document.dispatchEvent(new Event(customEvent));
    saveData();
}

function deleteBook(bookId) {
    const bookIndex = findBookIndex(bookId);

    if (bookIndex === -1) return;

    const confirmDelete = confirm('Yakin ingin menghapus buku ini?');

    if (confirmDelete) {
        books.splice(bookIndex, 1); // Menghapus buku dari array books
        document.dispatchEvent(new Event(customEvent));
        saveData();
    }
}

function findBookIndex(bookId) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) {
            return i;
        }
    }
    return -1;
}

document.addEventListener(customEvent, function () {
    const sedangDibacaTable = document.getElementById('sedangDibacaTable');
    const sudahDibacaTable = document.getElementById('sudahDibacaTable');

    sedangDibacaTable.querySelector('tbody').innerHTML = '';
    sudahDibacaTable.querySelector('tbody').innerHTML = '';

    for (const bookItem of books) {
        const bookRow = makeBookItem(bookItem);

        if (bookItem.isCompleted) {
            sudahDibacaTable.querySelector('tbody').appendChild(bookRow);
        } else {
            sedangDibacaTable.querySelector('tbody').appendChild(bookRow);
        }
    }
});






// Fungsi untuk animasi scroll ke suatu elemen
function scrollToElement(element) {
  window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop,
  });
}

// smooth scroll
const sudahDibacaLink = document.getElementById('a-kuning');
sudahDibacaLink.addEventListener('click', function (e) {
  e.preventDefault();
  const donereadSection = document.getElementById('done-read');
  scrollToElement(donereadSection);
});

const listBacaanLink = document.getElementById('a-merah');
listBacaanLink.addEventListener('click', function (e) {
  e.preventDefault();
  const donereadSection = document.getElementById('list-read');
  scrollToElement(donereadSection);
});

const AddBookLink = document.getElementById('a-hijau');
AddBookLink.addEventListener('click', function (e) {
  e.preventDefault();
  const donereadSection = document.getElementById('add-book');
  scrollToElement(donereadSection);
});



// Hamburger navbar
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
navLinks.classList.toggle('active');
});


const navbar = document.querySelector(".navbar");



// Popup
const popup = document.getElementById('popup');
const showPopupButton = document.getElementById('showPopupButton');

function openPopup() {
    popup.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
}

showPopupButton.addEventListener('click', openPopup);
