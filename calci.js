function appendCharacter(character) {
    var display = document.getElementsByName('display')[0];
    display.value += character;
}

function clearDisplay() {
    var display = document.getElementsByName('display')[0];
    display.value = '';
}

function deleteLast() {
    var display = document.getElementsByName('display')[0];
    display.value = display.value.toString().slice(0, -1);
}

function calculate() {
    var display = document.getElementsByName('display')[0];
    
    if (display.value) {
        display.value = eval(display.value);
    } else {
        display.value = 'Error';
    }
}