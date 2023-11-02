// 2605. Form Smallest Number From Two Digit Arrays
// Given two arrays of unique digits nums1 and nums2, return the smallest number that contains at least one digit from each array.


// Solution: Greedy Logic 

// Priority 1: Find the lowest common digit (one digit number is always smaller than two digits).
// Priority 2: If there is no common digit, find the smallest digit from nums1 and nums2, then return the combined number from those two digits (lower digit first).

// Time Complexity: O(1) 60ms
// Space Complexity: O(1) 41.9MB 
var minNumber = function(nums1, nums2) {
  let set1 = new Set(nums1), set2 = new Set(nums2);
  let min1, min2;
  for (let i = 1; i <= 9; i++) {
    if (set1.has(i) && set2.has(i)) return i;
    if (set1.has(i) && !min1) min1 = i;
    if (set2.has(i) && !min2) min2 = i;
  }
  return Math.min(min1, min2) * 10 + Math.max(min1, min2);
};

// Two test cases
console.log(minNumber([4,1,3], [5,7])) // 15
console.log(minNumber([3,5,2,6], [3,1,7])) // 3