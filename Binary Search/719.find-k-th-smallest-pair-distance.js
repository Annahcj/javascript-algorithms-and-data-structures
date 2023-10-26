// 719. Find K-th Smallest Pair Distance
// The distance of a pair of integers a and b is defined as the absolute difference between a and b.
// Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.


// Solution: Binary Search & Two Pointers

// Binary search for the smallest distance such numPairs(distance) >= k. (numPairs(distance) = the number of pairs with distance within "distance")
// To find the number of pairs within a certain distance, sort nums in asc order and use two pointers.
  // Move i up while the distance between nums[i] and nums[j] is too big.

// n = length of nums, m = max distance between pairs
// Time Complexity: O(n log(n) + n log(m)) 104ms
// Space Complexity: O(log(n)) (space for sorting) 44.4MB
var smallestDistancePair = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let low = 0, high = nums[n - 1] - nums[0];
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (numPairs(mid) >= k) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function numPairs(dist) {
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