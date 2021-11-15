// 216. Combination Sum III
// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
  // Only numbers 1 through 9 are used.
  // Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.


// Solution: Backtracking

// Time Complexity: O(2^9 * k) (we either take it or not) 64ms
// Space Complexity: O(k) (not including output space) 38.9MB
var combinationSum3 = function(k, n) {
  let res = [];
  backtrack(1, [], 0);
  return res;

  function backtrack(num, arr, sum) {
    if (arr.length === k && sum === n) { // length is k and sum is equal to n, push to res.
      res.push([...arr]);
      return;
    }
    if (arr.length > k || sum > n) return; // cannot possibly go any further, so we return.
    for (var i = num; i <= 9; i++) { 
      arr.push(i); // push i to arr
      backtrack(i + 1, arr, sum + i); // only start looking from the next index, i + 1
      arr.pop(); // backtrack: pop it back out
    }
  }  
};

// Two test cases to run function on
console.log(combinationSum3(3, 7)) // [[1,2,4]]
console.log(combinationSum3(3, 9)) // [[1,2,6],[1,3,5],[2,3,4]]