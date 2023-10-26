// 611. Valid Triangle Number
// Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.


// Solution 1: Three Pointers

// First, sort nums in ascending order.
// Loop through nums, setting two other pointers in (i + 1) and (i + 2),
// we keep looping pointer j (i + 1), and we increment k if nums[i] + nums[j] > nums[k] (we know that if it isn't a valid triangle, there's no point moving more right, since the nums are sorted in asc order)
// we add the (k - j - 1) to count, since that's how many combinations there were
// return count.

// Time Complexity: O(n ^ 2) 120ms
// Space Complexity: O(log(n)) 40.4MB
var triangleNumber = function(nums) {
    nums = nums.sort((a, b) => a - b);
    let count = 0;
    for (var i = 0; i < nums.length - 2; i++) {
      let k = i + 2;
      for (var j = i + 1; j < nums.length - 1; j++) {
        while (k < nums.length && nums[i] + nums[j] > nums[k]) {
          k++;
        }
        if (k - j > 0) count += k - j - 1;
      }
    }
    return count;
  };
  
  // Three test cases to run function on
  console.log(triangleNumber([0,1,1,1])) // 1
  console.log(triangleNumber([2,2,3,4])) // 3
  console.log(triangleNumber([4,2,3,4])) // 4