function simplexMethod(funcData, Limits, rightLimit) {
let n = funcData.length;
let m = rightLimit.length;
let tableau = new Array(m+1);
for (let i = 0; i <= m; i++) {
  tableau[i] = new Array(n+m+1).fill(0);
}
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    tableau[i][j] = Limits[i][j];
  }
  tableau[i][n+i] = 1;
  tableau[i][n+m] = rightLimit[i];
}
for (let j = 0; j < n; j++) {
  tableau[m][j] = funcData[j];
}

while (true) {
  let pivotColumn = -1;
  for (let j = 0; j < n+m; j++) {
    if (tableau[m][j] > 0) {
      pivotColumn = j;
      break;
    }
  }
  if (pivotColumn == -1) {
    break;
  }

  let pivotRow = -1;
  let minRatio = Infinity;
  for (let i = 0; i < m; i++) {
    if (tableau[i][pivotColumn] > 0) {
      let ratio = tableau[i][n+m] / tableau[i][pivotColumn];
      if (ratio < minRatio) {
        pivotRow = i;
        minRatio = ratio;
      }
    }
  }
  if (pivotRow == -1) {
    return null;
  }

  let pivotValue = tableau[pivotRow][pivotColumn];
  for (let j = 0; j <= n+m; j++) {
    tableau[pivotRow][j] /= pivotValue;
  }
      for (let i = 0; i <= m; i++) {
          if (i != pivotRow) {
              let factor = tableau[i][pivotColumn];
              for (let j = 0; j <= n+m; j++) {
                  tableau[i][j] -= factor * tableau[pivotRow][j];
              }
          }
      }
  }

  let solution = new Array(n).fill(0);
  for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
          if (tableau[i][j] == 1 && tableau[i][n+m] != 0) {
              solution[j] = tableau[i][n+m];
              break;
          }
      }
  }
  
  return getResult(funcData, solution)
}

let resultElement = document.getElementById("result");

function getInputValue(inputElement) {
  let inputValue = inputElement.value;
  c = stringToNumberArray(inputValue);
  return c;
}

function stringToNumberArray(str) {
  let strArray = str.split(",");
  let numArray = strArray.map(parseFloat);
  return numArray;
}

const getResult = (arr1, arr2) => {
  let result = 0;
  let point = arr2
  for (let i = 0; i < arr1.length; i++) {
    result += arr1[i] * arr2[i];
  }
  return {
    result,
    point
  }
}

let inputCount = 0;
let addInputButton = document.getElementById('add-limit');
addInputButton.addEventListener('click', function() {
  let inputContainer = document.getElementById('input-container');
  let newInput = document.createElement('input');
  inputCount++;
  newInput.setAttribute('id', 'input-' + inputCount);
  newInput.classList.add('new-input');
  newInput.oninput = function() {
    let inputValue = newInput.value;
    c = stringToNumberArray(inputValue);
    console.log(c);
    return c;
  }
  inputContainer.appendChild(newInput);
})

function dovidka() {
  alert(
    `Будь ласка, вводьте числа через кому та без зайвих символів.
Також вводьте коректні дані.
Автор: Максим Павлів.
Група: КН-32.`);
}

function start() {
  let funcData = getInputValue(document.getElementById("objective function"));
  let rightLimit = getInputValue(document.getElementById("right limit"));
  let Limits = [];

  for (let i = 1; i <= inputCount; i++){
    Limits.push(getInputValue(document.getElementById("input-" + i)));
  }

  const result = simplexMethod(funcData, Limits, rightLimit);
  result.point.length != 1 ? resultElement.innerHTML = `Результат функції: ${result.result}, у точці з координатами ${[result.point]}.` : null;
  console.log(result);
}







// const Limits = [[2, 1, 1, 1], [1, 0, 2, 0], [1, 2, 1, 0]];
// const rightLimit = [300, 70, 340];
// const funcData = [8, 3, 2, 1];
// const result = simplexMethod(funcData, Limits, rightLimit);
// resultElement.innerHTML = `Результат функції: ${result.result}, у точці з координатами ${[result.point]}.`;
// console.log(result);

// L(x) = 8x1 + 3x2 + 2x3 + x4 
// 2x1 + x2 + x3 + x4 <= 300
// x1 + 2x3 <= 70
// x1 + 2x2 + x3 <=340
