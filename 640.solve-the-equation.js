// 640. Solve the Equation
// Solve a given equation and return the value of 'x' in the form of a string "x=#value". The equation contains only '+', '-' operation, the variable 'x' and its coefficient. You should return "No solution" if there is no solution for the equation, or "Infinite solutions" if there are infinite solutions for the equation.
// If there is exactly one solution for the equation, we ensure that the value of 'x' is an integer.


// Solution: 

// Move all x's to the left side and integers to the right side.
// Final value of x is total value / total x.

// totalX = the total count of x's after moving them all to the left side of the equation.
// totalVal = the total sum of integers after moving them to the right side of the equation.

// Edge cases:
  // Infinite solutions: totalX is 0 and totalVal is 0
  // No solution: totalX is 0 and totalVal is not 0

// n = length of equation
// Time Complexity: O(n) 56ms
// Space Complexity: O(n) 41.9MB
var solveEquation = function(equation) {
  equation = equation.split("=");
  let [leftX, leftVal] = parseExpression(equation[0]);
  let [rightX, rightVal] = parseExpression(equation[1]);
  let totalX = leftX - rightX;
  let totalVal = -leftVal + rightVal;
  if (totalX < 0) totalX = -totalX, totalVal = -totalVal;
  if (totalX === 0 && totalVal === 0) return 'Infinite solutions';
  if (totalX === 0) return 'No solution';
  return `x=${totalVal / totalX}`;
};

function parseExpression(expression) {
  let n = expression.length, sign = 1, val = 0;
  let totalVal = 0, x = 0;
  for (let i = 0; i < n; i++) {
    if (expression[i] === '+' || expression[i] === '-') {
      sign = expression[i] === '+' ? 1 : -1;
    } else if (expression[i] === 'x') {
      let amountOfX = val;
      if (val === 0 && i > 0 && expression[i - 1] === '0') amountOfX = 0; // special case of 0x
      else if (val === 0 && (i === 0 || !expression[i - 1].match(/\d/))) amountOfX = 1; // case of x with no value in front -> x = 1x
      x += amountOfX * sign;
      val = 0;
    } else {
      val = val * 10 + parseInt(expression[i]);
      if (i === n - 1 || expression[i + 1] === '+' || expression[i + 1] === '-') { 
        totalVal += val * sign;
        val = 0;
      }
    }
  }
  return [x, totalVal];
}

// Five test cases
console.log(solveEquation("x+5-3+x=6+x-2")) // "x=2"
console.log(solveEquation("x=x")) // "Infinite solutions"
console.log(solveEquation("2x=x")) // "x=0"
console.log(solveEquation("x+1=x+2")) // "No solution"
console.log(solveEquation("0x=0")) // "Infinite solutions"