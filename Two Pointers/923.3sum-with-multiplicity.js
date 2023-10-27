// 923. 3Sum With Multiplicity
// Given an integer array arr, and an integer target, return the number of tuples i, j, k such that i < j < k and arr[i] + arr[j] + arr[k] == target.
// As the answer can be very large, return it modulo 109 + 7.


// Solution: Sorting & Two Pointers

// 1. Sort the array (the order of i, j, k doesn't matter)
// 2. Loop through from 0 to n - 2 (i)
  // Use two pointers to find the number of pairs j and k where arr[i] + arr[j] + arr[k] is equal to the target.
  // At each pair, count the number of same numbers for each. 
  // left = count of same numbers for arr[j], right = count of same numbers for arr[k].
  // There are two cases:
    // 1. arr[j] === arr[k]: Use the formula (n * (n + 1) / 2) to calculate 1 * 2 * 3 ... * (k - j).
    // 2. arr[j] !== arr[k]: left * right

// Time Complexity: O(n^2 + n log(n)) 267ms
// Space Complexity: O(log(n)) (space for sorting) 43.7MB
var threeSumMulti = function(arr, target) {
  let n = arr.length, ans = 0, mod = 10**9 + 7;
  arr.sort((a, b) => a - b);
  
  for (let i = 0; i < n - 2; i++) {
    let j = i + 1, k = n - 1;
    while (j < k) {
      let sum = arr[i] + arr[j] + arr[k];
      if (sum === target) {
        let left = 1, right = 1;
        while (j + left < k && arr[j + left] === arr[j]) left++;
        while (k - right > j && arr[k - right] === arr[k]) right++;
        ans += arr[j] === arr[k] ? ((k - j) * (k - j + 1) / 2) : left * right;
        j += left, k -= right;
      } else if (sum < target) {
        j++;
      } else {
        k--;
      }
    }
  }
  return ans % mod;
};

// Two test cases 
console.log(threeSumMulti([1,1,2,2,3,3,4,4,5,5], 8)) // 20
console.log(threeSumMulti([1,1,2,2,2,2], 5)) // 12