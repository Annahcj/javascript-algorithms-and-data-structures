// 402. Remove K Digits
// Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.


// Solution: Monotonic Increasing Stack

// Maintain a monotonic increasing stack of digits.
// It's optimal to remove larger digits in the most significant positions (as left as possible).
// If num[i] > num[i + 1], remove num[i].

// Ignore leading zeros - don't push them onto the stack.
// When digits are already in increasing order or k is still bigger than 0 after processing: Remove extra digits on the end while k is still positive. 

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) 50MB
var removeKdigits = function(num, k) {
  let n = num.length, stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && stack[stack.length - 1] > num[i] && k > 0) {
      stack.pop();
      k--;
    }
    if (!isLeadingZero(stack, num[i])) {
      stack.push(num[i]); 
    }
  }
  // If k > 0 at this point, the stack is in increasing order and we want to remove the last k characters from the stack
  if (stack.length - k <= 0) return '0';
  return stack.slice(0, stack.length - k).join("");
};

function isLeadingZero(stack, num) {
  return stack.length === 0 && num === '0';
}

// Three test cases
console.log(removeKdigits("1432219", 3)) // "1219"
console.log(removeKdigits("10200", 1)) // "200"
console.log(removeKdigits("10", 3)) // "0"