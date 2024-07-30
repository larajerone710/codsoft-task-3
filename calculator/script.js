document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const clearButton = document.getElementById('clear');
    let currentInput = '0';
    let operator = null;
    let previousInput = '';

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clearDisplay() {
        currentInput = '0';
        operator = null;
        previousInput = '';
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && previousInput !== '') {
            const result = calculate(previousInput, inputValue, operator);
            currentInput = String(result);
            previousInput = result;
        } else {
            previousInput = inputValue;
        }

        operator = nextOperator;
        currentInput = '0';
    }

    function calculate(leftOperand, rightOperand, operator) {
        switch (operator) {
            case '+':
                return leftOperand + rightOperand;
            case '-':
                return leftOperand - rightOperand;
            case '*':
                return leftOperand * rightOperand;
            case '/':
                return leftOperand / rightOperand;
            default:
                return rightOperand;
        }
    }

    function handleNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');

            if (value >= '0' && value <= '9') {
                handleNumber(value);
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
            } else if (value === '=') {
                handleOperator(null);
                updateDisplay();
            } else if (value === 'C') {
                clearDisplay();
            } else {
                handleOperator(value);
            }
        });
    });

    clearButton.addEventListener('click', clearDisplay);
    updateDisplay();
});
