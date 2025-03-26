const display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
        operator = op;
        shouldResetDisplay = true;
    } else if (!shouldResetDisplay) {
        calculate();
        operator = op;
        shouldResetDisplay = true;
    }
    updateDisplay();
}

function calculate() {
    if (firstOperand === null || operator === null) return;

    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
            break;
    }

    currentInput = result.toString();
    firstOperand = result === 'Error' ? null : result;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}


updateDisplay();


document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') appendNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clearDisplay();
});