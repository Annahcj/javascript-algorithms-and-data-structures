// 592. Fraction Addition and Subtraction
// Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.
// The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.


// Solution: String Parsing & Math

// 1. Parse the expression to get each fraction, and whether the fraction should be added or subtracted.
// 2. Find the LCM of all the denominators.
// 3. Multiply each numerator such that the denominator is equal to the LCM.
// 4. Combine all fractions into one and simplify it one last time by dividing numerator and denominator by the GCD.

// Time Complexity: O(n) 46ms
// Space Complexity: O(n) 48.9MB
function fractionAddition(expression) {
  // parse expression to get each fraction
  if (expression[0] !== '-') {
    expression = '+' + expression;
  }
  let fractions = [], n = expression.length;
  let sign = 1, numerator = 0, denominator = 0;
  let isNumerator = true;
  for (let i = 0; i < n; i++) {
    if (expression[i] === '+' || expression[i] === '-') {
      sign = expression[i] === '+' ? 1 : -1;
      isNumerator = true;
      numerator = 0;
      denominator = 0;
    } else if (expression[i] === '/') {
      isNumerator = false;
    } else {
      if (isNumerator) {
        numerator = numerator * 10 + Number(expression[i]);
      } else {
        denominator = denominator * 10 + Number(expression[i]);
      }
    }
    
    if (expression[i + 1] === '+' || expression[i + 1] === '-' || i === n - 1) {
      fractions.push([sign, numerator, denominator]);
    }
  }
  
  // find the LCM of all denominators
  let denominatorLCM = 1;
  for (let fraction of fractions) {
    denominatorLCM = lcm(denominatorLCM, fraction[2]);
  }
  
  // combine all fractions by adjusting all fractions to the LCM denominator
  let numeratorSum = 0;
  for (let i = 0; i < fractions.length; i++) {
    let [sign, numerator, denominator] = fractions[i];
    let amountToMultiply = denominatorLCM / denominator;
    numeratorSum += (numerator * amountToMultiply * sign);
  }
  
  // simplify the fraction by finding the GCD of the numerator and denominator and dividing both by the GCD
  let fractionGCD = gcd(Math.abs(numeratorSum), Math.abs(denominatorLCM));
  return `${numeratorSum / fractionGCD}/${denominatorLCM / fractionGCD}`;
};

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Three test cases
console.log(fractionAddition("-1/2+1/2")) // "0/1"
console.log(fractionAddition("-1/2+1/2+1/3")) // "1/3"
console.log(fractionAddition("1/3-1/2")) // "-1/6"