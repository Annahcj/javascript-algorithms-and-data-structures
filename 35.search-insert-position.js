// 35. Search Insert Position
// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.


// Solution: Binary Search

// Find first element bigger than or equal to target

// Time Complexity: O(log(n)) 80ms
// Space Complexity: O(1) 39.9MB
var searchInsert = function(nums, target) {
  let left = 0, right = nums.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) right = mid; 
    else left = mid + 1;
  }  
  return left;
};

// Five test cases to run function on
console.log(searchInsert([1,3,5,6], 5)) // 2
console.log(searchInsert([1,3,5,6], 2)) // 1
console.log(searchInsert([1,3,5,6], 7)) // 4
console.log(searchInsert([1,3,5,6], 0)) // 0
console.log(searchInsert([1], 0)) // 0