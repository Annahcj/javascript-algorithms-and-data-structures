// 2226. Maximum Candies Allocated to K Children
// You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile into any number of sub piles, but you cannot merge two piles together.
// You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. Each child can take at most one pile of candies and some piles of candies may go unused.
// Return the maximum number of candies each child can get.


// Solution: Binary Search

// Binary search for the maximum amount of candies.
// How to check whether a certain amount is enough for at least k piles:
  // Since we can't join piles together, the amount of piles we can get from each candies[i] is Math.floor(candies[i] / amount) 
  // If the sum of all Math.floor(candies[i] / amount) >= k, the amount is enough.

// n = length of candies, m = max(candies)
// Time Complexity: O(n log(m)) 222ms
// Space Complexity: O(1) 54.9MB
var maximumCandies = function(candies, k) {
  let low = 0, high = Math.max(...candies);
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function isEnough(amount) {
    let count = 0;
    for (let i = 0; i < candies.length; i++) {
      count += Math.floor(candies[i] / amount);
    }
    return count >= k;
  }
};

// Two test cases to run function on
console.log(maximumCandies([5,8,6], 3)) // 5
console.log(maximumCandies([2,5], 11)) // 5