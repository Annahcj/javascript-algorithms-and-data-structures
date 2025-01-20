// 3113. Find the Number of Subarrays Where Boundary Elements Are Maximum
// You are given an array of positive integers nums.
// Return the number of subarrays of nums, where the first and the last elements of the subarray are equal to the largest element in the subarray.


// Solution: Monotonic Stack

// Iterate through nums left-to-right and maintain a monotonic decreasing stack.
// Keep track of the running count of same numbers on the left of every nums[i], where only smaller or equal numbers are in between.
// sameLeft[i] = count of same numbers on the left of every nums[i] where only smaller or equal numbers are in between.
// For every nums[i], 
  // Pop off all smaller numbers from the top of the stack.
  // When popping stack[stack.length - 1], add sameLeft[stack[stack.length - 1]] to sameLeft[i], because previous equal numbers have been popped off by stack[stack.length - 1].

// Return the sum of every sameLeft[i], as sameLeft[i] is equivalent to the count of subarrays ending at index i.

// Time Complexity: O(n) 21ms
// Space Complexity: O(n) 64.94MB
function numberOfSubarrays(nums) {
  const n = nums.length, stack = [];
  const sameLeft = Array(n).fill(1);
  let subarrays = 0;
  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      if (nums[stack[stack.length - 1]] === nums[i]) {
        sameLeft[i] += sameLeft[stack[stack.length - 1]];
      }
      stack.pop();
    }
    stack.push(i);
    subarrays += sameLeft[i];
  }
  return subarrays;
};

// Three test cases
console.log(numberOfSubarrays([1,4,3,3,2])) // 6
console.log(numberOfSubarrays([3,3,3])) // 6
console.log(numberOfSubarrays([1])) // 1