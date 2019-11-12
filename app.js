const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
let notes = [];
let content;
let currentId; // bör innehålla ID:t på "aktiv" note
let currentContent;

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

addForm.addEventListener('submit', (e) => {
    hideInfo();
    let input = addForm.add.value.trim(); //tar bort mellanrum
    let text = input.charAt(0).toUpperCase() + input.substring(1); //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();

    const note = {
        text,
        id: Date.now(), // bra med tanke på att vi ska visa när dokumenten skapades.
        content // lägga till ett nytt objekt för att spara documentet och kunna rendera.
    }


    if (text) { //om input inte är tom kör if-satsen
        //list.innerHTML += `<li id="${note.id}">${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${text}</li>` 
        list.innerHTML += renderNote(note);
        notes.push(note) 
        renderEditor()
    }
    currentId = notes[notes.length - 1].id; //sätter nuvarande id vid submit.
    console.log(note.length)
    currentContent = notes[notes.length - 1].content //sätter nuvarande content vid submit.
    console.log('currentid ' + currentId)
    console.log('current content ' + currentContent)
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
    notes.forEach(note => {
        //list.innerHTML += `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text}</li>`
        list.innerHTML += renderNote(note);
    })
}
//skapar en note, renderar vid onload och submit.
const renderNote = note => `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text}</li>`

// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('ran')
    notes = loadNotes()
    renderNotes(notes);
    hideInfo()
});

quill.on('text-change', () => {
    currentContent = quill.getContents()
    console.log(currentContent)
    if (currentId) { //om vi har ett currentID, leta rätt på nuvarande note.
        let selectedNote = notes.find(note => note.id == currentId);
        selectedNote.content = currentContent
    }
    saveNotes()
});

list.addEventListener('click', (e) => {

    // klickade vi på krysset?
    console.log(e.target)
    // annars:
    let selectedNote = notes.find(note => note.id == e.target.id);
    currentId = selectedNote.id // sätter current id när man klickar på noten
    console.log(currentContent)
    currentContent = selectedNote.content; 
    quill.setContents(selectedNote.content)
    console.log('current id ' + currentId)
})