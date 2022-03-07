// 164. Maximum Gap
// Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.
// You must write an algorithm that runs in linear time and uses linear extra space.


// Solution: Radix Sort

// Get the max number from nums and count the number of digits it has.
// Loop for maxDigits number of times
  // 1. arrange each nums[i] into its bucket based on the current digit
  // 2. prefix sum/accumulate in count
  // 3. place each nums[i] to next based on the accumulated index in count
  // 4. reassign nums to next

// d = digits <= 10, n = length of nums, b = base = 10
// Time Complexity: O(d(n + b)) = O(n) 310ms
// Space Complexity: O(n) 67.2MB
var maximumGap = function(nums) {
  let n = nums.length, max = Math.max(...nums), maxDigits = getDigits(max);
  let power = 1;
  
  for (let k = 0; k < maxDigits; k++) {
    let next = Array(n), count = Array(10).fill(0);
    for (let i = 0; i < n; i++) {
      let digit = Math.floor(nums[i] / power) % 10;
      count[digit]++; // counting sort based on current digit
    }
    for (let i = 1; i < 10; i++) count[i] += count[i - 1]; // prefix sum 
    for (let i = n - 1; i >= 0; i--) {
      let digit = Math.floor(nums[i] / power) % 10;
      next[--count[digit]] = nums[i];
    }
    nums = next;
    power *= 10;
  }
  
  let ans = 0;
  for (let i = 1; i < n; i++) {
    ans = Math.max(ans, nums[i] - nums[i - 1]);
  }
  return ans;
};

function getDigits(num) {
  let digits = 0;
  while (num > 0) {
    num = Math.floor(num / 10);
    digits++;
  }
  return digits;
}

// Two test cases to run function on
console.log(maximumGap([3,6,9,1])) // 3
console.log(maximumGap([10])) // 0