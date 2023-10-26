// 77. Combinations
// Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].
// You may return the answer in any order.


// Solution: Backtracking

// Runtime on LeetCode: 120ms
// Memory Usage on LeetCode: 44MB
var combine = function(n, k) {
  let res = [];
  backtrack(1, []);
  return res;

  function backtrack(start, arr) {
    // when we have k elements in the arr, add to res and return.
    if (arr.length === k) {
      res.push([...arr]);
      return;
    }
    // traverse all possibilities from start to n
    for (var i = start; i <= n; i++) {
      arr.push(i);
      backtrack(i + 1, arr);
      arr.pop();
    }
  }  
};

// Two test cases to run function on
console.log(combine(4, 2)) // [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
console.log(combine(1, 1)) // [[1]]