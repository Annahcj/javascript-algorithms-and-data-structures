// 415. Add Strings
// Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.
// You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.


// Solution 1: Elementary Math 

// Approach: Add the numbers just as you would on paper, add each digit from back to front, keeping carry if needed.

// Set pointers i and j to be num1.length - 1 and num2.length - 1.
// Loop while either i or j is bigger than or equal to zero
  // Turn num1[i] and num2[j] into numbers and add them together the carry.
  // Store carry is necessary
  // Push val % 10 into ans.
  // Decrement i and j.
// Check if carry is still bigger than zero, if it is, push carry into ans.
// Return ans after reversing and joining into string.


// Time Complexity: O(max(n1.length, n2.length)) 80ms
// Space Complexity: O(max(n1.length, n2.length)) 41.7MB 

var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1;
    let carry = 0, ans = [];
    while (i >= 0 || j >= 0) {
      let n1 = num1[i] ? +num1[i] : 0;
      let n2 = num2[j] ? +num2[j] : 0;
      let val = n1 + n2 + carry;
      carry = val > 9 ? 1 : 0;
      ans.push(val % 10);
      i--, j--;
    }
    if (carry > 0) ans.push(carry);
    return ans.reverse().join("");
  };
  
  // Three test cases to run function on
  console.log(addStrings("11", "123")) // "134"
  console.log(addStrings("456", "77")) // "533"
  console.log(addStrings("0", "0")) // "0"