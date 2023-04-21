// if (!pets) {

    fetch(path + '/show')
        .then(function (res) {
            console.log(res);
            return res.json();
        })
        .then(function (data) {
            if (data.length) {
                pets = data;
                localStorage.setItem('band-cats', JSON.stringify(data));
                for (let pet of data) {
                    createCard(pet, block);
                }
            }
        });
// }

addBtn.addEventListener('click', e => {
    mdBox.classList.toggle('active');
});

mdClose.addEventListener('click', e => {
    mdBox.classList.remove('active');
});

mdBox.addEventListener('cliclk', e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove('active');
    }
});

addForm.elements.favorite.addEventListener('change', e => {
    console.log(e.currentTarget.value);
    console.log(e.currentTarget.checked);
})

addForm.elements.image.addEventListener('change', e => {
    prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
})

addForm, addEventListener('submit', e => {
    e.stopPropagation();
    e.preventDefault();

    const body = {};
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        if (el.name) {
            if (el.name === 'favorite') {
                body[el.name] = el.checked;
            } else {
                body[el.name] = el.value;
            }
        }
    };
    //console.log(body);

    fetch(path + "/ids")
        .then(res => res.json())
        .then(ids => {
            console.log(ids);
            body.id = ids[ids.length - 1] + 1;
            console.log(body);
            return fetch(path + "/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })
        .then(res => {
            // console.log(res.status);
            if (res.status === 200) {
                addForm.reset();
                prevTag.style = null;
                mdBox.classList.remove('active');
                createCard(body, block);
                pets.push(body);
                // localStorage.setItem('band-cats', JSON.stringify(pets));
            }
        })
})


block.addEventListener('click', e => {
    if (e.target.classList.contains('descript')) {
        descript_cat.classList.toggle('activs');
        const petId = e.target.dataset.id;
        loadDataForCard(petId, path + '/show/' + petId);
    }
});

dc_close.addEventListener('click', e => {
    descript_cat.classList.remove('activs');
});

block.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        const petId = e.target.dataset.id;
        console.log(petId);
        fetch(`${path}/delete/${petId}`, {
            method: 'DELETE' 
        })
        .then(res => {
            if (res.status === 200) {
                e.target.parentNode.remove();
                // localStorage.setItem('band-cats', JSON.stringify(pets));
            }
        })
        .catch(error => console.log(error)); 
    }
});


