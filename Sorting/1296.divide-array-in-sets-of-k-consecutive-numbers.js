// 1296. Divide Array in Sets of K Consecutive Numbers
// Given an array of integers nums and a positive integer k, check whether it is possible to divide this array into sets of k consecutive numbers.
// Return true if it is possible. Otherwise, return false.


// Solution: Greedy w/ Sorting

// 1. Count the occurances of each number and store it in a hashmap.
// 2. Sort nums in asc order
// 3. Check whether it is possible to divide the array 
  // If the count of the current number is 0, skip the iteration.
  // Otherwise, check whether we have the k consecutive numbers starting from num.

// Time Complexity: O(n log(n)) 255ms
// Space Complexity: O(n) 63.6MB
var isPossibleDivide = function(nums, k) {
  let count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  nums.sort((a, b) => a - b);
  
  for (let num of nums) {
    if (!count[num]) continue; // already in a sequence, skip.
    count[num]--; 
    for (let next = num + 1; next < num + k; next++) {
      if (!count[next]) return false; // a missing number 
      count[next]--; 
    }
  }
  return true;
};

// Three test cases 
console.log(isPossibleDivide([1,2,3,3,4,4,5,6], 4)) // true
console.log(isPossibleDivide([3,2,1,2,3,4,3,4,5,9,10,11], 3)) // true
console.log(isPossibleDivide([1,2,3,4], 3)) // false