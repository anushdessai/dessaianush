const display = document.getElementById("display");
const resultDiv = document.getElementById("result");

let currentInput = "";
let operator = null;
let value1 = null;
let value2 = null;
let justCalculated = false;

function updateDisplay() {
  display.textContent = currentInput || "0";
}

document.querySelectorAll(".btn.num").forEach(btn => {
  btn.addEventListener("click", () => {
    if (justCalculated) {
      currentInput = "";
      operator = null;
      value1 = null;
      value2 = null;
      resultDiv.textContent = "";
      justCalculated = false;
    }
    if (currentInput.length < 12) {
      currentInput += btn.dataset.num;
      updateDisplay();
    }
  });
});

document.querySelector(".btn.dot").addEventListener("click", () => {
  if (justCalculated) {
    currentInput = "0.";
    operator = null;
    value1 = null;
    value2 = null;
    resultDiv.textContent = "";
    justCalculated = false;
    updateDisplay();
    return;
  }
  if (!currentInput.includes(".")) {
    if (currentInput === "") currentInput = "0.";
    else currentInput += ".";
    updateDisplay();
  }
});

document.querySelectorAll(".btn.operator").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentInput === "" && value1 === null) return;

    if (value1 === null) {
      value1 = parseFloat(currentInput);
    } else if (currentInput !== "") {
      value2 = parseFloat(currentInput);
      value1 = performCalculation(value1, value2, operator);
      resultDiv.textContent = `Intermediate Result: ${value1}`;
    }

    operator = btn.dataset.op;
    currentInput = "";
    updateDisplay();
  });
});

document.querySelector(".btn.calculate").addEventListener("click", () => {
  if (operator === null) {
    resultDiv.textContent = "Select an operator first!";
    return;
  }
  if (currentInput === "") {
    resultDiv.textContent = "Enter second number!";
    return;
  }

  value2 = parseFloat(currentInput);

  if ((operator === "/=" || operator === "%=") && value2 === 0) {
    resultDiv.textContent = "Error: Division or Modulo by zero!";
    return;
  }

  let result = performCalculation(value1, value2, operator);

  resultDiv.textContent = `Result: ${result}`;
  display.textContent = result.toString();

  value1 = null;
  value2 = null;
  operator = null;
  currentInput = result.toString();
  justCalculated = true;
});

document.querySelector(".btn.clear").addEventListener("click", () => {
  currentInput = "";
  operator = null;
  value1 = null;
  value2 = null;
  justCalculated = false;
  resultDiv.textContent = "";
  updateDisplay();
});

function performCalculation(a, b, op) {
  switch(op) {
    case "=":  return b;
    case "+=": return a + b;
    case "-=": return a - b;
    case "*=": return a * b;
    case "/=": return a / b;
    case "%=": return a % b;
    default:   return b;
  }
}

updateDisplay();
