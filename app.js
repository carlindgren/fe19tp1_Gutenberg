//const info = document.querySelector('.information');
const addForm = document.querySelector('.addForm');
const title = document.querySelector('.title-input')
const list = document.querySelector('.list');
const doc = document.querySelector('.document');
const editorContent = document.querySelector('#editor');
const saveBtn = document.querySelector('.save')
const themeBtn = document.querySelector('.theme')
const navbar = document.querySelector('.navbar')
const print = document.getElementById(4)
const theme = document.querySelector('#theme')
let fav = document.querySelector('.favourite')
let notes = [];
var qlEditor = document.getElementsByClassName("ql-editor");
let content;
let currentId; // bör innehålla ID:t på "aktiv" note
let currentContent;
let navbarID = 1;
let activeNoteID = { active: Object}
let firstID;

const temp1 = {
    "ops": [
        {
          "insert": "Välkommen till Quire, din anteckningsbok på nätet! "
        },
        {
          "attributes": {
            "header": 1
          },
          "insert": "\n"
        },
        {
          "insert": "\nVad roligt att du har valt Quire, ett smartare val att skriva dina anteckningar. Eftersom det är första gången du besöker Quire vill vi gå igenom några enkla steg för att underlätta ditt användande av Quire. \n\n"
        },
        {
          "attributes": {
            "height": "373",
            "width": "560"
          },
          "insert": {
            "image": "https://lh5.googleusercontent.com/ZR4LORIEmVWoE1fOJGbAHo6SKaBE2pJCfvFkELXUcIWFz9T1oAHf7684JKMeumvNJ6d1sDOmXiviJFMHiAmrgoHOMqRKIie0AmCI4y-AiV-LnJ2Qi89W6AO8GchhuIGMdWcTRxcu"
          }
        },
        {
          "insert": "\n\n"
        },
        {
          "attributes": {
            "bold": true
          },
          "insert": "Quirefunktioner "
        },
        {
          "insert": "\nSkriv anteckningar genom att välja rubrik i fältet längst upp till vänster. Ändra din rubrik direkt i dokumentet om du skulle vilja. \n\nSkriv ditt textdokument eller punktlista direkt i vald flik.\n\nQuire autosparar allt du skriver, därför kan du utan bekymmer välja Quire för att skriva tunga och/eller viktiga dokument - ingenting försvinner. \n\nTryck på stjärnan för att favoritmarkera och för att enklare kunna hitta dina viktiga anteckningar. \n\nRadera dina anteckningar genom att klicka på soptunnan.\n\nAnvänd Quires navigationsbar för att hitta alla dina favoritmarkerade anteckningar. Ångrar du en raderad anteckning? Inga problem, även dessa finns sorterade och går att hitta under navbarens soptunna. \n\nHoppas att du ska trivas här, önskar vi på Quire! \n\n"
        }
      ]
    }

    if (localStorage.length === 0){
         quill.setContents(temp1);
    }



const renderLandingPage = () => {
    //set content (temp1)
    //list.innerHTML titel: startsida
    // 
}

// tar bort infotexten när localstorage.length blir 1.
 let hideInfo = () => {
    if (localStorage.length > 0) {
        //info.remove();
        renderEditor();
    }
} 

//funktion för att rendera editorn vid submit.
 const renderEditor = () => {
    doc.classList.remove("hidden");
    //info.remove();
} 
addForm.addEventListener('submit', (e) => {
    //hideInfo();
    let input = addForm.add.value.trim(); //tar bort mellanrum
    let text = input.charAt(0).toUpperCase() + input.substring(1); //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();

    const note = {
        text,
        id: Date.now(),
        content,
        favourite: false,
        deleted: false 
    }

    document.querySelector('.title-input').value = note.text;
    if (text) { //om input inte är tom kör if-satsen
        //list.innerHTML += `<li id="${note.id}">${dateFns.format(note.id, 'dddd Do MMMM YYYY')} ${text}</li>` 
        list.innerHTML += renderNote(note);
        notes.push(note)
        //renderEditor()
    }

    currentId = notes[notes.length - 1].id; //sätter nuvarande id vid submit.
    list.innerHTML = ""
    renderNotes(notes)
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
        if (note.favourite && note.deleted === false)
            list.innerHTML += renderNote(note)
    })
}
const renderDeleted = notes => {
    notes.forEach(note => { 
        if (note.deleted)
            list.innerHTML += renderNote(note)
    })
}


//skapar en note, renderar vid onload och submit och klick på anteckning.
const renderNote = (note) => `<li
id="${note.id}" class="${note.id == currentId ? 'clicked' : ''}"> ${note.text} 
<span class="delete"><i class=" delete far fa-trash-alt"></i></span> 
<i class=" favourite ${note.favourite ? 'fas' : 'far'} fa-star"></i> <br> 
<span class="date"> ${dateFns.format(note.id, `D MMMM YYYY HH${':'}mm`)} </span>
</li>`


