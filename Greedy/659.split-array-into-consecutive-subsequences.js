// 659. Split Array into Consecutive Subsequences
// You are given an integer array nums that is sorted in non-decreasing order.
// Determine if it is possible to split nums into one or more subsequences such that both of the following conditions are true:
  // Each subsequence is a consecutive increasing sequence (i.e. each integer is exactly one more than the previous integer).
  // All subsequences have a length of 3 or more.
// Return true if you can split nums according to the above conditions, or false otherwise.
// A subsequence of an array is a new array that is formed from the original array by deleting some (can be none) of the elements without disturbing the relative positions of the remaining elements. (i.e., [1,3,5] is a subsequence of [1,2,3,4,5] while [1,3,2] is not).


// Solution: Greedy Approach

// 1. Get the count of occurances of each number in a hashmap.
// 2. Check whether nums can be split into consecutive subsequences.
  // If a number can be placed at the end of an existing subsequence, always do that.
  // Otherwise, try to create a new subsequence with the minimal length we need - 3
  // If we can't do either, return false.

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 51MB
var isPossible = function(nums) {
  let count = {}, end = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  
  for (let num of nums) {
    if (count[num] === 0) continue;
    count[num]--;
    
    if (end[num - 1] > 0) { // can append to existing sequence
      end[num - 1]--;
      end[num] = (end[num] || 0) + 1;
    } else if (count[num + 1] > 0 && count[num + 2] > 0) { // can create new subsequence
      count[num + 1]--;
      count[num + 2]--;
      end[num + 2] = (end[num + 2] || 0) + 1;
    } else {
      return false;
    }
  }
  return true;
};

// Three test cases to run function on
console.log(isPossible([1,2,3,3,4,5])) // true
console.log(isPossible([1,2,3,3,4,4,5,5])) // true
console.log(isPossible([1,2,3,4,4,5])) // false