// 224. Basic Calculator
// Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

// Logic:
// Keep a stack for numbers and open brackets, another stack for the signs of each number in stack.
// Keep pushing numbers or open brackets into stack and signs (1 or -1) into 'signs'
// If a close bracket is found, pop and calculate the total of the numbers up to the first open bracket found.
// Then, pop out the open bracket and push in the new sub-total.

// Algorithm:
// Two stacks: signs and stack
// Variable sign (to keep track of last sign), and number (to get number run (numbers can be more than length of 1))
// Loop through s (pointer = i)
  // If s[i] is bigger than or equal to '0' (checking if it's a number)
    // Set number to +s[i] (turn s[i] into number)
    // Loop through s from i to find the entire number (if number is 150, we will first find 1, then 5, then 0)
      // Increment i
      // Multiply number by 10 and add +s[i] to it.
    // Push the number into stack
    // Push the sign into stack
  // If s[i] is a sign (+ or -)
    // Set sign to be 1 if sign is +, -1 if sign is - (this way we can simply multiply the number by 1 or -1)
    // (we will push sign into signs later)
  // If s[i] is an open bracket
    // Push '(' into stack
    // Push sign into signs
    // Reset sign to 1.
  // If s[i] is a closing bracket
    // Calculate the sum inside this parenthesis, save it in a variable tempSum
    // Loop while last item in stack is not an open bracket
      // (pop off the last item in stack and the last item in signs)
      // set tempSum to tempSum + stack.pop * signs.pop
    // (now the sum inside the parenthesis has been calculated)
    // Pop the open bracket off stack
    // Push tempSum into stack.
    // Push 1 into signs. (tempSum could be negative or positive, we push 1 into signs as a dummy placement so we don't get undefined)
// When we finish iterating through s, calculate the final answer. (all sums inside parenthesis have been calculated and all we have to do now is calculate the sum)
  // Return the sum.

// Time Complexity: O(n) (length of s) 88ms
// Space Complexity: O(n) (signs + stack) 43.7MB
  var calculate = function(s) {
    let signs = [], stack = [];
    let sign = 1, number = 0;
    for (var i = 0; i < s.length; i++) {
      if (s[i] >= '0') {
        number = +s[i];
        while (i < s.length - 1 && s[i + 1] >= '0') {
          i++;
          number = number * 10 + +s[i];
        }
        stack.push(number);
        signs.push(sign);
      } else if (s[i] === '+' || s[i] === '-') {
        sign = s[i] === '+' ? 1 : -1;
      } else if (s[i] === '(') {
        stack.push('(');
        signs.push(sign);
        sign = 1;
      } else if (s[i] === ')') {
        let tempSum = 0;
        while (stack[stack.length - 1] !== '(') {
          let temp = stack.pop();
          let tempSign = signs.pop();
          tempSum += temp * tempSign;
        }
        stack.pop();
        stack.push(tempSum * signs.pop()), signs.push(1);
      }
    }  
    let ans = 0;
    for (var j = 0; j < stack.length; j++) {
      ans += stack[j] * signs[j];
    }
    return ans;
  };
  
  // Five test cases to run function on
  console.log(calculate("20 + 10 - (-10)")) // 40
  console.log(calculate("3-(2+(9-4))")) // -4
  console.log(calculate("1 + 1")) // 2
  console.log(calculate(" 2-1 + 2 ")) // 3
  console.log(calculate("(1+(4+5+2)-3)+(6+8)")) // 23