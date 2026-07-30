export class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

// Simple CLI demo
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.log("Usage: npm run calc -- <num1> <operator> <num2>");
    console.log("Operators: +, -, *, /");
    process.exit(1);
  }

  const num1 = parseFloat(args[0]);
  const operator = args[1];
  const num2 = parseFloat(args[2]);

  if (isNaN(num1) || isNaN(num2)) {
    console.error("Error: Please provide valid numbers.");
    process.exit(1);
  }

  try {
    let result: number;
    switch (operator) {
      case '+':
        result = Calculator.add(num1, num2);
        break;
      case '-':
        result = Calculator.subtract(num1, num2);
        break;
      case '*':
        result = Calculator.multiply(num1, num2);
        break;
      case '/':
        result = Calculator.divide(num1, num2);
        break;
      default:
        throw new Error("Invalid operator. Use +, -, *, or /");
    }
    console.log(`${num1} ${operator} ${num2} = ${result}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}
