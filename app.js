const info = document.querySelector('.information')
const addForm = document.querySelector('.addForm')
const list = document.querySelector('.list')
const doc = document.querySelector('.document')
let notes = [];

// tar bort infotexten när localstorage.length blir 1.
let empty = () => {};
let displayInfo = () => {
    if(localStorage.length === 1){   
    info.outerHTML = '';
    displayInfo = empty
    }
}

//funktion för att rendera editorn vid submit.
const renderEditor = () => {
    doc.firstElementChild.innerHTML = `
    <textarea id="mytextarea" name="mytextarea">Skriv något</textarea>
    `
    document.localation.reload();
}


addForm.addEventListener('submit', (e) => {
    
    let input = addForm.add.value.trim(); //tar bort mellanrum
    let header = input.charAt(0).toUpperCase() + input.substring(1) //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();
    

    const note = {
        text: header,
        tid: Date.now() // bra med tanke på att vi ska visa när dokumenten skapades.
    }

    if(header) { //om input inte är tom kör if-satsen
    
    list.innerHTML += `<li> ${header}</li>` //Här ska vi addera rubriken
    notes.push(note)
}
renderEditor()
saveNotes()
displayInfo()
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
    loadNotes();
    renderNotes(notes);
    displayInfo()
});