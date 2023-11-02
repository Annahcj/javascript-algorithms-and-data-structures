// 556. Next Greater Element III
// Given a positive integer n, find the smallest integer which has exactly the same digits existing in the integer n and is greater in value than n. If no such positive integer exists, return -1.


// Solution: 

// 1. find first decreasing element (first element able to be bigger when swapped): n[i - 1]
// 2. first first element bigger than n[i - 1]: n[j]
// 3. swap n[i - 1] with n[j]
// 4. reverse digits from i to end (inclusive)

// Time Complexity: O(n) 64ms
// Space Complexity: O(n) 39MB
var nextGreaterElement = function(n) {
  let max = 2147483647;
  n = n.toString().split("");
  for (var i = n.length - 1; i > 0; i--) {
    if (n[i - 1] < n[i]) {
      let j = n.length - 1;
      while (j >= 0 && n[j] <= n[i - 1]) j--; // find first element bigger than n[i - 1]
      [n[i - 1], n[j]] = [n[j], n[i - 1]]; // swap
      reverse(i, n.length - 1, n); // reverse remaining elements
      let res = +n.join("");
      if (res > max) return -1; // result doesn't fit a 32-bit integer
      return res;
    } 
  }
  return -1;

  function reverse(start, end, arr) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++, end--;
    }
  }
};

// Three test cases to run function on
console.log(nextGreaterElement(5487652)) // 551678
console.log(nextGreaterElement(12)) // 21
console.log(nextGreaterElement(21)) // -1