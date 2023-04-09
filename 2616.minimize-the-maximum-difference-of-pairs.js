// 2616. Minimize the Maximum Difference of Pairs
// You are given a 0-indexed integer array nums and an integer p. Find p pairs of indices of nums such that the maximum difference amongst all the pairs is minimized. Also, ensure no index appears more than once amongst the p pairs.
// Note that for a pair of elements at the index i and j, the difference of this pair is |nums[i] - nums[j]|, where |x| represents the absolute value of x.
// Return the minimum maximum difference among all p pairs.

 
// Solution: Binary Search

// First sort nums in asc order.
// Then, binary search for the minimum maximum difference.
// To check if we can make p pairs with maximum difference of x,
  // Greedily try to take adjacent pairs.
  // Logic: Taking adjacent pairs ensures that the difference will be minimized. If we don't take adjacent pairs, the gaps left over will be larger than if we took adjacent pairs.

// Time Complexity: O(n log(n)) 124ms
// Space Complexity: O(log(n)) (space for sorting) 54.6MB
var minimizeMax = function(nums, p) {
  if (p === 0) return 0;
  nums.sort((a, b) => a - b);
  let n = nums.length, low = 0, high = nums[n - 1] - nums[0];
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(maxDiff) {
    let i = 1, pairs = 0;
    while (i < n) {
      if (nums[i] - nums[i - 1] <= maxDiff) {
        pairs++;
        i += 2;
      } else {
        i++;
      }
      if (pairs === p) return true;
    }
    return false;
  }
};

// Two test cases
console.log(minimizeMax([10,1,2,7,1,3], 2)) // 1
console.log(minimizeMax([4,2,1,2], 1)) // 0