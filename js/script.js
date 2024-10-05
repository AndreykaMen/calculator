let firstOperand = "";
let dotSecond = false;
let dotFirst = false;
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

function appendNumber(number) {
  if (shouldResetDisplay) {
    shouldResetDisplay = false;
  }
  if (number === "." && display.value.includes(".")) return;
  display.value += number;
}

function setOperator(operator) {
  if (currentOperator !== null && !shouldResetDisplay) {
    calculate();
  }
  firstOperand = display.value;
  if (
    !display.value.includes(operator) &&
    display.value !== "" &&
    currentOperator === null
  ) {
    display.value += operator;
  }
  if (currentOperator !== operator) {
    currentOperator = operator;
    display.value = display.value.slice(0, -1);
    display.value += operator;
  }
  shouldResetDisplay = true;
}

function calculate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = display.value.slice(
    display.value.indexOf(currentOperator) + 1
  );
  let result = performCalculation();
  let resultPre = result.toFixed(3);

  for (
    let i = resultPre.toString().indexOf(".") + 1;
    i <= resultPre.length;
    i++
  ) {
    if (parseInt(resultPre[i]) !== 0) {
      display.value = parseFloat(result);
      break;
    } else {
      display.value = resultPre;
    }
  }
  if (result !== null) {
    firstOperand = resultPre;
    currentOperator = null;
  }
  shouldResetDisplay = true;
  dotSecond = false;
}

function performCalculation() {
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);
  if (isNaN(a) || isNaN(b)) return null;

  switch (currentOperator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return (display.value = "Error /0");
      }
      return a / b;
    default:
      return null;
  }
}

function clearDisplay() {
  display.value = "";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  shouldResetDisplay = false;
  dotSecond = false;
  dotFirst = false;
}

function appendDecimal() {
  if (shouldResetDisplay || (!dotFirst && display.value == "")) {
    display.value += "0";
    shouldResetDisplay = false;
    dotFirst = true;
  }
  if (
    !display.value.includes(".") &&
    !display.value.includes(currentOperator)
  ) {
    display.value += ".";
  }
  if (display.value.includes(currentOperator) && !dotSecond) {
    display.value += ".";
    dotSecond = true;
  }
}
