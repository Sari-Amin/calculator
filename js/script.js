let sum = (operandOne, operandTwo) => operandOne + operandTwo;
let substract = (operandOne, operandTwo) => operandOne - operandTwo;
let product = (operandOne, operandTwo) => operandOne * operandTwo;
let divide = (operandOne, operandTwo) => operandOne / operandTwo;


let operate = function(operandOne, operator, operandTwo){
    switch (operator){
        case "+":
            return sum(+operandOne, +operandTwo);
        case "-":
            return substract(+operandOne, +operandTwo);
        case "*":
            return product(+operandOne, +operandTwo);
        case "/":
            return divide(+operandOne, operandTwo);
        default:
            return "Invalid Operator";
    }
}


let operandOne = [];
let operandTwo = [];
let operator = [];
let answer;
const output = document.querySelector(".output");

const operators = "+/*-";
const numbers = "0987654321";


let evaluteExpressionAndDisplay = function(event){
    const val = event instanceof KeyboardEvent ? event.key : event.target.id;

    if(operators.includes(val)){
        // if after evaluting expression user click operator, the first operand become the last asnwer
        if(operandOne.length == 0 ) operandOne.push(...String(answer).split(""));
        operator[0] = val;

    }else if(val === "=" || val === "Enter"){
        
        // call and pass the operands and operator to  operator function and reset values
        answer = operate(operandOne.join(""), operator[0], operandTwo.join(""));
        output.textContent = answer;
        delete operator[0];
        operandOne = [];
        operandTwo = [];

    }else if(val === "Backspace"){
        if(operandOne.length == 0) operandOne.push(...String(answer).split(""));
        // check whether it's on first operand or not
        if(operator[0] === undefined){
            operandOne.splice(operandOne.length - 1, 1);
        }else{
            // delete oprator if the is no second operand
            if(operandTwo.length === 0){
                delete operator[0];
            }else{
                operandTwo.splice(operandTwo.length - 1, 1);
            }
        }
    }else if(val === "."){
        // check whether it's on first operand or not
        if(operator[0] === undefined){
            // check if the operand already has dot or not
            if(!(operandOne.includes("."))){
                operandOne.push(val);
            }
            
        }else{
            // check if the second operand already has dot or not
            if(!(operandTwo.includes("."))){
                operandTwo.push(val);
            }
        }
    }else if(val === "clear"){
        operandOne = [];
        operandTwo = [];
        operator = [];
        answer = 0;
    }else if(numbers.includes(val)){
        // if it is number, check whether it's on first operand or not
        if(operator[0] === undefined){
            operandOne.push(val);
        }else{
            operandTwo.push(val);
        }
    }

    // always display the expression until user click "="
    if("0987654321-+/*.clearBackspace".includes(val)){
        if(operator[0] === undefined){
            output.textContent = operandOne.join("");
        }else{
            output.textContent = `${operandOne.join("")} ${operator[0]} ${operandTwo.join("")}`;
        }
    }

}



const buttons = Array.from(document.getElementsByTagName("button"));

buttons.forEach(button => {
    button.addEventListener("click", 
        evaluteExpressionAndDisplay);
});


// use keyboard to enter values
window.addEventListener("keydown", 
    evaluteExpressionAndDisplay
);
