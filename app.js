const info = document.querySelector('.information')
const addForm = document.querySelector('.addForm')
const list = document.querySelector('.list')
const doc = document.querySelector('.document')
const editorContent = document.querySelector('#editor')

let notes = [];

// tar bort infotexten när localstorage.length blir 1.
//let empty = () => { };
let hideInfo = () => {
    if (localStorage.length > 0) {
        info.remove();
       // displayInfo = empty
       renderEditor();
    }
    
}

//funktion för att rendera editorn vid submit.
const renderEditor = () => {
    doc.classList.remove("hidden")
    info.remove();
}


addForm.addEventListener('submit', (e) => {
    hideInfo()
    let content = editorContent.firstChild.innerHTML
    let input = addForm.add.value.trim(); //tar bort mellanrum
    let header = input.charAt(0).toUpperCase() + input.substring(1) //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();


    const note = {
        text: header,
        id: Date.now(), // bra med tanke på att vi ska visa när dokumenten skapades.
        editorContent: content // lägga till ett nytt objekt för att spara documentet och kunna rendera.
    }

    if (header) { //om input inte är tom kör if-satsen
        list.innerHTML += `<li id="${note.id}"> ${header}</li>` //Här ska vi addera rubriken
        notes.push(note)
        renderEditor()
        
        
    }
    
    saveNotes()
    
    addForm.reset()
});

//spara i locale storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const loadNotes = () => {
    //om null, ger oss tom array. inget att ladda.
    notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem("notes")) : [];
    console.log(notes.length) // kollar hur många notes som finns.
    return notes //returnerar notes för att passera in i renderNotes();
}
// loadNotes()

const renderNotes = (notes) => {
    for (let i = 0; i < notes.length; i++) {
        list.innerHTML += `<li> ${notes[i].text}</li>` //tar alla notes och renderar på skärmen
    }
}
// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("ran")
    loadNotes();
    renderNotes(notes);
    hideInfo()
});