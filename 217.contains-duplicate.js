// 217. Contains Duplicate
// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.


// Solution: Set

// Use a set to record whether a number exists.
// Loop through each number,
  // if the set contains the number, return true (a duplicate exists)
  // add num to the set
// if we reach the end, return false.

// Time Complexity: O(n) 97ms
// Space Complexity: O(n) 44.3MB
var containsDuplicate = function(nums) {
  let unique = new Set();
  for (var num of nums) {
    if (unique.has(num)) return true;
    unique.add(num);
  }  
  return false;
};

// Three test cases to run function on
console.log(containsDuplicate([1,2,3,1])) // true
console.log(containsDuplicate([1,2,3,4])) // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])) // true