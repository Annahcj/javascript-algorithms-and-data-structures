// 793. Preimage Size of Factorial Zeroes Function
// Let f(x) be the number of zeroes at the end of x!. Recall that x! = 1 * 2 * 3 * ... * x and by convention, 0! = 1.
  // For example, f(3) = 0 because 3! = 6 has no zeroes at the end, while f(11) = 2 because 11! = 39916800 has two zeroes at the end.
// Given an integer k, return the number of non-negative integers x have the property that f(x) = k.


// Solution: Binary Search

// Notice that as an integer becomes larger, the amount of trailing zeros for integer! will only increase. Therefore, we can use binary search.
// Binary search for the first integer x where f(x) = k.
// Binary search for the last integer x where f(x) = k.
// Return the difference between the last and first integers.

// Loose upper bound: 5 * 10^9
  // k <= 10^9, so that means there will be less than 10^9 multiples of 5, so x will be less than 5 * 10^9.

// To count the number of trailing zeros for x!, we need to find the number of prime factors 2 and 5 in x! (2 * 5 = 10)
// Note that we don't need to actually multiply the numbers to know the number of prime factors (2, 5).
// We know that there will always be more prime factor 2s than 5s, so we only need to count the number of prime factor 5s.
  // Find the number of multiples of each power of 5 that is <= x.
    // i = 5: contributes Math.floor(x / 5) of prime factor 5s
    // i = 25: contributes another Math.floor(x / 25) of prime factor 5s
    // i = 125: contributes another Math.floor(x / 125) of prime factor 5s
    // ... and so on until i > x

// Time Complexity: O(log(5 * k)) 135ms
// Space Complexity: O(1) 42.1MB
var preimageSizeFZF = function(k) {
  let low = 0, high = 5000000000;
  // binary search for the smallest integer where trailingZeros(integer) === k
  while (low < high) { 
    let mid = low + Math.floor((high - low) / 2);
    let trailingZeros = getTrailingZeros(mid);
    if (trailingZeros >= k) high = mid;
    else low = mid + 1;
  }
  let firstInt = low;
  low = 0, high = 5000000000;
  // binary search for the largest integer where trailingZeros(integer) === k
  while (low < high) { 
    let mid = low + Math.ceil((high - low) / 2);
    let trailingZeros = getTrailingZeros(mid);
    if (trailingZeros <= k) low = mid;
    else high = mid - 1;
  }
  let lastInt = low;
  return Math.max(0, lastInt - firstInt + 1);
};

function getTrailingZeros(x) {
  let ans = 0;
  for (let i = 5; i <= x; i *= 5) {
    ans += Math.floor(x / i);
  }
  return ans;
}

// Three test cases
console.log(preimageSizeFZF(0)) // 5
console.log(preimageSizeFZF(5)) // 0
console.log(preimageSizeFZF(3)) // 5