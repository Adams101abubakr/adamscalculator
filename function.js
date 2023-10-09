function isOperator(char) {
    return char == '+' || char == '-' || char == '*' || char == '/'
}

function precedence(char) {
    let returnValue = 0;
    switch(char) {
        case '+' :
            returnValue = 1;
            break;
        case '-' :
            returnValue = 1;
            break;
        case '*' :
            returnValue = 2;
        break;
        case '/' :
            returnValue = 2;
        break;
           
    }
    return returnValue;
}

function infixToPostfix(str) {

    let strArray = str.split("")
    let postfixArray = []
    let operatorArray = []
    let temp_num = ''

    for(let i=0; i<strArray.length; i++) {

        let curr = strArray[i]

        if(isOperator(curr)) {

            postfixArray.push(parseFloat(temp_num))
            temp_num = ''
           
            if(operatorArray.length == 0 || precedence(curr) > precedence(operatorArray[operatorArray.length-1])) {
                operatorArray.push(curr)
            } else {
                while(precedence(curr) <= precedence(operatorArray[operatorArray.length-1])) {
               
                    const popped = operatorArray.pop()
                    postfixArray.push(popped)

                }
                operatorArray.push(curr)
            }  
        } else {
            temp_num += curr;
        }

    }

    postfixArray.push(parseFloat(temp_num))
    while(operatorArray.length != 0) {
        postfixArray.push(operatorArray.pop())
    }

    return postfixArray

}

function sum(num1, num2, op) {
    switch(op) {
        case '+':
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case '*':
            return num1 * num2;
            break;
        case '/':
            return num1 / num2;
            break;
    }
}

function bodmas(postfixArray) {
   
    // console.log(postfixArray)
    // author : Shreyansh

    for(let i=0; i<postfixArray.length; i++) {

        const curr = postfixArray[i]

        if(isOperator(curr)) {
            const result =  sum(postfixArray[i-2],
                                postfixArray[i-1],
                                curr)

            postfixArray[i] = result
            postfixArray.splice(i-2, 2)
            break;
        }

    }

    if(postfixArray.length != 1) {
        return bodmas(postfixArray)
    } else {
        return postfixArray[0]
    }
   
}

function strToInfix(str) {

    const strArray = str.split("")
    let temp_num = ''
    let infixArray = []

    for(let i=0; i<strArray.length; i++) {

        const curr = str[i]

        if(isOperator(curr)) {

            infixArray.push(parseFloat(temp_num))
            temp_num = ''

            infixArray.push(curr)

        } else {
            temp_num += curr
        }

    }

    infixArray.push(parseFloat(temp_num))

    return infixArray

}

function notBodmas(infixArray) {

    //console.log(infixArray)

    for(let i=0; i<infixArray.length; i++) {

        const curr = infixArray[i]

        if(isOperator(curr)) {

            const result =  sum(infixArray[i-1],
                                infixArray[i+1],
                                curr)

            infixArray[i] = result
            infixArray.splice(i-1, 1)
            infixArray.splice(i, 1)
            break;

        }

        }

   
    if(infixArray.length != 1) {
        return notBodmas(infixArray)
    } else {
        return infixArray[0]
    }

}

// console.log(notBodmas((strToInfix("2-3+15/7*3")))) //6

// console.log(strToInfix("2-3+15/7*3"))

// console.log(bodmas(infixToPostfix("5+3*8")))          // 29
// console.log(bodmas(infixToPostfix("42-22/11")))       // 40
// console.log(bodmas(infixToPostfix("12*5/6")))         // 10
// console.log(bodmas(infixToPostfix("11-11+5")))        // 5
// console.log(bodmas(infixToPostfix("12*5+12/12*5")))   // 65

let input;
let bodmas_enabled = false;

function switchMode() {
    bodmas_enabled = !bodmas_enabled
    let switchBtn = document.getElementById('toggle_btn')

    if(bodmas_enabled) {
        switchBtn.innerText = "BODMAS Enabled"
        switchBtn.style.color = 'rgba(255,255,255,0.65)'
    } else {
        switchBtn.innerText = "BODMAS Disabled"
        switchBtn.style.color = 'rgba(255,255,255,0.4)'
    }
}

function addVal(digit) {
    input.value += digit
}

function displaySum() {
    if(bodmas_enabled) {
        input.value = bodmas(infixToPostfix(input.value))
    } else {
        input.value = notBodmas(strToInfix(input.value))
    }
}

function clearInput() {
    input.value = ""
}

function backspace() {
    let inputArr = input.value.split("")
    inputArr.pop()
    let temp = ""
    inputArr.map(e => {
        temp += e
    })
   
    input.value = temp
}

window.onload = () => {
    input = document.getElementById('input')
}