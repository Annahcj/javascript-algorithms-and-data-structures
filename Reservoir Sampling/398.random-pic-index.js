// 398. Random Pick Index
// Given an integer array nums with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.
// Implement the Solution class:
  // Solution(int[] nums) Initializes the object with the array nums.
  // int pick(int target) Picks a random index i from nums where nums[i] == target. If there are multiple valid i's, then each index should have an equal probability of returning.


// Solution 1: Hashmap for Indices - O(1) pick, O(n) space

// Group the same numbers together in a hashmap -> {number: [index, index], number: [index, ...], ...}
// To pick a random index, use Math.random() for the array of indices for the target.

// Time Complexity: 299ms
  // initialization: O(n)
  // pick: O(1)
// Space Complexity: 91.3MB
  // intialization: O(n)
  // pick: O(1)
var Solution = function(nums) {
  this.indices = {};  
  for (let i = 0; i < nums.length; i++) {
    if (!this.indices[nums[i]]) this.indices[nums[i]] = [];
    this.indices[nums[i]].push(i);
  }
};

Solution.prototype.pick = function(target) {
  let indices = this.indices[target];
  return indices[Math.floor(Math.random() * indices.length)];
};


// Solution 2: Reservoir Sampling - O(n) pick, O(1) space

// For pick, get the running count of numbers equal to target.
// 1. Pick a random index between 0 and the count
// 2. If the random index happens to be equal to the count, set the answer to the current count.

// e.g: [1,2,3]
// 1: idx = 0, random number will always be 0. Set our answer to node 0.
// 2: idx = 1, random number will be 0 or 1. If it is 1, we change our answer to node 1.
  // There is a 50% chance of keeping the old number, and 50% chance of taking the new number.
// 3: idx = 2, random number will be 0, 1, or 2. If it is 2, we change our answer to node 2.
  // There is a 67.777% chance of keeping the old number, and 33.333% chance of taking the new number.

// Every number has an equal chance of getting chosen.

// Time Complexity: 3659ms
  // initialization: O(1)
  // pick: O(n)
// Space Complexity: 62.4MB
  // intialization: O(1)
  // pick: O(1)
var Solution = function(nums) {
  this.nums = nums;
};

Solution.prototype.pick = function(target) {
  let count = 0, ans = 0;
  for (let i = 0; i < this.nums.length; i++) {
    if (this.nums[i] === target) {
      let randomIndex = Math.floor(Math.random() * (count + 1));
      if (randomIndex === count) ans = i;
      count++;
    }
  }
  return ans;
};

// A few test cases
let solution = new Solution([1, 2, 3, 3, 3]);
console.log(solution.pick(3)); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
console.log(solution.pick(1)); // It should return 0. Since in the array only nums[0] is equal to 1.
console.log(solution.pick(3)); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.