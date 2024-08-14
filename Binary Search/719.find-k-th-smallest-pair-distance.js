// 719. Find K-th Smallest Pair Distance
// The distance of a pair of integers a and b is defined as the absolute difference between a and b.
// Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.


// Solution: Binary Search w/ Two Pointeres

// Binary search for the smallest distance `dist` where the number of pairs with distance <= dist is greater than or equal to k.

// To find the pairs for with distance <= dist, 
  // Use two pointers i and j starting at (0, 0).
  // j is the anchor, moving up incrementally.
  // Move i up when nums[j] - nums[i] > dist.

// n = length of nums, m = max(nums[i]) - min(nums[i])
// Time Complexity: O(n log(n) + n log(m)) 53ms
// Space Complexity: O(log(n)) (space for sorting) 50MB
function smallestDistancePair(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let low = 0, high = nums[n - 1] - nums[0];
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (countPairs(mid) >= k) high = mid;
    else low = mid + 1;
  }
  return low;
  
  // Find the number of pairs with distance <= dist
  function countPairs(dist) {
    let pairs = 0;
    for (let j = 0, i = 0; j < n; j++) {
      // move i up while distance is too big
      while (nums[j] - nums[i] > dist) i++;
      pairs += j - i;
    }
    return pairs;
  }
};

// Three test cases to run function on
console.log(smallestDistancePair([1,3,1], 1)) // 0
console.log(smallestDistancePair([1,1,1], 2)) // 0
console.log(smallestDistancePair([1,6,1], 3)) // 5