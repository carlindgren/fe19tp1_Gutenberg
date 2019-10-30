const addForm = document.querySelector('.addForm')
const list = document.querySelector('.list')
let notes = [];
addForm.addEventListener('submit', (e) => {

    let input = addForm.add.value.trim(); //tar bort mellanrum
    let header = input.charAt(0).toUpperCase() + input.substring(1) //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();

    const note = {
        text: header,
        id: Date.now() // bra med tanke på att vi ska visa när dokumenten skapades.
    }

    if(header) { //om input inte är tom kör if-satsen
    list.innerHTML += `<li> ${header}</li>` //Här ska vi addera rubriken
    notes.push(note)
}
saveNotes()
addForm.reset()
});

//spara i locale storage
const saveNotes = () => {
        localStorage.setItem("notes", JSON.stringify(notes));
    
}  
console.log(localStorage)