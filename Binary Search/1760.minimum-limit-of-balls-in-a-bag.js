// 1760. Minimum Limit of Balls in a Bag
// You are given an integer array nums where the ith bag contains nums[i] balls. You are also given an integer maxOperations.
// You can perform the following operation at most maxOperations times:
  // Take any bag of balls and divide it into two new bags with a positive number of balls.
    // For example, a bag of 5 balls can become two new bags of 1 and 4 balls, or two new bags of 2 and 3 balls.
// Your penalty is the maximum number of balls in a bag. You want to minimize your penalty after the operations.
// Return the minimum possible penalty after performing the operations.


// Solution: Binary Search 

// Binary search for the minimum minimum balls we can have in a bag.
// For each minimum x, greedily split every bag into groups of x amount: Math.ceil(nums[i] / x) - 1
  // If we exceed the maxOperations, then the amount x is not possible.

// Time Complexity: O(n log(n)) 123ms
// Space Complexity: O(1) 53.5MB
var minimumSize = function(nums, maxOperations) {
  let n = nums.length;
  let low = 1, high = Math.max(...nums);
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(x) {
    let operations = 0;
    for (let i = 0; i < n; i++) {
      operations += Math.ceil(nums[i] / x) - 1;
      if (operations > maxOperations) return false;
    }
    return true;
  }
};

// Two test cases 
console.log(minimumSize([9], 2)) // 3
console.log(minimumSize([2,4,8,2], 4)) // 2