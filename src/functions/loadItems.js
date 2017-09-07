export default function loadItems(button) {
    return function(data) {
        const toDoList = JSON.parse(window.localStorage.getItem('toDos')) || [];
        
        if (Array.isArray(data)) {
            data.map(function(item) {
                return item.description;
            }).forEach(function(item, i) {
                toDoList[i] = item;
            });
        }
        
        for (let i = 0;i < toDoList.length;i++) {
            button.onclick(undefined, toDoList[i]);
        }
    };
}
