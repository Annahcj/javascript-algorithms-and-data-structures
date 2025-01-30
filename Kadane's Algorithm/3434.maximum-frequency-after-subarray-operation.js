// 3434. Maximum Frequency After Subarray Operation
// You are given an array nums of length n. You are also given an integer k.
// You perform the following operation on nums once:
  // Select a subarray nums[i..j] where 0 <= i <= j <= n - 1.
  // Select an integer x and add x to all the elements in nums[i..j].
// Find the maximum frequency of the value k after the operation.


// Solution: Enumeration & Kadane's Algorithm

// We need to find a subarray that contains the maximum occurances of the same number.
// Since k <= 50, we can iterate through every value x as the same element that we want to turn into k.
// Use Kadane's algorithm to find the subarray with the maximum occurances of x and minimal occurances of k. 
// Since existing k values come for free, if the subarray we are taking includes many occurances of k we are worse off.
// We only gain if the occurances of x exceed the occurances of k.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(nm) 147ms
// Space Complexity: O(m) 58.98MB
function maxFrequency(nums, k) {
  const count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let maxGain = 0;
  for (let key in count) {
    if (key == k) continue;
    let gain = 0;
    for (let num of nums) {
      if (num == key) gain++;
      else if (num == k) gain--;
      if (gain < 0) gain = 0;
      maxGain = Math.max(maxGain, gain);
    }
  }
  return maxGain + (count[k] || 0);
};

// Two test cases
console.log(maxFrequency([1,2,3,4,5,6], 1)) // 2
console.log(maxFrequency([10,2,3,4,5,5,4,3,2,2], 10)) // 4