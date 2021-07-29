// 227. Basic Calculator II
// Given a string s which represents an expression, evaluate this expression and return its value. 
// The integer division should truncate toward zero.


// Solution 1: Stack

// Thoughts: 
// Looping through s, we save the previous sign (+, -, *, /), and use it when we find the next sign.
// Before we start, set sign to +
// For e.g: "10-2*2"
// 1 -> Is a number, add to current number string ("1")
// 0 -> Is a number, add to current number string ("10")
// - -> Is a sign, compute current number with previous sign (set to + at start), since prev sign is +, we turn current number string // to a number and push it into the stack ([10]), then reset sign to latest sign (-) and num string to empty string ("")
// 2 -> Is a number, add to current number string ("2")
// * -> Is a sign, since prev sign is -, turn current number string to negative number, then push it into stack ([10, -2]), then reset sign to latest sign (*) and num string to empty string ("")
// 2 -> Is a number, add to current number string ("2")
// end of string (loop one extra so that we can compute the last item of string too (because we use previous signs)) -> Is not a number, 
// prev sign is *, so pop the last element off the stack and multiply it by the current number string (after turning it into a number), then push into stack again.
// The stack now looks like [10, -4]
// We now loop through the stack and simply calculate the total of all numbers.
// Answer = 6

// Algorithm:
// Define a stack, prevSign to +, num to empty string, ans to 0.
// Loop through s (until s.length) (pointer = i)
  // If s[i] is not a number
    // If prevSign is +, push num to stack
    // If prevSign is -, push negative num to stack
    // If prevSign is *, push stack.pop times num to stack
    // If prevSign is /, push stack.pop divided by num without the decimal points
    // Update the prevSign to current sign (s[i])
    // Reset num to empty string
  // Else if s[i] is a number
    // Add s[i] to number
// Loop through stack
  // Calculate total
// Return total

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 43.5MB
  var calculate = function(s) {
    let stack = [], prevSign = '+', num = '', ans = 0;
    for (var i = 0; i <= s.length; i++) {
      if (isNaN(+s[i])) {
        if (prevSign === '+') stack.push(+num);
        else if (prevSign === '-') stack.push(-(+num))
        else if (prevSign === '*') stack.push(stack.pop() * +num);
        else if (prevSign === '/') stack.push(~~(stack.pop() / +num));
        prevSign = s[i];
        num = '';
      } else if (s[i] !== ' ') {
        num += s[i];
      }
    } 
    for (var j = 0; j < stack.length; j++) ans += stack[j];
    return ans;
  };
  
  // Four test cases to run function on
  console.log(calculate("3+2*2*3/5+10*8")) // 85
  console.log(calculate("3+2*2")) // 7
  console.log(calculate(" 3/2 ")) // 1
  console.log(calculate(" 3+5 / 2 ")) // 5