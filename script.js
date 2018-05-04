
let display = document.getElementById('display');

let nine = document.getElementById('nine');
let eight = document.getElementById('eight');
let seven = document.getElementById('seven');
let six = document.getElementById('six');
let five = document.getElementById('five');
let four = document.getElementById('four');
let three = document.getElementById('three');
let two = document.getElementById('two');
let one = document.getElementById('one');
let zero = document.getElementById('zero');
let point = document.getElementById('point');
let divide = document.getElementById('divide');
let multiply = document.getElementById('multiply');
let add = document.getElementById('add');
let subtract = document.getElementById('subtract');
let bPara = document.getElementById('bPara');
let ePara = document.getElementById('ePara');

let back = document.getElementById('back');
let clear = document.getElementById('clear');
let equal = document.getElementById('equal');

let sqrt = document.getElementById('sqrt');
let exp = document.getElementById('exp');
let pi = document.getElementById('pi');
let rndm = document.getElementById('rndm');
let factorial = document.getElementById('factorial');


function input() {
  display.value += this.value;
}
nine.onclick = input;
eight.onclick = input;
seven.onclick = input
six.onclick = input;
five.onclick = input;
four.onclick = input;
three.onclick = input;
two.onclick = input;
one.onclick = input;
zero.onclick = input;
point.onclick = input;
divide.onclick = input;
multiply.onclick = input;
add.onclick = input;
subtract.onclick = input;
bPara.onclick = input;
ePara.onclick = input;
sqrt.onclick = input;
exp.onclick = input;
pi.onclick = input;
factorial.onclick = input;


function rndmFnctn() {
  display.value += Math.floor(Math.random()*(Math.pow(10,16)));
}
rndm.onclick = rndmFnctn;


function backspace() {
  var x = display.value;
  display.value = x.substring(0, x.length-1);
}
back.onclick = backspace;

function clearInput() {
  display.value = '';
}
clear.onclick = clearInput;


equal.addEventListener('click', function() {
  display.value = solve(display.value);
});


// for finding keycodes
/*
document.addEventListener("keydown", function(event) {
  console.log(event.which);
});
*/

document.addEventListener('keypress', function(e) { // here because phone enter
  if (e.keyCode === 13) {                           // was being uncooperative
    display.value = solve(display.value);
  }
});

document.addEventListener('keydown', function(e) {
  display.focus();
  if (e.keyCode === 13) {
    display.style.backgroundColor = 'white';
    display.style.color = 'black';
  }
  else if (e.ctrlKey === true && e.keyCode === 88) {
    clear.focus();
  }
});

document.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    display.style.backgroundColor = 'black';
    display.style.color = 'white';
  }
  else if (e.keyCode === 88)  {
    display.value = '';
  }
});



var cache = [];
function factorialOf(num) {
  if (num == 0 || num == 1)
    return 1;
  if (cache[num] > 0)
    return cache[num];
  return cache[num] = factorialOf(num - 1) * num;
}

