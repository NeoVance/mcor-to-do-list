/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_loadItems__ = __webpack_require__(2);
/* global fetch */

console.log('loaded!');




const toDoList = document.querySelector('.to-do-list');
const toDoInput = document.querySelector('.input-to-do');
const button = document.querySelector('.btn-to-do');

window.onload = function windowLoad() {
    fetch('//' + window.location.hostname + ':8081', {
        method: 'GET'
    }).then(function (r) {
        return r.text().then(function (text) {
            return text ? JSON.parse(text) : [];
        });
    }).then(Object(__WEBPACK_IMPORTED_MODULE_1__functions_loadItems__["a" /* default */])(button)).catch(Object(__WEBPACK_IMPORTED_MODULE_1__functions_loadItems__["a" /* default */])(button));
};

function dropDownList() {
    console.log('dropDownList');
    const dropDownList = document.createElement('div');
    dropDownList.classList.add('drop-down-list');
    this.parentNode.appendChild(dropDownList);
}

let toDoArray = [];
function removeToDo() {
    toDoList.removeChild(this.parentNode);
    toDoArray = [];

    // const toDoArray = [];
    for (let i = 0; i < toDoList.children.length; i++) {
        toDoArray.push(toDoList.children[i].children[0].innerText);
    };
    window.localStorage.setItem('toDos', JSON.stringify(toDoArray));
}

function createToDoItem(item) {
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
}

button.onclick = function addItem(e, toDoItem) {
    if (e) {
        e.preventDefault();

        fetch('//' + window.location.hostname + ':8081', {
            method: 'POST',
            body: new FormData(document.querySelector('form'))
        }).then(function (r) {
            return r.text().then(function (text) {
                return text ? JSON.parse(text) : {};
            });
        }).then(function (j) {
            console.log('RESPONSE', j);
        });
    }

    let item = toDoItem ? toDoItem : toDoInput.value;

    if (item === '') {
        // TODO: add error message here
        return;
    }

    // check to see if to do exists...
    for (let i = 0; i < toDoList.children.length; i++) {
        const listItem = toDoList.children[i].children[0];
        if (listItem.innerText === item) {
            // TODO: open pop up to notify user...
            // alert('Item already exists!');
            toDoInput.value = '';
            toDoInput.setAttribute('placeholder', 'Item already exists!');
            toDoInput.classList.add('error');
            toDoInput.style.border = '1px solid red';

            setTimeout(function () {
                toDoInput.setAttribute('placeholder', 'enter a to do...');
                toDoInput.classList.remove('error');
                toDoInput.style = '';
            }, 2000);

            return;
        }
    }

    createToDoItem(item);

    toDoArray.push(item);
    window.localStorage.setItem('toDos', JSON.stringify(toDoArray));

    // clear input value
    toDoInput.value = '';
};

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadItems;
function loadItems(button) {
    return function (data) {
        const toDoList = JSON.parse(window.localStorage.getItem('toDos')) || [];

        if (Array.isArray(data)) {
            data.map(function (item) {
                return item.description;
            }).forEach(function (item, i) {
                toDoList[i] = item;
            });
        }

        for (let i = 0; i < toDoList.length; i++) {
            button.onclick(undefined, toDoList[i]);
        }
    };
}

/***/ })
/******/ ]);
//# sourceMappingURL=dist.js.map