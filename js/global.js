const block = document.querySelector(".wrapper");
const addBtn = document.querySelector('.add')
const mdBox = document.querySelector('.modal_block')
const mdClose = mdBox.querySelector('.modal-close')
const addForm = document.forms.add;
const prevTag = addForm.querySelector(".preview");
const descript_cat = document.querySelector('.about_cat');
const cat_window = document.querySelector('.about_cat__window')
const dc_close = document.querySelector('.about_cat__close');
const removecard = document.querySelector('.remove');

let name = 'dimiatr';
let path = `https://cats.petiteweb.dev/api/single/${name}`;

// let pets = localStorage.getItem('band-cats');
// if (pets) {
//     try {
//     pets = JSON.parse(pets);
//     for (let pet of pets) {
//         createCard(pet, block);
//     }
//     }catch (err) {
//         pets = null;
//     }
// }
// console.log('pets', pets);