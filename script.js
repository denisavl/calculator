const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const multiplyOp = document.querySelector('.multiply');
const divideOp = document.querySelector('.divide');
const equal = document.querySelector('.equal');
const calcul = document.querySelector('.calcul');
const solution = document.querySelector('.solution');
const numbers = document.querySelectorAll('.number');
const powerOp = document.querySelector('.power');
const cleanBtn = document.querySelector('.clean');
const dot = document.querySelector('.dot');
const plusMinus = document.querySelector('.sign');
const backSpace = document.querySelector('.back');

let var1 = '';
let var2='';
let operation = '';
let aux = '';
let equalClicked = false;
let secondNumberStarted = false;
numbers.forEach(button => {
    button.addEventListener('click', (event) => {
      const option = event.target.innerHTML;
      
      if(solution.innerHTML == '0' || operation !== '' && !secondNumberStarted){
        solution.innerHTML = '';
      }
      if(operation !== '' && !secondNumberStarted){
        secondNumberStarted = true; 
      }
      if (solution.innerHTML.length < 12) { 
        switch (option) {
          case '0':
            solution.innerHTML += "0";
            break;
          case '1':
            solution.innerHTML += "1";
            break;
          case '2':
            solution.innerHTML += "2";
            break;
          case '3':
            solution.innerHTML += "3";
            break;
          case '4':
            solution.innerHTML += "4";
            break;
          case '5':
            solution.innerHTML += "5";
            break;
          case '6':
            solution.innerHTML += "6";
            break;
          case '7':
            solution.innerHTML += "7";
            break;
          case '8':
            solution.innerHTML += "8";
            break;
          case '9':
            solution.innerHTML += "9";
            break;
          default:
            console.log('Invalid option:', option);
        }
      }
        aux = solution.innerHTML;
    });
  });

  plus.addEventListener('click',()=>{
    calculate();
    if(operation !== ''){
      operatorClicked('+');
      
    } else{
      operation = '+';
      calcul.innerHTML += var1 + operation;
      if(equalClicked){
        var1 = solution.innerHTML;
        calcul.innerHTML = solution.innerHTML + operation;
        equalClicked = false;
      }
    }
  });

  minus.addEventListener('click',()=>{
    calculate();
    if(operation !== ''){
      operatorClicked('-');
    } else{
      operation = '-';
      calcul.innerHTML += var1 + operation;
      if(equalClicked){
        var1 = solution.innerHTML;
        calcul.innerHTML = solution.innerHTML + operation;
        equalClicked = false;
      }
    }
  })
  multiplyOp.addEventListener('click',()=>{
    calculate();
    if(operation !== ''){
      operatorClicked('×');
    } else{
      operation = '×';
      calcul.innerHTML += var1 + operation;
      if(equalClicked){
        var1 = solution.innerHTML;
        calcul.innerHTML = solution.innerHTML + operation;
        equalClicked = false;
      }
    }
    
  })
  divideOp.addEventListener('click',()=>{
    calculate();
    if(operation !== ''){
    operatorClicked('÷');
    } else{
      operation = '÷';
      calcul.innerHTML += var1 + operation;
      if(equalClicked){
        var1 = solution.innerHTML;
        calcul.innerHTML = solution.innerHTML + operation;
        equalClicked = false;
      }
    }
  })
  powerOp.addEventListener('click',()=>{
   
    if(operation !== ''){
      operatorClicked('^');
    } else{
      calculate();
      operation = '^';
      calcul.innerHTML += var1 + operation;
      if(equalClicked){
        var1 = solution.innerHTML;
        calcul.innerHTML = solution.innerHTML + operation;
        equalClicked = false;
      }
      
    }
  })
  equal.addEventListener('click',()=>{
    if (!equalClicked && secondNumberStarted) {
      calculate();
      calcul.innerHTML += var2 + '=';
      operate(operation, var1, var2);
      equalClicked = true;
      var1 = solution.innerHTML;
      var2 = '';
      operation = '';
      limitLength();
    }
  })

  function calculate(){
    if(operation !== ''){
      if (var2 === ''){
        var2 = aux;
        aux = '';
      }
      else{
        operate(operation, var1, var2);
        var1 = solution.innerHTML;
        var2 = aux;
        aux = '';
      }
    }
    else{
      var1 = aux;
      aux = '';
    }
    secondNumberStarted = false;
    if(var1 === '' && solution.innerHTML == '0'){
      var1 = '0';
      calcul.innerHTML += operation;
    }
  }

  function operatorClicked(opClick){
    calculate();
    if(opClick){
      if(operation !== ''){
        operation = opClick;
        calcul.innerHTML = var1 + operation;
      }
    }
    if(secondNumberStarted){
        solution.innerHTML = '';
    }
    limitLength();
  }
  function limitLength(){
    if (solution.innerHTML.length > 12) {
      let result = parseFloat(solution.innerHTML);
      let integerLength = result.toString().split('.')[0].length;      
      if (integerLength >= 12) {
      result = result.toExponential(4);}
      else {
        result = result.toFixed(4);
      }
      solution.innerHTML = result;
    }
    }
  
  
  dot.addEventListener('click',()=>{
    if(solution.innerHTML.includes('.')){
      return;
    }
    if(var1 == '' || var2 == ''){
      solution.innerHTML += '.';
    }
    
  })

  plusMinus.addEventListener('click',()=>{
    if(aux > 0){
      aux = -aux;
      solution.innerHTML = aux;
    }
    else if (aux<0){
      aux = -aux;
      solution.innerHTML = aux;
    }
    if(equalClicked){
      if(var1 > 0){
       var1 = -var1;
        solution.innerHTML = var1;
      }
      else if(var1<0){
        var1 = -var1;
        solution.innerHTML = var1;
      }
      
    }
  })
  
