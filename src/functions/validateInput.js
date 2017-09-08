export default function validateInput(button, editable = false) {
    let value = '';
    
    return function(e) {
        if (editable) {
            value = this.innerText;
        } else {
            value = this.value;
        }
        
        const valid = /[^a-zA-Z0-9 ]+/;
        if (value.match(valid) || value === '') {
            this.classList.add('invalid');
            button.setAttribute('disabled', 'true');
        } else {
            this.classList.remove('invalid');
            button.removeAttribute('disabled');
        }
    };
}