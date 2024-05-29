const display = document.getElementById("display");
let currentInput = "";

function append(value) {
  currentInput += value;
  display.value = currentInput;
}

function clearDisplay() {
  display.value = "";
  currentInput = "";
}

function backspace() {
  display.value = display.value.toString().slice(0, -1);
  currentInput = display.value;
}

function percentage() {
  try {
    let result = calculateAmount(display.value);
    let percentageResult = result * 0.01;
    display.value = percentageResult;
  } catch (error) {
    display.value = "Error";
  }
}

function evaluateAmount() {
  try {
    let result = calculateAmount(currentInput);
    display.value = result;
    currentInput = result.toString();
    currentInput = "";
  } catch (error) {
    display.value = "error";
    currentInput = "";
  }
}

function calculateAmount(pharse) {
  let regEx = pharse.match(/[+\-*/%]|\d+(\.\d+)?/g);

  if (!regEx || regEx.length % 2 == 0) {
    throw new Error("Error");
  }

  let result = parseFloat(regEx[0]);

  for (let i = 1; i < regEx.length; i += 2) {
    let operator = regEx[i];
    let operand = parseFloat(regEx[i + 1]);

    if (
      isNaN(operand) ||
      (operator !== "+" &&
        operator !== "-" &&
        operator !== "*" &&
        operator !== "/")
    ) {
      throw new Error("Error");
    }

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "%":
        result = result * (operand / 100);
        break;
      case "/":
        if (operand != 0) {
          result /= operand;
        } else {
          throw new Error("Division by: 0");
        }
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}
