const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
const themeBtn = document.querySelector('.theme')
let fav = document.querySelector('.favourite')
let notes = [];
var element = document.getElementsByClassName("ql-editor");
let content;
let currentId; // bör innehålla ID:t på "aktiv" note
let currentContent;
  //tömmer editor.

let activeNote =  {active: Object}

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
        content, // lägga till ett nytt objekt för att spara documentet och kunna rendera.
        favourite: false, //detta är kvar att göra
        deleted: false //kvar att göra
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
    //saveActiveNote();
    saveNotes();
    element[0].innerHTML = ""; 
    addForm.reset()
});

//spara i local storage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
}
const saveActiveNote = () => {
    localStorage.setItem('activeNote', JSON.stringify(activeNote.id))//activeNote    
}
const loadActiveNote = () => {
    return localStorage.getItem('activeNote') ? JSON.parse(localStorage.getItem('activeNote')) : 0;

}   
const loadNotes = () => {
    //om null, ger oss tom array. inget att ladda.

    console.log(notes.length) // kollar hur många notes som finns.
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem("notes")) : []; //returnerar notes för att passera in i renderNotes();
}
// loadNotes()

const renderNotes = notes => {
    notes.forEach(note => {
        if(note.deleted === false){     
        //list.innerHTML += `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text}</li>`
        list.innerHTML += renderNote(note);
      }
   })
}
//skapar en note, renderar vid onload och submit.
const renderNote = note => `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text} <span class="delete">X</span><span><i class="favourite far fa-star"></i></span></li>`

// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (e) => {
    console.log('ran')
    notes = loadNotes()
    renderNotes(notes);
    let activeNoteID = loadActiveNote();
    if (activeNoteID > 0) {
    let selectedNote = notes.find(note => note.id == activeNoteID)
    currentId = activeNoteID;
    quill.setContents(selectedNote.content)
    }
    hideInfo()
});

quill.on('text-change', () => {
    currentContent = quill.getContents()
    console.log(currentContent)
    if (currentId) { //om vi har ett currentID, leta rätt på nuvarande note.
        let selectedNote = notes.find(note => note.id == currentId);
        //selectedNote.content = currentContent
        selectedNote.content = quill.getContents();
        activeNote = selectedNote // lägger in innehållet i active note i vårt nya objekt.
    }
    saveNotes()
});

list.addEventListener('click', (e) => {

    let selectedNote = notes.find(note => note.id == e.target.id || note.id == e.target.parentElement.id || note.id == e.target.parentElement.parentElement.id);
    if (e.target.className === 'delete'){
        e.target.parentElement.remove();
        selectedNote.deleted = true
        console.log(e)
    } 
    if (selectedNote.favourite === false && e.target.classList[0] === 'favourite'){
        selectedNote.favourite = true 
        e.target.classList.add('fas')
    } else if (selectedNote.favourite === true && e.target.classList[0] === 'favourite') {
        selectedNote.favourite = false;
        e.target.classList.remove('fas')
    }
    //selectedNote.favourite = true när man klickar på stjärnan
    //om selectedNote.favourite === true, rendera ifylld stjärna
    //annas rendera tom stjärna
    //vid onload måste stjärnan vara ifylld om den en gång blivit det.
    currentId = selectedNote.id // sätter current id när man klickar på noten 
    currentContent = selectedNote.content; 
    quill.setContents(selectedNote.content)
    console.log('current id ' + currentId)
 
    activeNote = selectedNote
    saveActiveNote()
    console.log('current id ' + currentId)
})
themeBtn.addEventListener('click', (e) => {
  quill.setContents(template1);
})
