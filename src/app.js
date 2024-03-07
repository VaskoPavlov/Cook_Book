// CODE WITH [OPENING ONE AND CLOSING EVERYTHING ELSE] functionality

// let arrClassPreview = [];
// let arrClassToggle = [];

// function checkUser() {
//     const userData = JSON.parse(localStorage.getItem('user'));

//     if(userData) {
//         document.getElementById('user').style.display = 'inline-block';
//     } else {
//         document.getElementById('guest').style.display = 'inline-block';
//     }
// }
 
// async function getRecipeList() {
//     checkUser();
//     const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
 
//     const main = document.querySelector('main');
 
//     try {
//         const response = await fetch(url);
 
//         if (response.ok == false) {
//             throw new Error(response.statusText);
//         }
 
//         const recipes = await response.json();
//         main.innerHTML = '';
//         Object.values(recipes).map(createPreview).forEach(r => main.appendChild(r));
 
//         console.log('request finished');
//     } catch (error) {
//         alert(error.message);
//     }
// }
 
// function createPreview(recipe) {
//     const result = e('article', { className: 'preview' },
//         e('div', { className: 'title' }, e('h2', {}, recipe.name)),
//         e('div', { className: 'small' }, e('img', { src: recipe.img }))
//     );
 
//     result.addEventListener('click', () => getRecipeDetails(recipe._id, result));
 
//     return result;
// }
 
// async function getRecipeDetails(id, preview) {
//     arrClassPreview.push(preview);
 
//     const url = 'http://localhost:3030/jsonstore/cookbook/details/' + id;
 
//     const response = await fetch(url);
//     const data = await response.json();
 
//     const result = e('article', { className: 'toggle' },
//         e('h2', { onClick: toggleCard }, data.name),
//         e('div', { className: 'band' },
//             e('div', { className: 'thumb' }, e('img', { src: data.img })),
//             e('div', { className: 'ingredients' },
//                 e('h3', {}, 'Ingredients:'),
//                 e('ul', {}, data.ingredients.map(i => e('li', {}, i)))
//             )
//         ),
//         e('div', { className: 'description' },
//             e('h3', {}, 'Preparation:'),
//             data.steps.map(s => e('p', {}, s))
//         )
//     );
 
//     function toggleCard() {
//         result.replaceWith(preview);
//     }
 
//     arrClassToggle.push(result)
 
//     result.replaceWith(preview);
//     arrClassPreview.forEach((el, i) => {
//         if (el.className === "preview") {
//             arrClassToggle[i].replaceWith(el);
//         }
//     })
 
//     preview.parentNode.replaceChild(result, preview);
// }
 
// window.addEventListener('load', () => {
//     getRecipeList();
// });
 
// function e(type, attributes, ...content) {
//     const result = document.createElement(type);
 
//     for (let [attr, value] of Object.entries(attributes || {})) {
//         if (attr.substring(0, 2) == 'on') {
//             result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
//         } else {
//             result[attr] = value;
//         }
//     }
 
//     content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
 
//     content.forEach(e => {
//         if (typeof e == 'string' || typeof e == 'number') {
//             const node = document.createTextNode(e);
//             result.appendChild(node);
//         } else {
//             result.appendChild(e);
//         }
//     });
 
//     return result;
// }

// Code without the functionality of [OPENING ONE AND CLOSING EVERYTHING ELSE]

window.addEventListener('load', start);

function checkUser() {
    const userData = JSON.parse(localStorage.getItem('user'));

    if(userData) {
        document.getElementById('user').style.display = 'inline-block';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
    }
}

async function start() {
    checkUser()

    const main = document.querySelector('main');

    const recipes = await getRecipes();

    main.replaceChildren(...Object.values(recipes).map(createCard));
}

function createCard({_id, name, img}) {
    const element = document.createElement('article');
    element.classList.add('preview');

    const div = document.createElement('div');
    div.classList.add('title');
    const h2 = document.createElement('h2');
    h2.textContent = `${name}`;
    div.appendChild(h2);

    const div2 = document.createElement('div');
    div2.classList.add('small');
    const imgage = document.createElement('img');
    imgage.src = `${img}`;
    div2.appendChild(imgage);

    element.appendChild(div);
    element.appendChild(div2);

    element.addEventListener('click', () => showDetails(_id, element));

    return element;

}

async function showDetails(id, element) {
    const details = await getDetails(id);

    const h2 = document.createElement('h2');
    h2.textContent = `${details.name}`;
    const div = document.createElement('div');
    div.classList.add('band');
    const div2 = document.createElement('div');
    div2.classList.add('thumb');
    const image = document.createElement('img');
    image.src = `${details.img}`;
    div2.appendChild(image);
    div.appendChild(div2);
    const div3 = document.createElement('div');
    div3.classList.add('ingredients');
    const h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:';
    const ul = document.createElement('ul');
    for (let i of details.ingredients) {
        const li = document.createElement('li');
        li.textContent = `${i}`;
        ul.appendChild(li);
    }
    div3.appendChild(h3);
    div3.appendChild(ul);
    div.appendChild(div3);
    // element.replaceChildren();
    // element.appendChild(h2);
    // element.appendChild(div);

    const div4 = document.createElement('div');
    div4.classList.add('description');
    const secondH3 = document.createElement('h3');
    secondH3.textContent = 'Preparation:';
    div4.appendChild(secondH3);
    for (let s of details.steps) {
        const p = document.createElement('p');
        p.textContent = `${s}`
        div4.appendChild(p);
    }
    // element.appendChild(div4);

    // new code to toggle card details:
    const articleContent = document.createElement('article');
    articleContent.classList.add('preview');
    articleContent.appendChild(h2);
    articleContent.appendChild(div);
    articleContent.appendChild(div4);

    articleContent.addEventListener('click', toggleCard);

    element.parentNode.replaceChild(articleContent, element);

    function toggleCard() {
        articleContent.replaceWith(element);
    }
}

async function getRecipes() {
    const url = 'http://localhost:3030/data/recipes/';

    try{
        const response = await fetch(url);
        const recipes = await response.json();
    
        return recipes;
    } catch(err) {
        alert(err.message);
        throw err;
    }
}

async function getDetails(id) {
    const url = `http://localhost:3030/data/recipes/${id}`;

    try {
        const response = await fetch(url);
        const details = await response.json();

        return details;
    } catch(err) {
        alert(err.message);
        throw err;
    }
}

// This fn CREATES ELEMENT, SETS ATTRIBUTES TO THAT ELMENET & GIVES HIM SOME CONTENT
// TO SEE => /Users/Vasil/Downloads/js-apps-workshop-master-CookBook/lesson-03/base/src
function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}