function solve(x) {
  let pars = x.split(/([\/\÷\*\×\+\-\−\)\(\√\^\π\?\!\e])/)
  .filter(function(y) {
    return y !== '';;
  });
  let math;
  console.log(pars);
  console.log('problem : ' + pars);
  let paren = [];
  let nest = [];
  let maxLoop = 9; // NECESSARY ; not precise ; a safeguard from infinite loops ; increase after debugging
  while (maxLoop > 0) {
    maxLoop--
    for (var i = 0; i < pars.length; i++) {

      if (pars[i] === 'e') { // e.g. 1e+27
        return pars.join('');
      }
      else if (pars[i] === '!') {
        if (!isNaN(pars[i-1])) {
          math = factorialOf(pars[i-1]);
          pars.splice(i-1, 2, math);
        }
      }
      else if (pars.includes('(') && pars.includes(')')) {
        if (pars[i] === '(') {
          while (pars[i+1] !== ')') {
            if (paren.includes('(') || paren.includes(')')) {
              return 'it has its limits';
            }
           paren.push(pars[i+1]);
           pars.splice(i+1, 1);
           continue;
          }
          if (pars[i+1] === ')') {
            pars.splice(i, 2, solve(paren.join('')));
            paren = [];
          }
        }
      }
      else if (!pars.includes('(') && !pars.includes(')') && !pars.includes('!')) {
        if (pars[i] === '^') {
          if (pars[i+1] === 'π') {
            math = Math.pow(pars[i-1], Math.PI);
            pars.splice(i-1, 3, math);
          }
          else if (pars[i+1] === '√') {
            math = Math.pow(pars[i-1], Math.sqrt(pars[i+2]));
            pars.splice(i-1, 4, math);
          }
          else {
            math = Math.pow(pars[i-1], pars[i+1]);
            pars.splice(i-1, 3, math);  
          }
        }
        else if (pars[i] === '√') {
          if (pars[i+1] === '-' || pars[i+1] === '−') {
            return 'get real';
          }
          else if (!isNaN(pars[i-1])) {
            math = pars[i-1] * Math.sqrt(pars[i+1]);
            pars.splice(i-1, 3, math);
          }
          else if (pars[i+1] === '(') {
            i = i+1;
          }
          else if (pars[i+1] === 'π') {
            math = Math.sqrt(Math.PI);
            pars.splice(i, 2, math);
          }
          else {
            math = Math.sqrt(pars[i+1]);
            pars.splice(i, 2, math);  
          }
        }
        else if (pars.includes('-') || pars.includes('−')) {
          if (pars[i] === '-' || pars[i] === '−') {
            if (pars[i+1] === 'π') {
              math = 0 - Math.PI;
              pars.splice(i, 2, math);
            }
            else if (pars[i+1] === '√') {
              math = 0 - Math.sqrt(pars[i+2]);
              pars.splice(i, 3, math);
            }
            else {
              math = 0 - pars[i+1];
              pars.splice(i, 2, math);  
            }
          }
        }
        else if (!pars.includes('^') && !pars.includes('-')) {
          if (pars[i] === '/' || pars[i] === '÷') {
            if (pars[i+1] === 'π') {
              math = pars[i-1] / Math.PI;
              pars.splice(i-1, 3, math);
            }
            else if (pars[i+1] === '√') {
              math = pars[i-1] / Math.sqrt(pars[i+2]);
              pars.splice(i-1, 4, math);
            }
            else {
              math = pars[i-1] / pars[i+1];
              pars.splice(i-1, 3, math);  
            }
          }
          else if (pars[i] === '*' || pars[i] === '×') {
            if (pars[i+1] === 'π') {
              math = pars[i-1] * Math.PI;
              pars.splice(i-1, 3, math);
            }
            else if (pars[i+1] === '√') {
              math = pars[i-1] * Math.sqrt(pars[i+2]);
              pars.splice(i-1, 4, math);
            }
            else {
              math = pars[i-1] * pars[i+1];
              pars.splice(i-1, 3, math);  
            }
          }
          else if (pars[i] === 'π') {
            pars[i] = Math.PI;
            if (!isNaN(pars[i-1])) {
              math = pars[i-1] * Math.PI;
              pars.splice(i-1, 2, math);
            }
            else if (!isNaN(pars[i+1])) {
              math = Math.PI * pars[i+1];
              pars.splice(i, 2, math);
            }
          }
          else if (!pars.includes('/') && !pars.includes('÷') && !pars.includes('*') && !pars.includes('×') && !pars.includes('π') && !pars.includes('√')) {
            if (pars[i] === '+') {
              if (pars[i+1] === 'π') {
                math = parseFloat(pars[i-1]) + Math.PI;
                pars.splice(i-1, 3, math);
              }
              else if (pars[i+1] === '√') {
                math = parseFloat(pars[i-1]) + Math.sqrt(pars[i+2]);
                pars.splice(i-1, 4, math);
              }
              else {
                math = parseFloat(pars[i-1]) + parseFloat(pars[i+1]);
                pars.splice(i-1, 3, math);  
              }
            }
            else if ( pars.length > 1) {
              if (!isNaN(pars[i]) && !isNaN(pars[i+1])) {
                math = parseFloat(pars[i]) + parseFloat(pars[i+1]);
                pars.splice(i, 2, math);
              }
            }
          }
        }
      }
    }
  }
  console.log('answer : ' + pars);
  return pars.join('');
}
