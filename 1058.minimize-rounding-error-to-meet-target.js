// 1058. Minimize Rounding Error to Meet Target
// Given an array of prices [p1,p2...,pn] and a target, round each price pi to Roundi(pi) so that the rounded array [Round1(p1),Round2(p2)...,Roundn(pn)] sums to the given target. Each operation Roundi(pi) could be either Floor(pi) or Ceil(pi).
// Return the string "-1" if the rounded array is impossible to sum to target. Otherwise, return the smallest rounding error, which is defined as Σ |Roundi(pi) - (pi)| for i from 1 to n, as a string with three places after the decimal.


// Solution: DP w/ Memoization

// Use dynamic programming.
// For each prices[i], we have two choices: floor (round it down) or ceil (round it up).
  // Take the minimum cost out of these two choices.
// The time complexity of such a solution will be 2^n, since we have two choices for each price.
// We can memoize on (index, current sum) to bring the time complexity down to O(n * target)

// We can use a hashmap to keep track of the memoized results instead of a 2D array, since the situations are fairly sparse.

// n = prices.length
// Time Complexity: O(n * target) 565ms
// Space Complexity: O(n * target) 95.7MB
var minimizeError = function(prices, target) {
  let n = prices.length, memo = new Map();
  let res = dp(0, 0);
  return res === Infinity ? "-1" : res.toFixed(3);
  
  function dp(i, sum) {
    if (i === n) return sum === target ? 0 : Infinity;
    if (sum > target) return Infinity;
    let key = `${i},${sum}`;
    if (memo.has(key)) return memo.get(key);
    
    let price = Number(prices[i]);
    let floor = dp(i + 1, sum + Math.floor(price)) + (price - Math.floor(price));
    let ceil = dp(i + 1, sum + Math.ceil(price)) + (Math.ceil(price) - price);
    memo.set(key, Number((Math.min(floor, ceil)).toFixed(3)));
    return memo.get(key);
  }  
};

// Three test cases to run function on
console.log(minimizeError(["0.700","2.800","4.900"], 8)) // "1.000"
console.log(minimizeError(["1.500","2.500","3.500"], 10)) // "-1"
console.log(minimizeError(["1.500","2.500","3.500"], 9)) // "1.500"