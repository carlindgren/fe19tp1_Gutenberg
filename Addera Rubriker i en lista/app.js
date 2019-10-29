const addForm = document.querySelector('.addForm')
const list = document.querySelector('.list')
let arr = [];
addForm.addEventListener('submit', (e) => {
let input = addForm.add.value.trim(); //tar bort mellanrum
let header = input.charAt(0).toUpperCase() + input.substring(1) //ändrar så att första bokstaven är stor bokstav 
    e.preventDefault();

    if(header) { //om input inte är tom kör if-satsen
    list.innerHTML += `<li> ${header}</li>` //Här ska vi addera rubriken
    }
addForm.reset()
});
//spara i locale storage

