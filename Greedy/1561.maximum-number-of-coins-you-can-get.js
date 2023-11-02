// 1561. Maximum Number of Coins You Can Get
// There are 3n piles of coins of varying size, you and your friends will take piles of coins as follows:
  // In each step, you will choose any 3 piles of coins (not necessarily consecutive).
  // Of your choice, Alice will pick the pile with the maximum number of coins.
  // You will pick the next pile with the maximum number of coins.
  // Your friend Bob will pick the last pile.
  // Repeat until there are no more piles of coins.
// Given an array of integers piles where piles[i] is the number of coins in the ith pile.
// Return the maximum number of coins that you can have.


// Solution: Greedy w/ Sorting

// It is always optimal to pick 
  // The minimum pile for Bob
  // The two maximum piles for you and Alice

// The first 1/3 of piles will go to Bob and the first of every two coins will go to you.

// Time Complexity: O(n log(n)) 231ms
// Space Complexity: O(log(n)) (space for sorting) 52.2MB
var maxCoins = function(piles) {
  let n = piles.length, ans = 0;
  piles.sort((a, b) => a - b);
  for (let i = n / 3; i < n; i += 2) {
    ans += piles[i];
  }
  return ans;
};

// Two test cases
console.log(maxCoins([2,4,1,2,7,8])) // 9
console.log(maxCoins([9,8,7,6,5,1,2,3,4])) // 18