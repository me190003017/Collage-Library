// 1 Store the data in localstorage
// 2 Give option to delete book
// 3 Add a scroll bar to the view

console.log("this is js code of library")

//constructor 
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display constructor
function Display() {

}

Display.prototype.add = function (book) {
    console.log("Adding to UI");
    tablebody = document.getElementById("tablebody");
    // let i=0;
    // while(i<localStorage.length){
        
    // }
    let uiString = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`;
    tablebody.innerHTML += uiString;
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
    //form sarri ki sarri field ko reset kar deta
}
Display.prototype.validate = function (book) {
    if (book.name.length < 1 || book.author.length < 1) {
        return false;
    } else {
        return true;
    }
}
Display.prototype.show = function (type, message) {
    let msg = document.getElementById('msg');
        if(type=="success"){
            msg.innerHTML = `           
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Success : ! </strong>${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }else{
            msg.innerHTML = `           
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Error : ! </strong>${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        }
    setTimeout(() => {
        msg.innerHTML = "";
    }, 3000);
}
//add method to display prototype

let index = 0;
//add submit eventListener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted the form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    localStorage.setItem(index, [book.name, book.author, book.type]);
    index++;
    console.log(localStorage);

    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your Book has been Successfully added");
    } else {
        display.show("danger", "Sorry you can't add this Book Please Check your BookName or Author's Name");
    }
    e.preventDefault();

}
