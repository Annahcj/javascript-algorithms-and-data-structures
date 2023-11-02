// 491. Increasing Subsequences
// Given an integer array nums, return all the different possible increasing subsequences of the given array with at least two elements. You may return the answer in any order.
// The given array may contain duplicates, and two equal integers should also be considered a special case of increasing sequence.


// Solution: Backtracking

// For each backtrack(start, arr),
  // Try each bigger number in nums from index start onwards. (important to only go forward)

// Reason for using a set in the backtrack function:
  // For each state of arr, we make sure to only generate one of each type of new array.
    // e.g: when arr = [4] and we have new options [7,7], 
    // make sure we only put [4,7] only once. Without this check, we would end up having [4,7] twice.

// Time Complexity: O(2^n) 214ms
// Space Complexity: O(2^n) 66.2MB
var findSubsequences = function(nums) {
  let res = [], n = nums.length;
  backtrack(0, []);
  return res;
  
  function backtrack(start, arr) {
    if (arr.length > 1) res.push([...arr]);
    
    let used = new Set();
    for (let i = start; i < n; i++) {
      if (used.has(nums[i]) || (arr.length > 0 && arr[arr.length - 1] > nums[i])) continue;
      
      arr.push(nums[i]);
      backtrack(i + 1, arr);
      arr.pop();
      
      used.add(nums[i]);
    }
  }
};

// Two test cases
console.log(findSubsequences([4,6,7,7])) // [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
console.log(findSubsequences([4,4,3,2,1])) // [[4,4]]