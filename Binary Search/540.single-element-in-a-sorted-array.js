// 540. Single Element in a Sorted Array

// Solution: Binary Search

// At any point in nums, we calculate the count of numbers on the right.
// There are three situations:
  // 1. nums[mid - 1] is equal to nums[mid] (like [2,3,(3),4,4])
    // if rightLenEven is true (meaning there are only pairs on the right side), then our answer must be on the left side.
    // else (rightLenEven is false), our answer must be on the right.
  // 2. nums[mid + 1] is equal to nums[mid] (like [2,(3),3,4,4])
    // if rightLenEven is true (meaning the right side is odd (not counting the equal number)), then our answer must be on the right side.
    // else (if the right side is odd counting the equal number), then our answer must be on the left.
  // 3. we found the answer - nums[mid] is not equal to the number on its left nor its right
    // return nums[mid]

// Time Complexity: O(log(n)) 76ms
// Space Complexity: O(1) 39.5MB
var singleNonDuplicate = function(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let rightLenEven = (right - mid) % 2 === 0;
    if (nums[mid - 1] === nums[mid]) {
      if (rightLenEven) right = mid - 2;
      else left = mid + 1;
    } else if (nums[mid + 1] === nums[mid]) {
      if (rightLenEven) left = mid + 2;
      else right = mid - 1;
    } else {
      return nums[mid];
    }
  }  
  return nums[left];
};

// Two test cases to run function on
console.log(singleNonDuplicate([1,1,2,3,3,4,4,8,8])) // 2
console.log(singleNonDuplicate([3,3,7,7,10,11,11])) // 10