// renderNotes(notes)

window.addEventListener('DOMContentLoaded', (e) => {
    notes = loadNotes()

    let activeNoteID = loadActiveNote();
    if (activeNoteID > 0) {
        let selectedNote = notes.find(note => note.id == activeNoteID)
        document.querySelector('.title-input').value = selectedNote.text;

        currentId = activeNoteID;
        quill.setContents(selectedNote.content)
    }
    renderNotes(notes);
    console.log('ran')
    //hideInfo()
});

quill.on('text-change', () => {
    currentContent = quill.getContents()
    console.log(currentId)
    if (currentId) { //om vi har ett currentID, leta rätt på nuvarande note.
        let selectedNote = notes.find(note => note.id == currentId);
        selectedNote.content = quill.getContents();
        activeNote = selectedNote // lägger in innehållet i active note i vårt nya objekt.
    }
    saveNotes()
});

//skapa en funktion för aktiva navknappar.
const activeNavbarItem = (id) => {
    let navbarA = document.querySelectorAll('.navbar>a')
    console.log(navbarA)
    navbarA.forEach((item, index) => {
        console.log(item, id, index)
        if(index !== id - 1) {
            item.firstChild.classList.remove('navbar-clicked')
        } else {
            item.firstChild.classList.add('navbar-clicked')
        }
        
    })
    console.log(id)
    // hitta alla a taggar. 
    //loopa igenom dom med forEach.
    //om 
}
list.addEventListener('click', (e) => {
    let clickedLI = e.target.closest("li");
    let selectedNote = notes.find(note => note.id == clickedLI.id);
    currentId = selectedNote.id
    document.querySelector('.title-input').value = selectedNote.text;
    if (selectedNote.deleted === true && e.target.classList.contains('delete')) {
        notes = notes.filter(note => note.id != currentId)
        renderDeleted(notes)
        console.log(clickedLI.id)
        console.log('du har försökt radera en borttagen note.')
        //skapa variabeln firstID. tilldela currentId = firstID vid delete.
    }

    if (e.target.classList.contains('delete')) {
        clickedLI.remove();
        selectedNote.deleted = true
        qlEditor[0].innerHTML = ''; //varför fungerar inte koden
        saveNotes();
    }
    //stjärnmarkerar
    if (selectedNote.favourite === false && e.target.classList.contains('favourite')) {
        selectedNote.favourite = true
        list.innerHTML = '';
        renderNotes(notes)
        saveNotes()

    } else if (selectedNote.favourite === true && e.target.classList.contains('favourite')) {
        selectedNote.favourite = false;
        saveNotes()
    }
    if (clickedLI.id == currentId && navbarID === 1) {
        list.innerHTML = ''
        renderNotes(notes)
    } else if (clickedLI.id == currentId && navbarID === 2) {
        list.innerHTML = ''
        renderFavourite(notes)
    } else if (clickedLI.id == currentId && navbarID === 3) {
        list.innerHTML = ''
        renderDeleted(notes)
    }

    // sätter current id när man klickar på noten 
    //let {content, id: currentId} = selectedNote
    currentContent = selectedNote.content;
    quill.setContents(currentContent)

    activeNote = selectedNote
    console.log(activeNote)
    saveActiveNote()
    console.log('current id ' + currentId)
})

navbar.addEventListener('click', e => {
    switch (e.target.id) {       
        case '1':
            navbarID = 1
            list.innerHTML = ""
            activeNavbarItem(navbarID)
            renderNotes(notes)
            break;
        case '2':
            navbarID = 2
            list.innerHTML = ""
            activeNavbarItem(navbarID)
            renderFavourite(notes)
            break;
        case '5':
            navbarID = 5
            list.innerHTML = ""
            activeNavbarItem(navbarID)
            renderDeleted(notes)
            break;
            case '4':
                window.print();
            break;
            case '3':
                    let lastThree = theme.href.substr(theme.href.length - 3); // => "css"
                    if(lastThree !== 'css'){
                        e.target.classList.add('dark-icon')
                        theme.href="theme.css";
        
                        } else  {
                            e.target.classList.remove('dark-icon')
                            theme.href = ''
                        }
            break;
        //default:
    }
})

title.addEventListener('keyup', e => {
    //if currentId
    let selectedNote = notes.find(note => note.id == currentId);
    selectedNote.text = e.target.value;
    document.getElementById(currentId).childNodes[0].textContent = e.target.value;
    saveNotes()
    if (e.keyCode === 13) {
        quill.focus();
    }
})
