const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const title = document.querySelector('.title-input')
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
const themeBtn = document.querySelector('.theme')
const navbar = document.querySelector('.navbar')
let fav = document.querySelector('.favourite')
let notes = [];
var qlEditor = document.getElementsByClassName("ql-editor");
let content;
let currentId; // bör innehålla ID:t på "aktiv" note
let currentContent;

let activeNote = { active: Object }



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

    document.querySelector('.title-input').value = note.text;
    if (text) { //om input inte är tom kör if-satsen
        //list.innerHTML += `<li id="${note.id}">${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${text}</li>` 
        list.innerHTML += renderNote(note);
        notes.push(note)
        renderEditor()
    }

    currentId = notes[notes.length - 1].id; //sätter nuvarande id vid submit.
    currentContent = notes[notes.length - 1].content //sätter nuvarande content vid submit.
    //saveActiveNote();
    saveNotes();
    qlEditor[0].innerHTML = "";
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

const renderNotes = (notes) => {
    notes.forEach(note => {
        if (note.deleted === false) {
            //list.innerHTML += `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text}</li>`
            list.innerHTML += renderNote(note);
        }
    })
}
const renderFavourite = notes => {
    notes.forEach(note => {
        if (note.favourite)
        list.innerHTML += renderNote(note)
    })
}
const renderDeleted = notes => {
    notes.forEach(note => {
        if (note.deleted)
        list.innerHTML += renderNote(note)
    })
}


//skapar en note, renderar vid onload och submit. EN SOPTUNNA :D Det borde bli bra va? :) gud ja verkligen superbra:D
const renderNote = (note) => `<li
id="${note.id}" class="${note.id == currentId ? 'clicked' : ''}"> ${note.text} 
<span class="delete"><i class=" delete far fa-trash-alt"></i></span> 
<i class=" favourite ${note.favourite ? 'fas' : 'far'} fa-star"></i> <br> 
<span class="date"> ${dateFns.format(note.id, `D MMMM YYYY HH${':'}mm`)} </span>
</li>`


// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (e) => {
    console.log('ran')
    notes = loadNotes()
    
    let activeNoteID = loadActiveNote();
    if (activeNoteID > 0) {
        let selectedNote = notes.find(note => note.id == activeNoteID)
        currentId = activeNoteID;
        quill.setContents(selectedNote.content)
    }
    renderNotes(notes);
    hideInfo()
});

quill.on('text-change', () => {
    currentContent = quill.getContents()
    console.log(currentId)
    if (currentId) { //om vi har ett currentID, leta rätt på nuvarande note.
        let selectedNote = notes.find(note => note.id == currentId);
        //selectedNote.content = currentContent
        selectedNote.content = quill.getContents();
        activeNote = selectedNote // lägger in innehållet i active note i vårt nya objekt.
    }
    saveNotes()
});

list.addEventListener('click', (e) => {
    let clickedLI = e.target.closest("li");
    let selectedNote = notes.find(note => note.id == clickedLI.id);
    document.querySelector('.title-input').value = selectedNote.text;
    if (e.target.classList.contains('delete')) {
        clickedLI.remove();
        selectedNote.deleted = true
        qlEditor[0].innerHTML = ""; //varför fungerar inte koden
        saveNotes();
    }
    //stjärnmarkerar
    if (selectedNote.favourite === false && e.target.classList[0] === 'favourite') {
        selectedNote.favourite = true
        list.innerHTML = '';
        e.target.classList.add('fas')
        e.target.classList.remove('far')
        renderNotes(sortFavouriteTrue(notes, selectedNote.id))
        saveNotes()
        // document.getElementById(currentId).childNodes[2].lastChild.classList.add('fas')//.lastChild.classList.add('fas')
        //currentId stämmer med idt på listan??


    } else if (selectedNote.favourite === true && e.target.classList[0] === 'favourite') {
        selectedNote.favourite = false;
        // list.innerHTML = '';
        //  renderNotes(sortFavouriteFalse(notes))
        saveNotes()
        e.target.classList.add('far')
        e.target.classList.remove('fas')
    }

    currentId = selectedNote.id // sätter current id när man klickar på noten 
    //let {content, id: currentId} = selectedNote
    currentContent = selectedNote.content;
    quill.setContents(currentContent)

    activeNote = selectedNote
    saveActiveNote()
    console.log('current id ' + currentId)
})

//flyttar upp noten om vi favoritmarkerar.
const sortFavouriteTrue = (notes, noteID) => {
    notes.forEach((note, index) => {
        if (note.favourite && noteID == note.id) {
            notes.unshift(note)
            notes.splice(index + 1, 1)
            console.log(notes)
        }
    })
    return notes
}
navbar.addEventListener('click', e => {

    switch(e.target.id) {
          case '1':
          list.innerHTML =""
          renderNotes(notes)
          break;
          case '2':
            list.innerHTML =""
            renderFavourite(notes)
          break;
        case '3':
            list.innerHTML =""
            renderDeleted(notes)
          break;
        default:
          // code block
      }
})

title.addEventListener('keyup', e => {
//if currentId
let selectedNote = notes.find(note => note.id == currentId);
selectedNote.text = e.target.value;
document.getElementById(currentId).childNodes[0].textContent = e.target.value;
saveNotes()
if(e.keyCode === 13) {
    quill.focus();
}
})
// document.addEventListener('wheel', e => {
//     console.log(e.pageX, e.pageY);
// });

//flytta ned favoritmarkerade notes i listan.
/* const sortFavouriteFalse = (notes, noteID) => {
    notes.forEach((note, index) => {
        if (note.favourite && noteID == note.id) {
            notes.push(note)
            notes.splice(index, 1)
            console.log(notes)
        }
    })
    return notes
} */

/* themeBtn.addEventListener('click', (e) => {
    quill.setContents(template1);
}) */