const addForm = document.querySelector('.addForm')
const list = document.querySelector('.list')

addForm.addEventListener('submit', (e) => {
let header = addForm.add.value.trim();
    console.log(e)
    e.preventDefault();

    if(header) {
    list.innerHTML += `<li> ${header}</li>` //Här ska vi addera rubriken
    }
addForm.reset()
});

