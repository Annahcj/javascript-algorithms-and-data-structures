// 2149. Rearrange Array Elements by Sign
// You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.
// You should rearrange the elements of nums such that the modified array follows the given conditions:
  // 1. Every consecutive pair of integers have opposite signs.
  // 2. For all integers with the same sign, the order in which they were present in nums is preserved.
  // 3. The rearranged array begins with a positive integer.
// Return the modified array after rearranging the elements to satisfy the aforementioned conditions.


// Solution: Split & Merge

// 1. Split nums into two groups: positive and negative
// 2. Merge these two back together (positive going first)

// Time Complexity: O(n) 749ms
// Space Complexity: O(n) 96.4MB
var rearrangeArray = function(nums) {
  let pos = [], neg = [];
  for (let num of nums) {
    if (num > 0) pos.push(num);
    else neg.push(num);
  }  
  let res = [];
  for (let i = 0; i < pos.length; i++) {
    res.push(pos[i]);
    res.push(neg[i]);
  }
  return res;
};

// Two test cases
console.log(rearrangeArray([3,1,-2,-5,2,-4])) // [3,-2,1,-5,2,-4]
console.log(rearrangeArray([-1,1])) // [3,-2,1,-5,2,-4]