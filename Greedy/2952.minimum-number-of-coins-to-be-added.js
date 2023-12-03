// 2952. Minimum Number of Coins to be Added
// You are given a 0-indexed integer array coins, representing the values of the coins available, and an integer target.
// An integer x is obtainable if there exists a subsequence of coins that sums to x.
// Return the minimum number of coins of any value that need to be added to the array so that every integer in the range [1, target] is obtainable.
// A subsequence of an array is a new non-empty array that is formed from the original array by deleting some (possibly none) of the elements without disturbing the relative positions of the remaining elements.


// Solution: Greedy w/ Sorting

// Keep track of the maximum number covered in the range so far, starting with 0.
// Sort coins in asc order.
// Go through each coin in sorted order and fill in the missing numbers.
  // If we cannot create a sum `x` and the maximum number covered so far is `x - 1`, then it's optimal to add the number `x` to the array.
  // Once we add x to the array, we know that by adding x to all previous subsequences, we can get any sum in the range [1, ..., x + x + 1].
  // e.g: maxRange = 3, current array = [1,2]
  // subsequences: 
    // 1: [1]
    // 2: [2]
    // 3: [1,2]
  // We need sum 4 -> add 4, current array = [1,2,4]
  // subsequences:
    // 1: [1]
    // 2: [2]
    // 3: [1,2]
    // 4: [4]
    // 5: [1,4]
    // 6: [2,4]
    // 7: [1,2,4]

// At the end, if there are still missing coins up to target, fill them in with the same greedy strategy until we can cover up to target.

// Time Complexity: O(n log(n))
// Space Complexity: O(log(n)) (space for sorting)
var minimumAddedCoins = function(coins, target) {
  coins.sort((a, b) => a - b);
  let maxSum = 0, ans = 0;
  for (let coin of coins) {
    while (maxSum + 1 < coin) { // we will already get `coin`, so fill the sums smaller than `coin`
      maxSum += maxSum + 1;
      ans++;
      if (maxSum >= target) return ans;
    }
    maxSum += coin;
  }
  while (maxSum < target) {
    maxSum += maxSum + 1;
    ans++;
  }
  return ans;
};

// Three test cases
console.log(minimumAddedCoins([1,4,10], 19)) // 2
console.log(minimumAddedCoins([1,4,10,5,7,19], 19)) // 1
console.log(minimumAddedCoins([1,1,1], 20)) // 3