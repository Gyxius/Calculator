const buttons = document.querySelectorAll('button');
const mainRectangle = document.querySelector('#main-rectangle');
const output =  document.querySelector('#output');
let leftNumber = 0;
let rightNumber = 0;
let operator = "";
let previousOperator = "";
let decimal = 0;


function isNumber(value) {
    /** 
     * Says wether or not a value is string value is a number.  
     * Example :
     * "1" -> true
     * "2" -> true
     * "+" -> false
     * @param {string} value - The button value as a string
     * @returns {boolean} true if the button value is a string-number "0"..."9" otherwise false
    */
    return !isNaN(value);
}

function operation(leftNumber, operator, rightNumber) {
    /** 
     * Does the actual calculation as follow: LeftNumber operator RightNumber
     * @param {string} leftNumber - The number (formatted as string) on the left side of the operator
     * @param {string} operator - The operator for the calculation + / X - % ^
     * @param {string} leftNumber - The number (formatted as string) on the right side of the operator
     * @returns {int} return the result of the calculation
     * Example :
     * "1" "+"" "2" -> 3
     * "2" "-" "3" -> -1
    */
    let result = 0;
    if (operator === "+") {
        result = leftNumber + rightNumber;
        return result;
    }
    else if (operator === "-") {
        result = leftNumber - rightNumber;
        return result;
    }
    else if (operator === "X") {
        result = leftNumber * rightNumber;
        return result;
    }
    else if (operator === "/") {
        result = leftNumber / rightNumber;
        return result;
    }
    else if (operator === "%") {
        result = leftNumber % rightNumber;
        return result;
    }
    else if (operator === "^") {
        result = leftNumber ** rightNumber;
        return result;
    }
}

mainRectangle.addEventListener("click", (event) => {
    /** 
     * Act as Main loop by listening to the buttons events, outputing values on the browser
     * and performing calculation
     * @param {event} event 
    */
    let userInput = event.target.innerText;
    let result = 0;
    if (userInput === "CLEAR") {
        // Clear the output
        leftNumber = 0;
        rightNumber = 0;
        operator = "";
        previousOperator = "CLEAR";
        output.textContent = "0";
        decimal = 0;
    }
    else if (userInput === "=") {
        // Perform the calculation
        if (operator) {
            result = operation(leftNumber, operator, rightNumber);

            output.textContent = result;
            leftNumber = result;
            rightNumber = 0;
            previousOperator = "=";
            operator = "";
            decimal = 0;
        }
    }
    else if (userInput === "DEL") {
        // Remove the last digit (only digit)
        if (previousOperator === "leftNumber") {
            output.textContent = output.textContent.slice(0, -1);
            leftNumber = Math.floor(leftNumber / 10);
            
        }
        else if (previousOperator === "rightNumber") {
            output.textContent = output.textContent.slice(0, -1);
            rightNumber = Math.floor(rightNumber / 10);
        }
    }
    else if (!operator) {
        // Manipulate the number on the left side of the operator (first number)
        // Adds an operator after filling the first number
        if (isNumber(userInput)) {
            if (previousOperator === "=") {
                leftNumber =  Number(userInput);
                output.textContent = leftNumber;
                previousOperator = "";
            }
            else {
                if (decimal) {
                    // Add decimal digit
                    leftNumber = leftNumber + Number(userInput) / 10**decimal;
                    decimal++;
                    output.textContent = leftNumber; // no increase
                    previousOperator = "leftNumber";
                }
                else {
                    // Add digit to the left side
                    leftNumber = leftNumber*10 + Number(userInput);
                    output.textContent = leftNumber;
                    previousOperator = "leftNumber";
                }


            }
        }
        else {
            if (userInput === "." && !decimal) {
                // Flag showing that the user input . on the left side so any digit after that will be a decimal digit
                decimal = 1;
                output.textContent += userInput;
            }
            else {
                // Adds an operator (+ / X % ^)
                operator = userInput;
                output.textContent += userInput;
                previousOperator = "operator";
                decimal = 0;
            }

        }
    }
    else {
        // Manipulate the number on the right side of the operator (second number)
        if (isNumber(userInput)) {
            if (decimal) {
                // Add decimal digit
                rightNumber = rightNumber + Number(userInput) / 10**decimal;
                output.textContent = rightNumber;
                decimal++;
                previousOperator = "rightNumber";
            }
            else {
                // Add digit to the right side
                rightNumber = rightNumber*10 + Number(userInput);
                output.textContent = rightNumber;
                previousOperator = "rightNumber";
            }

        }
        else if (userInput === "." && !decimal) {
            // Flag showing that the user input . on the right side so any digit after that will be a decimal digit
            decimal = 1;
            output.textContent += userInput;
        }
    }
})

