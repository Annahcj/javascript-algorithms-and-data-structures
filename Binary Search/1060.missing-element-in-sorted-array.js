// 1060. Missing Element in Sorted Array


// Solution: Binary Search

// Binary search for the number where there are at least k numbers missing before it.
// For example - [4,7], k = 2 -> answer = 6
  // we would look for the number 7,
  // then calculate the missing numbers: nums[idx - 1] - nums[0] - idx (4 - 4 - 0 = 0) -> 0 missing numbers
  // we would return nums[idx - 1] + 4 - k + missing numbers -> 4 + 4 - 2 + 0 -> 6

// Time Complexity: O(log(n)) 68ms
// Space Complexity: O(1) 44.1MB
var missingElement = function(nums, k) {
  let left = 0, right = nums.length;
  // edge case: if the last number is the number we are looking for
  if (missing(nums.length - 1) < k) return nums[nums.length - 1] + k - missing(nums.length - 1);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (missing(mid) >= k) {
      right = mid;
    } else {
      left = mid + 1;
    }
  } 
  return nums[left - 1] + k - missing(left - 1);

  function missing(idx) { // returns 
    return nums[idx] - nums[0] - idx;
  }
};

// Four test cases 
console.log(missingElement([2,3,5,7], 1)) // 4
console.log(missingElement([4,7,9,10], 1)) // 5
console.log(missingElement([4,7,9,10], 3)) // 8
console.log(missingElement([1,2,4], 3)) // 6