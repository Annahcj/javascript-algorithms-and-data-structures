// 169. Majority Element
// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.


// Solution: Boyer-Moore Voting Algorithm

// Keep a count, initially set to 0, and an element (which we will return at the end)
// Loop through each num in nums *
  // if count is 0, set element equal to num.
  // if num is equal to element, increment count, otherwise decrement count.
// *
// Return element.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 42.3MB
var majorityElement = function(nums) {
  let count = 0, element;
  for (var num of nums) {
    if (count === 0) {
      element = num;
    }
    if (num === element) count++;
    else count--;
  }  
  return element;
};

// Three test cases to run function on
console.log(majorityElement([1,5,5])) // 5
console.log(majorityElement([3,2,3])) // 3
console.log(majorityElement([2,2,1,1,1,2,2])) // 2