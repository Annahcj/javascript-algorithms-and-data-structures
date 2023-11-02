// 402. Remove K Digits
// Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.


// Solution: Monotonic Increasing Stack

// Maintain a monotonic increasing stack of digits.
// While k is bigger than 0, make the smallest possible integer by popping off larger elements as early on as possible.
// Removing larger digits earlier (on the left) is always better than later.

// Leading zeros case: The leading zeros will always override the digits in front of it, so we can treat it the same as other digits.
  // After processing all the digits, ignore the leading zeros when generating the final string num.
// When digits are already in increasing order or k is still bigger than 0 after processing: Pop off extra digits while k is still positive. 

// Time Complexity: O(n) 78ms
// Space Complexity: O(n) 43.9MB
var removeKdigits = function(num, k) {
  let stack = [], n = num.length;
  for (let i = 0; i < n; i++) {
    let val = +num[i];
    while (k > 0 && stack.length && stack[stack.length - 1] > val) {
      k--;
      stack.pop();
    }
    stack.push(val);
  }

  while (k > 0) {
    stack.pop();
    k--;
  }
  
  let res = '';
  for (let digit of stack) {
    if (!res.length && digit == 0) continue; // ignore leading zeros
    res += digit;
  }
  return res.length === 0 ? '0' : res; // the default is 0 if res is empty
};

// Three test cases to run function on
console.log(removeKdigits("1432219", 3)) // "1219"
console.log(removeKdigits("10200", 1)) // "200"
console.log(removeKdigits("10", 3)) // "0"