const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('history-list');

let currentInput = "";

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function evaluateExpression() {
  try {
    const expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    const result = eval(expression);
    addToHistory(currentInput + " = " + result);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    display.textContent = "Error";
    currentInput = "";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === "=") {
      evaluateExpression();
    } else if (value === "C") {
      currentInput = "";
      updateDisplay();
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else {
      currentInput += value;
      updateDisplay();
    }
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[0-9+\-*/.^%]/.test(key)) {
    currentInput += key;
    updateDisplay();
  } else if (key === "Enter") {
    e.preventDefault();
    evaluateExpression();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (key.toLowerCase() === "c") {
    currentInput = "";
    updateDisplay();
  }
});
