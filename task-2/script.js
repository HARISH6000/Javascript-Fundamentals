const display = document.getElementById('display');
const resultDisplay = document.getElementById('result');
let currentInput = '';

function append(element) {
    currentInput += element;
    updateDisplay();
    calculateRealTime();
}

function calculateRealTime() {
    try {
        const expression = currentInput.replace('×', '*');
        const result = eval(expression);
        resultDisplay.textContent = isFinite(result) ? `= ${result}` : '';
    } catch (e) {
        resultDisplay.textContent = '';
    }
}

function finalizeCalculation() {
    try {
        const expression = currentInput.replace('×', '*');
        const result = eval(expression);
        if (isFinite(result)) {
            currentInput = result.toString();
            resultDisplay.textContent = '';
        }
    } catch (e) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
    resultDisplay.textContent = '';
}

function updateDisplay() {
    display.value = currentInput || '0';
}

updateDisplay();

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.' || e.key === '(' || e.key === ')' || e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') append(e.key);
    if (e.key === 'Enter' || e.key === '=') finalizeCalculation();
    if (e.key === 'Escape') clearDisplay();
});