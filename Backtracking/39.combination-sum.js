// 39. Combination Sum
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
// It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.


// Solution: Backtracking

// Runtime on LeetCode: 120ms
// Memory Usage on LeetCode: 41.3MB
var combinationSum = function(candidates, target) {
  let res = [];
  backtrack([], 0, target);

  function backtrack(arr, idx, target) {
    if (target < 0) return;
    if (target === 0) res.push([...arr]);
    for (var i = idx; i < candidates.length; i++) {
      arr.push(candidates[i]);
      backtrack(arr, i, target - candidates[i]);
      arr.pop();
    }
  }  
  return res;
};

// Five test cases
console.log(combinationSum([2,3,6,7], 7)) // [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)) // [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)) // []
console.log(combinationSum([1], 1)) // [[1]]
console.log(combinationSum([1], 2)) // [[1,1]]