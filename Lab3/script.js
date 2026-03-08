let Numbers = document.getElementById("Screen");

function appendValue(value) {
    Numbers.value += value;
}

function clearDisplay() {
    Numbers.value = "";
}

function calculate() {
    try {
        Numbers.value = eval(Numbers.value);
    } catch {
        Numbers.value = "Error";
    }
}