// 3028. Ant on the Boundary
// An ant is on a boundary. It sometimes goes left and sometimes right.
// You are given an array of non-zero integers nums. The ant starts reading nums from the first element of it to its end. At each step, it moves according to the value of the current element:
  // If nums[i] < 0, it moves left by -nums[i] units.
  // If nums[i] > 0, it moves right by nums[i] units.
// Return the number of times the ant returns to the boundary.


// Solution: Prefix Sum

// Keep track of the running sum of nums.
// Whenever the sum becomes 0, we are at the boundary.

// Time Complexity: O(n) 65ms
// Space Complexity: O(1) 51.6MB
var returnToBoundaryCount = function(nums) {
  let position = 0, ans = 0;
  for (let num of nums) {
    position += num;
    if (position === 0) ans++;
  }
  return ans;
};

// Two test cases
console.log(returnToBoundaryCount([2,3,-5])) // 1
console.log(returnToBoundaryCount([3,2,-3,-4])) // 0