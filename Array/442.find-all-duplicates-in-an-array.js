// 442. Find All Duplicates in an Array
// Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.
// You must write an algorithm that runs in O(n) time and uses only constant extra space.


// Solution: Mark Visited Nums as Negative

// Let res be the array in which we keep the duplicate numbers
// Loop through each num in nums
  // if the number at nums[Math.abs(num) - 1] is negative, push Math.abs(num) into res
  // otherwise, mark nums[Math.abs(num) - 1] as negative

// Time Complexity: O(n) 125ms
// Space Complexity: O(1) 46.9MB
var findDuplicates = function(nums) {
  let res = [];
  for (let num of nums) {
    // We use num - 1 because the numbers are in the range 1 to n.
    // In order to make them fit in the array, we would need to subtract one.
    if (nums[Math.abs(num) - 1] < 0) res.push(Math.abs(num));
    else nums[Math.abs(num) - 1] *= -1;
  }  
  return res;
};

// Four test cases 
console.log(findDuplicates([2,2])) // [2]
console.log(findDuplicates([4,3,2,7,8,2,3,1])) // [2,3]
console.log(findDuplicates([1,1,2])) // [1]
console.log(findDuplicates([1])) // []