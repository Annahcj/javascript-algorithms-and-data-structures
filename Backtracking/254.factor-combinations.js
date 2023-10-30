// 254. Factor Combinations
// Numbers can be regarded as the product of their factors.
// For example, 8 = 2 x 2 x 2 = 2 x 4.
// Given an integer n, return all possible combinations of its factors. You may return the answer in any order.
// Note that the factors should be in the range [2, n - 1].


// Solution: Backtracking

// Work backwards -> 
// Backtrack to get the combinations
// For each num, 
  // we only record the combinations in increasing order -> [2,2,4] not [4,2,2], so the factor must be bigger than or equal to the one before it.
  // this way, we can avoid creating duplicate combinations (combinations with the same numbers but in a different order).
  
  // loop from <last factor in arr> up to <square root of num> (factor = i)
    // if num is divisble by i,
      // push i into arr
      // backtrack(num / i, arr)
      // pop i out of arr 
  // extra check: if num is not equal to n AND num is bigger than or equal to the num before it
    // push num into arr
    // backtrack(1, arr)
    // pop num out of arr


// Time Complexity: O(log(n) * log(n)) 100ms
// Space Complexity: O(log(n)) (not including output) 43.7MB
var getFactors = function(n) {
  let res = [];
  backtrack(n, []);
  return res;

  function backtrack(num, arr) {
    if (num === 1) {
      if (arr.length) res.push([...arr]);
      return;
    }
    let lastNum = arr[arr.length - 1] || 2;
    let sqrt = Math.sqrt(num);
    for (let i = lastNum; i <= sqrt; i++) {
      if (num % i === 0) {
        arr.push(i);
        backtrack(num / i, arr);
        arr.pop();
      }
    }
    if (num !== n && num >= lastNum) {
      arr.push(num);
      backtrack(1, arr);
      arr.pop();
    }
  }
};

// Four test cases
console.log(getFactors(1)) // []
console.log(getFactors(12)) // [[2,6],[3,4],[2,2,3]]
console.log(getFactors(37)) // []
console.log(getFactors(32)) // [[2,16],[4,8],[2,2,8],[2,4,4],[2,2,2,4],[2,2,2,2,2]]