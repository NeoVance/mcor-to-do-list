/* global fetch */

console.log('loaded!')

import './sass/index'
import loadItems from './functions/loadItems';

const toDoList = document.querySelector('.to-do-list');
const toDoInput = document.querySelector('.input-to-do');
const button = document.querySelector('.btn-to-do');

window.onload = function windowLoad () {
    fetch('//' + window.location.hostname + ':8081', {
        method: 'GET',
    }).then(function(r) {
        return r.text().then(function(text) {
            return text ? JSON.parse(text) : [];
        });
    }).then(loadItems(button))
    .catch(loadItems(button));
}

function dropDownList () {
    console.log('dropDownList');
    const dropDownList = document.createElement('div');
    dropDownList.classList.add('drop-down-list');
    this.parentNode.appendChild(dropDownList);
}

let toDoArray = [];
function removeToDo () {
    const baseURI = '//' + window.location.hostname + ':8081/delete?description=';
    fetch(`${baseURI}${this.parentNode.children[0].innerText}`);
    
    toDoList.removeChild(this.parentNode);
    toDoArray = [];
    
    // const toDoArray = [];
    for (let i = 0;i < toDoList.children.length;i++) {
        toDoArray.push(toDoList.children[i].children[0].innerText)
    };
    window.localStorage.setItem('toDos', JSON.stringify(toDoArray))
}

function createToDoItem (item) {
    const baseURI = '//' + window.location.hostname + ':8081/update?previous=';
    // add to do...
    const toDoContainer = document.createElement('dt');
    toDoContainer.classList.add('to-do-container');
    const toDo = document.createElement('div');
    toDo.classList.add('to-do');
    toDo.innerText = item;
    toDoContainer.appendChild(toDo);
    
    const dropDown = document.createElement('div');
    dropDown.classList.add('drop-down-btn');
    dropDown.innerText = 'V';
    dropDown.onclick = dropDownList;
    toDoContainer.appendChild(dropDown);
    
    const remove = document.createElement('div');
    remove.classList.add('remove');
    remove.innerText = 'X';
    remove.onclick = removeToDo;
    toDoContainer.appendChild(remove);
    toDoList.appendChild(toDoContainer);
    
    const save = document.createElement('div');
    save.classList.add('hidden');
    save.classList.add('drop-down-btn');
    save.innerText = 'S';
    save.onclick = function(e) {
        // fetch PUT changes
        fetch(`${baseURI}${currentValue}&next=${this.parentElement.children[0].innerText}`);
        save.classList.add('hidden');
    };
    toDoContainer.appendChild(save);
    
    let currentValue = item;
    
    toDo.setAttribute('contenteditable', 'true');
    toDo.onfocus = function() {
        save.classList.remove('hidden');
        currentValue = this.innerText;
    };
    
    toDo.onblur = function() {
        setTimeout(function() {
            if (toDo.innerText === currentValue) {
                save.classList.add('hidden');
            } 
        }, 100);
    }
}

button.onclick = function addItem (e, toDoItem) {
    if (e) {
        e.preventDefault();
        
        fetch('//' + window.location.hostname + ':8081', {
            method: 'POST',
            body: new FormData(document.querySelector('form')),
        }).then(function(r) {
            return r.text().then(function(text) {
                return text ? JSON.parse(text) : {};
            });
        }).then(function(j) {
            console.log('RESPONSE', j);
        });
    }
    
    let item = toDoItem ? toDoItem : toDoInput.value;
    
    if (item === '') {
        // TODO: add error message here
        return;
    }
    
    // check to see if to do exists...
    for (let i = 0;i < toDoList.children.length;i++) {
        const listItem = toDoList.children[i].children[0];
        if (listItem.innerText === item) {
            // TODO: open pop up to notify user...
            // alert('Item already exists!');
            toDoInput.value = '';
            toDoInput.setAttribute('placeholder', 'Item already exists!');
            toDoInput.classList.add('error');
            toDoInput.style.border = '1px solid red';
            
            setTimeout(function() {
                toDoInput.setAttribute('placeholder', 'enter a to do...');
                toDoInput.classList.remove('error');
                toDoInput.style = '';
            }, 2000);
            
            return;
        }
    }
    
    createToDoItem(item);
    
    toDoArray.push(item)
    window.localStorage.setItem('toDos', JSON.stringify(toDoArray));
    
    // clear input value
    toDoInput.value = '';
}


// const objOne = { x: 2, y: 3 };
// objOne.x = 5;
// const objTwo = objOne;
// console.log(objOne === objTwo);

// const num = 5;
// switch(num) {
//     case 3:
//         console.log('num is 3')
//         // break;
//     case 2:
//         console.log('num is 2')
//         break;
//     case 5:
//         console.log('num is 5')
//         break;
//     default:
//         console.log('else...')
//         break;
// }

// const array1 = [1, 2, 3, 4, 5];
// const array2 = ['a', 'b', 'c', 'd'];
// const obj1 = { w: 1, x: 2 };
// const obj2 = { x: 1, z: 3 };

// // const array3 = array1.concat(array2);
// const array3 = [...array1, ...array2];
// const obj3 = { ...obj1, ...obj2 }
// console.log(obj3);