function add(var1,var2){
    return var1+var2;
}

function substract(var1,var2){
    return var1 - var2;
}

function multiply(var1,var2){
    return var1*var2;
}

function divide(var1,var2){
  return var1/var2;
}
function power(var1,var2){
    return var1**var2;
}

function operate(operator, var1, var2){
    var num1 = parseFloat(var1);
    var num2 = parseFloat(var2);
    let result;
  
    if (operator === '×') result = multiply(num1,num2);
    else if (operator === '÷')
    {
      if(num2 === 0){
        result= "Math Error";
      }
      else
      result = divide(num1,num2);
    } 
    else if(operator === '+') result= add(num1,num2);
    else if (operator === '-') result = substract(num1,num2);

    else if (operator === '^') result = power(num1,num2);

    if(solution.innerHTML.includes('.')){
      solution.innerHTML = result.toFixed(3);
    }
   
    else if(result.toString().includes('e')){
      solution.innerHTML = result.toExponential(3);
    }
    else {
      solution.innerHTML = result;
    }
  }

 cleanBtn.addEventListener('click', ()=>{
  calcul.innerHTML = '';
  solution.innerHTML = '0';
  var1 = '';
  var2 = '';
  operation = '';
  aux = '';
  secondNumberStarted = false;
  equalClicked = false;
})

backSpace.addEventListener('click',()=>{
  if(solution.innerHTML.includes('e')){
    return;
  }
  else if(var1 == '' && operation == ''){
    solution.innerHTML = solution.innerHTML.slice(0,-1);
    aux = aux.toString().slice(0,-1);
  }
  else if(var1 !== '' && var2 == '' && operation !=='' && secondNumberStarted){
    if(solution.innerHTML === var1.toString()) {
      return;
    }
    solution.innerHTML = solution.innerHTML.slice(0,-1);
    aux = aux.toString().slice(0,-1);
}
})
function preventQuickFind() {
  window.addEventListener('keydown', function (event) {
      if (event.key === '/') {
          event.preventDefault();
      }
  });
}
preventQuickFind();

function keyboard(){
  document.addEventListener('keydown', (event)=>{
    if (event.key >= 0 && event.key <= 9) {
      const buttons = document.querySelectorAll('.number');
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.innerText === event.key) {
          button.click();
          break;
        }
      }
    }
    else if(event.key ==='Backspace'){
      document.querySelector('.back').click();
    }

    else if (event.key === 'Delete' || event.key === 'c' || event.key === 'C') {
      document.querySelector('.clean').click();
    } 
    else if (event.key === '.') {
      document.querySelector('.dot').click();
    } 
    else if (event.key === '=' || event.key === 'Enter') {
      document.querySelector('.equal').click();
    }  
    else if (event.key == "+") {
       document.querySelector(".plus").click(); }
    else if (event.key == "-") {
       document.querySelector(".minus").click(); }
    else if (event.key == "*") {
       document.querySelector(".multiply").click(); }
    else if (event.key == "/") {
       document.querySelector(".divide").click(); }
    else if (event.key == "^") {
       document.querySelector(".power").click(); }
    else if (event.key == 's' || event.key == 'S'){
      document.querySelector('.sign').click();
    }
    else {
      console.log('Wrong key:', event.key);
    }
  })
}
keyboard();

