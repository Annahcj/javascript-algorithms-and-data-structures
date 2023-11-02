// 477. Total Hamming Distance
// The Hamming distance between two integers is the number of positions at which the corresponding bits are different.
// Given an integer array nums, return the sum of Hamming distances between all the pairs of the integers in nums.


// Solution: Bit Manipulation

// Notice that the distances are counted for bits in the same position.
// When two numbers have a different bit (1 & 0) at the same position, we add to the total hamming distance: +1
// For each position, count the number of 1 bits and 0 bits.
// The distance for each position is: the number of 1 bits * the number of 0 bits.
// We are basically counting the number of pairs with different bits for each position.

// Time Complexity: O(32n) = O(n) 169ms
// Space Complexity: O(32 * 2) = O(1) 45.7MB
var totalHammingDistance = function(nums) {
  let count = Array(32).fill(0).map(() => Array(2).fill(0));
  for (let num of nums) {
    for (let i = 0; i < 32; i++) {
      let bit = (num >> i) & 1;
      count[i][bit]++;
    }
  }
  
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    ans += count[i][0] * count[i][1];
  }
  return ans;
};

// Two test cases to run function on
console.log(totalHammingDistance([4,14,2])) // 6
console.log(totalHammingDistance([4,14,4])) // 4