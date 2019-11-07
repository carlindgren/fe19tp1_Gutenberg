const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
let content;
let notes = [];

// tar bort infotexten när localstorage.length blir 1.
let hideInfo = () => {
    if (localStorage.length > 0) {
        info.remove();
        renderEditor();
    }
}

//funktion för att rendera editorn vid submit.
const renderEditor = () => {
    doc.classList.remove("hidden");
    info.remove();
}


quill.on('text-change', () => {
  content = quill.getContents()

});

addForm.addEventListener('submit', (e)=> {
    hideInfo();
    let input = addForm.add.value.trim(); //tar bort mellanrum
    let text = input.charAt(0).toUpperCase() + input.substring(1); //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();

    const note = {
        text,
        id: Date.now(), // bra med tanke på att vi ska visa när dokumenten skapades.
        content, content // lägga till ett nytt objekt för att spara documentet och kunna rendera.
    }
 

    if (text) { //om input inte är tom kör if-satsen
        list.innerHTML += `<li id="${note.id}">${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${text}</li>` //Här ska vi addera rubriken
        notes.push(note) //funkar inte bra!! 
        renderEditor()
    }
    saveNotes();
    addForm.reset()

});

//spara i local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}


const loadNotes = () => {
    //om null, ger oss tom array. inget att ladda.

    console.log(notes.length) // kollar hur många notes som finns.
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem("notes")) : []; //returnerar notes för att passera in i renderNotes();
}
// loadNotes()

const renderNotes = notes => {
    for (let i = 0; i < notes.length; i++) {
        list.innerHTML += `<li> ${dateFns.format(notes[i].id, 'dddd Do MMMM YYYY')} ${notes[i].text}</li>` //tar alla notes och renderar på skärmen
    }
}
// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("ran")
    renderNotes(loadNotes());
    hideInfo()
});