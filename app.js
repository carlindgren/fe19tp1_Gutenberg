const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
const themeBtn = document.querySelector('.theme')
let fav = document.querySelector('.favourite')
let notes = [];
let content;
let currentId; // bör innehålla ID:t på "aktiv" note
let currentContent;
var element = document.getElementsByClassName("ql-editor");

let activeNote = { active: Object }


const template1 = {
  "ops": [
    {
      "attributes": {
        "color": "#48b141",
        "bold": true
      },
      "insert": "Om den här mallen:"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "bold": true
      },
      "insert": "Den här mallen är utformad för att hjälpa dig att fånga idéer och inspiration när du börjar planera ett evenemang. Vi har lagt till några exempel för att du ska komma igång, men du kan ersätta dem med dina egna idéer."
    },
    {
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#48b141"
      },
      "insert": "Evenemangsinfo"
    },
    {
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Evenemangets namn:"
    },
    {
      "insert": "\nSemesterfest\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Datum:"
    },
    {
      "insert": "\nDen sista fredagen som är arbetsdag i december\n\n"
    },
    {
      "attributes": {
        "color": "#48b141"
      },
      "insert": "Teman"
    },
    {
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Idéer"
    },
    {
      "insert": "\nVinterparadis"
    },
    {
      "attributes": {
        "list": "bullet"
      },
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Inspiration"
    },
    {
      "insert": "\nKlistra in länkar från Pinterest och andra webbplatser eller använd anteckningslänkar för att länka till innehåll du har sparat med Web Clipper.\n\n"
    },
    {
      "attributes": {
        "color": "#48b141"
      },
      "insert": "Mat/Dryck"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Idéer"
    },
    {
      "insert": "\nVarm choklad"
    },
    {
      "attributes": {
        "list": "bullet"
      },
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Inspiration"
    },
    {
      "insert": "\nKlistra in länkar från Pinterest och andra webbplatser eller använd anteckningslänkar för att länka till innehåll du har sparat med Web Clipper.\n\n"
    },
    {
      "attributes": {
        "color": "#48b141"
      },
      "insert": "Aktiviteter/underhållning"
    },
    {
      "insert": "\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Idéer"
    },
    {
      "insert": "\nFotobås"
    },
    {
      "attributes": {
        "list": "bullet"
      },
      "insert": "\n"
    },
    {
      "insert": "Pepparkakshus"
    },
    {
      "attributes": {
        "list": "bullet"
      },
      "insert": "\n\n"
    },
    {
      "attributes": {
        "color": "#ffffff",
        "bold": true
      },
      "insert": "Inspiration"
    },
    {
      "insert": "\nKlistra in länkar från Pinterest och andra webbplatser eller använd anteckningslänkar för att länka till innehåll du har sparat med Web Clipper.\n"
    }
  ]
}

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
  console.log('currentid ' + currentId)
  console.log('current content ' + currentContent)
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
    if (note.deleted === false) {
      //list.innerHTML += `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text}</li>`
      list.innerHTML += renderNote(note);
    }
  })
}
//skapar en note, renderar vid onload och submit.
const renderNote = note => `<li id="${note.id}"> ${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${note.text} <span class="delete">x</span><span class="favourite"><3</span></li>`

// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (event) => {
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
    selectedNote.content = quill.getContents();
    activeNote = selectedNote // lägger in innehållet i active note i vårt nya objekt.
  }
  saveNotes()
});

list.addEventListener('click', (e) => {
  //när vi tycker på knappen ska vi leta efter e.target.class = 'delete'
  //om klassen finns ta bort från listan.
  // klickade vi på krysset?
  // annars:
  let selectedNote = notes.find(note => note.id == e.target.id || note.id == e.target.parentElement.id);
  if (e.target.className === 'delete') {
    e.target.parentElement.remove();
    selectedNote.deleted = true

  } else if (e.target.className === 'favourite') {
    selectedNote.favourite = true
    e.target.parentElement.
      console.log(fav.innerHTML);

  } else

    currentId = selectedNote.id // sätter current id när man klickar på noten
  currentContent = selectedNote.content;
  console.log(selectedNote)
  quill.setContents(selectedNote.content)
  saveNotes()
  saveActiveNote();
  console.log('current id ' + currentId)
})

/* ------DIDI------- */

/* document.querySelector(".fa-search");
document.querySelector(".search-input").focus();
document.querySelector(".search-input").focus(); */



/* document.getElementById("#src").click();
 */

