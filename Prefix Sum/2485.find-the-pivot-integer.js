// 2485. Find the Pivot Integer
// Given a positive integer n, find the pivot integer x such that:
  // The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
// Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.


// Solution: Left & Right Sum

// Use the n * (n + 1) / 2 formula to find the sum of 1 + 2 + ... + n.
// Keep track of the sum on the left (initially 0) and right (initially the sum of all numbers up to n) of i, and update them as i moves up.

// Time Complexity: O(n) 113ms
// Space Complexity: O(1) 41.7MB
var pivotInteger = function(n) {
  let rightSum = n * (n + 1) / 2;
  let leftSum = 0;
  for (let i = 1; i <= n; i++) {
    leftSum += i;
    if (leftSum === rightSum) return i;
    rightSum -= i;
  }  
  return -1;
};

// Three test cases
console.log(pivotInteger(8)) // 6
console.log(pivotInteger(1)) // 1
console.log(pivotInteger(4)) // -1