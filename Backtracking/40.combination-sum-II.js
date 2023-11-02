// 40. Combination Sum II
// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
// Each number in candidates may only be used once in the combination.
// Note: The solution set must not contain duplicate combinations.


// Solution: Backtracking

// First, sort candidates in asc order.
// res = [] (result)
// call backtrack(0, [], 0)
// return res.

// backtrack: (index, array, current sum)
  // base case: if sum is bigger than target, return (will never amount to target since numbers are all positive)
  // base case: if sum is equal to target,
    // push deep copy of arr into res
    // return
  // loop through from index (pointer = i)
    // (check for duplicates) if candidates[i] is equal to number before it AND i is bigger than idx, continue
    // push candidates[i] into arr
    // backtrack(i + 1, arr, sum + candidates[i])
    // pop last element from arr


// Time Complexity: O(2^n) 76ms
// Space Complexity: O(n) 40.5MB
var combinationSum2 = function(candidates, target) {
  let res = [], n = candidates.length;
  candidates = candidates.sort((a, b) => a - b);
  backtrack(0, [], 0);
  return res;
  
  function backtrack(idx, arr, sum) {
    if (sum > target) return;
    if (sum === target) {
      res.push([...arr]);
      return;
    }
    for (let i = idx; i < n; i++) {
      if (candidates[i] === candidates[i - 1] && i > idx) continue;
      arr.push(candidates[i]);
      backtrack(i + 1, arr, sum + candidates[i]);
      arr.pop();
    }
  }  
};

// Two test cases
console.log(combinationSum2([10,1,2,7,6,1,5], 8)) // [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]
console.log(combinationSum2([2,5,2,1,2], 5)) // [
// [1,2,2],
// [5]
// ]