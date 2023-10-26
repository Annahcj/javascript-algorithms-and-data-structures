// 259. 3Sum Smaller
// Given an array of n integers nums and an integer target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.


// Solution: Two Pointers

// Sort nums in asc order
// Loop through nums from 0 to nums.length - 2 (pointer = a)
  // set two pointers, i to a + 1, j to nums.length - 1
  // loop while i is smaller than j
    // let sum be nums[a] + nums[i] + nums[j]
    // if sum is smaller than target,
      // add j - i to ans (since nums is sorted, that means any number smaller than nums[j] will be <= to nums[i], which means we will have j - i pairs)
      // increment i by one
    // otherwise if sum is bigger than or equal to target,
      // decrement j by one (we need smaller sum)

// Time Complexity: O(n^2) 80ms
// Space Complexity: O(log(n)) (sorting) 40.5MB
var threeSumSmaller = function(nums, target) {
  let ans = 0;
  nums.sort((a, b) => a - b);
  for (var a = 0; a < nums.length - 2; a++) {
    let i = a + 1, j = nums.length - 1;
    while (i < j) {
      let sum = nums[a] + nums[i] + nums[j];
      if (sum < target) {
        // we have now found j - i triplets since anything before nums[j] is smaller than or equal it
        ans += j - i;
        i++;
      } else {
        j--;
      }
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(threeSumSmaller([-2,0,1,3], 2)) // 2
console.log(threeSumSmaller([], 0)) // 0
console.log(threeSumSmaller([0], 0)) // 0