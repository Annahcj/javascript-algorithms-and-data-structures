// 2295. Replace Elements in an Array
// You are given a 0-indexed array nums that consists of n distinct positive integers. Apply m operations to this array, where in the ith operation you replace the number operations[i][0] with operations[i][1].
// It is guaranteed that in the ith operation:
  // operations[i][0] exists in nums.
  // operations[i][1] does not exist in nums.
// Return the array obtained after applying all the operations.


// Solution: Hashmap

// Map each index to nums[index] -> { number: index, number: index, ... }
// For each operation, update nums[map[x]] to y and set map[y] to map[x].

// Time Complexity: O(n + m) 633ms
// Space Complexity: O(unique numbers in nums and operations) 107MB
var arrayChange = function(nums, operations) {
  let map = {}, n = nums.length;
  for (let i = 0; i < n; i++) map[nums[i]] = i;
  for (let [x, y] of operations) {
    nums[map[x]] = y;
    map[y] = map[x];
  }
  return nums;
};

// Two test cases to run function on
console.log(arrayChange([1,2,4,6], [[1,3],[4,7],[6,1]])) // [3,2,7,1]
console.log(arrayChange([1,2], [[1,3],[2,1],[3,2]])) // [2,1]