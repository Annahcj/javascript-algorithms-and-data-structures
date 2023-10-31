// 2091. Removing Minimum and Maximum From Array
// You are given a 0-indexed array of distinct integers nums.
// There is an element in nums that has the lowest value and an element that has the highest value. We call them the minimum and maximum respectively. Your goal is to remove both these elements from the array.
// A deletion is defined as either removing an element from the front of the array or removing an element from the back of the array.
// Return the minimum number of deletions it would take to remove both the minimum and maximum element from the array.


// Solution: 

// There are four possible cases:
  // 1. Remove from start only
  // 2. Remove from end only
  // 3. Remove min from start and max from end
  // 4. Remove max from start and min from end

// 1. Find the indexes of the min and max elements.
// 2. Return the minimum of the four cases

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 52.2MB
var minimumDeletions = function(nums) {
  let minIdx = 0, maxIdx = 0;
  let n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[minIdx]) minIdx = i;
    if (nums[i] > nums[maxIdx]) maxIdx = i;
  }
  let left = Math.max(minIdx + 1, maxIdx + 1); // remove from start
  let right = Math.max(n - minIdx, n - maxIdx); // remove from end
  let bothEnds = Math.min(minIdx + 1, n - minIdx) + Math.min(maxIdx + 1, n - maxIdx); // remove from both ends
  return Math.min(left, right, bothEnds);
};

// Three test cases
console.log(minimumDeletions([2,10,7,5,4,1,8,6])) // 5
console.log(minimumDeletions([0,-4,19,1,8,-2,-3,5])) // 3
console.log(minimumDeletions([101])) // 1