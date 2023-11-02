// 2439. Minimize Maximum of Array
// You are given a 0-indexed array nums comprising of n non-negative integers.
// In one operation, you must:
  // Choose an integer i such that 1 <= i < n and nums[i] > 0.
  // Decrease nums[i] by 1.
  // Increase nums[i - 1] by 1.
// Return the minimum possible value of the maximum integer of nums after performing any number of operations.


// Solution: Binary Search 

// Binary search for the minimum answer. 
// To check if a maximum integer is valid, process nums from right to left so that the numbers on the right will be covered.
  // By going right to left, since we decrease nums[i] and increment nums[i - 1], anything on the right of index i will already be taken care of.
  // We decrease nums[i] until becomes <= the max number and increment nums[i - 1] respectively. Then we take care of nums[i - 1], then nums[i - 2], and so on.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(m)) 285ms
// Space Complexity: O(n) 71.5MB
var minimizeArrayValue = function(nums) {
  let n = nums.length;
  let low = 0, high = Math.max(...nums);
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(max) {
    let numbers = [...nums];
    for (let i = n - 1; i > 0; i--) {
      let diff = Math.max(0, numbers[i] - max);
      numbers[i] -= diff;
      numbers[i - 1] += diff;
    }
    return numbers[0] <= max;
  }
};

// Two test cases
console.log(minimizeArrayValue([3,7,1,6])) // 5
console.log(minimizeArrayValue([10,1])) // 10