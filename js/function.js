function createCard(pet, tag) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement('div');
    cardImg.className = 'pic';
    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add('tmp');
    }
    const cardTitle = document.createElement('h2');
    cardTitle.innerText = pet.name;

    const cardLike = document.createElement('i');
    cardLike.className = 'like fa-heart';
    cardLike.classList.add(pet.favorite ? 'fa-solid' : 'fa-regular')
    cardLike.addEventListener('click', e => {
        setLike(cardLike, pet.id, !pet.favorite);
    })

    const cardBtn = document.createElement('button');
    cardBtn.className = 'descript';
    cardBtn.innerText = 'подробнее';
    cardBtn.dataset.id = pet.id;
   
    const cardRemove = document.createElement('button');
    cardRemove.className = 'remove';
    cardRemove.innerText = 'удалить';
    cardRemove.dataset.id = pet.id;
    cardRemove.addEventListener('click', e => {
        card.remove();
    });

    card.append(cardImg, cardTitle, cardLike, cardBtn,cardRemove);
    tag.append(card);
}

function setLike(el, id, like) { 
   el.classList.toggle('fa-solid');
   el.classList.toggle('fa-regular');

   fetch(path + '/update/' + id, {
    method: 'put',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({favorite: like})
})

   .then(res => res.json())
   .then(data => {
    console.log(data);
    pets = pets.map(p => {
        if (p.id === id ) {
            p.favorite = like;
        }
        return p; 
    })
    localStorage.setItem('band-cats',JSON.stringify(pets));
   })
}

// function createAbout(info, tag) {
//     const window = document.createElement('div');
//     window.className = 'about_cat__window';

// }


function loadDataForCard(cat_id, api) {
    const cat = document.getElementById(cat_id);
    const img = cat_window.querySelector('.about_cat__image');
    const name = cat_window.querySelector('.about_cat__name');
    const rate = cat_window.querySelector('.about_cat__rate');
    const age = cat_window.querySelector('.about_cat__age');
    const desc = cat_window.querySelector('.about_cat__descript');

    fetch(api) 
    .then(res => res.json())
    .then(data => {
      img.src = data.image;
      name.textContent = data.name;
      rate.textContent = `Рейтинг: ${data.rate}`;
      age.textContent = `Возраст котика: ${data.age} года`;
      desc.textContent = `Немного о коте: ${data.description}`;
    });
}
