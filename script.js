const interestType = document.querySelector('#select-interest-type');
const divSelectVariable = document.querySelector('.select-container');
const selectVariable = document.querySelector('#select-variable');

const variables = document.querySelector('.variables');
const variableA = document.querySelector('.variable-1');
const variableB = document.querySelector('.variable-2');
const variableC = document.querySelector('.variable-3');
const inputvariableA = document.querySelector('#variable-a');
const inputvariableB = document.querySelector('#variable-b');
const inputvariableC = document.querySelector('#variable-c');
const inputAllVariables = Array.from(document.querySelectorAll('.variables input'));
const divResult = document.querySelector('.div-result');
const button = document.querySelector('button');
const explanation = document.querySelector('.div-result p');
const warning = document.querySelector('.warning');
let result;

function verifySelect() {
    if (selectVariable.value !== '') {
        variables.classList.remove('hidden');
        button.classList.remove('hidden');
        if (interestType.value !== '') {
            if (interestType.value === 'simple') {
                variableA.textContent = 'interest';
                variableB.textContent = 'rate of interest per period (year or month)';
                variableC.textContent = 'time (years or months, depending on the rate)';
                result = (inputvariableA.value * 100 / (inputvariableB.value * inputvariableC.value)).toFixed(2);
                if (selectVariable.value === 'interest') {
                    variableA.textContent = 'principal';
                    result = (inputvariableA.value * inputvariableB.value * inputvariableC.value / 100).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} at a rate of ${inputvariableB.value}% per annum/monthly for ${inputvariableC.value} years/months, you will earn $${result} in interest.`;
                }
                else if (selectVariable.value === 'principal') {
                    variableB.textContent = 'rate of interest per period (year or month)';
                    explanation.textContent = `If you want to earn $${inputvariableA.value} in ${inputvariableC.value} years/months, and the interest rate is ${inputvariableB.value}% per annum/monthly, you should invest $${result}.`;
                }
                else if (selectVariable.value === 'principal-fa') {
                    variableA.textContent = 'future amount';
                    result = (inputvariableA.value / (1 + (inputvariableB.value / 100 * inputvariableC.value))).toFixed(2);
                    explanation.textContent = `If you want to earn $${inputvariableA.value} in ${inputvariableC.value} years/months, and the interest rate is ${inputvariableB.value}% per annum/monthly, you should invest $${result}.`;
                }
                else if (selectVariable.value === 'rate-of-interest') {
                    variableB.textContent = 'principal';
                    explanation.textContent = `If you invest $${inputvariableB.value} and expect to earn $${inputvariableA.value} in interest after ${inputvariableC.value} years/months, you need to invest such amount at a rate of ${result}% per annum/monthly.`;
                }
                else if (selectVariable.value === 'number-of-periods') {
                    variableB.textContent = 'principal';
                    variableC.textContent = 'value of the rate of interest per period (year or month)';
                    explanation.textContent = `If you invest $${inputvariableB.value} at $${inputvariableC.value}% per annum/monthly, and expect to earn $${inputvariableA.value} in interest, you need to invest such amount for ${result} years/months.`;
                }
                else {
                    variableA.textContent = 'principal';
                    result = (Number((inputvariableA.value * inputvariableB.value * inputvariableC.value / 100)) + Number(inputvariableA.value)).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} at a rate of ${inputvariableB.value}% per annum/monthly, after ${inputvariableC.value} years/months you will have $${result}.`;
                }
            }
            else {
                variableA.textContent = 'principal';
                variableB.textContent = 'rate of interest per period (year or month)';
                variableC.textContent = 'number of periods (years or months, depending on the rate)';
                if (selectVariable.value === 'future-amount') {
                    variableA.textContent = 'principal';
                    result = (inputvariableA.value * Math.pow((1 + inputvariableB.value / 100), inputvariableC.value)).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} at a rate of ${inputvariableB.value}% per period, after ${inputvariableC.value} periods you will have $${result}.`;
                }
                else if (selectVariable.value === 'principal') {
                    variableA.textContent = 'future amount';
                    result = (inputvariableA.value / Math.pow((1 + inputvariableB.value / 100), inputvariableC.value)).toFixed(2);
                    explanation.textContent = `If you want to have $${inputvariableA.value} in your account after ${inputvariableC.value} periods, and the interest rate is ${inputvariableB.value}% per period, you should invest $${result}.`;
                }
                else if (selectVariable.value === 'interest') {
                    variableA.textContent = 'principal';
                    result = (inputvariableA.value * Math.pow((1 + inputvariableB.value / 100), inputvariableC.value) - inputvariableA.value).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} at a rate of ${inputvariableB.value}% per period for ${inputvariableC.value} periods, you will earn $${result} in interest.`;
                }
                else if (selectVariable.value === 'rate-of-interest') {
                    variableB.textContent = 'future amount';
                    result = ((Math.pow(Math.abs(inputvariableB.value / inputvariableA.value), Math.abs(1 / inputvariableC.value)) - 1) * 100).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} and expect to receive the total amount of $${inputvariableB.value} after ${inputvariableC.value} periods, you need to invest such amount at a rate of ${result}% per period.`;
                }
                else {
                    variableC.textContent = 'future amount';
                    result = (Math.log(inputvariableC.value / inputvariableA.value) / Math.log(1 + (inputvariableB.value / 100))).toFixed(2);
                    explanation.textContent = `If you invest $${inputvariableA.value} at $${inputvariableB.value}% per period, and expect to receive the total amount of $${inputvariableC.value}, you need to invest such amount for ${result} periods.`;
                }
            }
        }
        else {
            selectVariable.value = '';
            variables.classList.add('hidden');
            button.classList.add('hidden');
            divResult.classList.add('hidden');
        }
    }
    else {
        variables.classList.add('hidden');
        button.classList.add('hidden');
        divResult.classList.add('hidden');
    }
}

interestType.addEventListener('change', () => {
    divSelectVariable.classList.add('hidden');
    if (interestType.value !== '') {
        divSelectVariable.classList.remove('hidden');
        selectVariable.value = '';
    }
    if (interestType.value === 'compound') {
        warning.classList.remove('hidden');
    }
    else {
        warning.classList.add('hidden');
    }
    verifySelect();
});

selectVariable.addEventListener('change', () => {
    variables.classList.add('hidden');
    divResult.classList.add('hidden');
    verifySelect();
});

inputAllVariables.forEach(variable => {
    variable.addEventListener('change', () => {
        if (variable.value <= 0) {
            variable.value = '';
        }
    });
});

button.addEventListener('click', () => {
    if (inputAllVariables.some(variable => variable.value === '')) {
        return;
    }
    if ((selectVariable.value !== '' && interestType.value !== '')) {
        divResult.classList.remove('hidden');
        verifySelect();
        inputAllVariables.forEach(variable => {
            variable.value = '';
        });
    }
});