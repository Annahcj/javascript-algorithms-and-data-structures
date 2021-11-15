// 494. Target Sum
// You are given an integer array nums and an integer target.
// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.
  // For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.


// Solution: Recursion w/ Memoization

// For each number in nums, we make two decisions:
  // Add the number to sum
  // Subtract the number to sum

// n = nums.length, m = target
// Time Complexity: O(nm) 340ms
// Space Complexity: O(nm) 50.8MB
var findTargetSumWays = function(nums, target) {
  let memo = {};
  return recurse(0, 0);
  function recurse(idx, sum) {
    if (memo[`${idx},${sum}`] !== undefined) return memo[`${idx},${sum}`]; // if memo contains the answer already, return what is recorded in memo.
    if (idx === nums.length) { // finished going through all numbers
      if (sum === target) return 1; // we got to the target sum, so it is 1 combination.
      return 0; // otherwise it is not a valid combination
    }
    // two decisions:
      // 1. add nums[idx] to sum
      // 2. subtract nums[idx] from sum
    memo[`${idx},${sum}`] = recurse(idx + 1, sum + nums[idx]) + recurse(idx + 1, sum - nums[idx]);
    return memo[`${idx},${sum}`]; // save result in memo and return
  }  
};

// Two test cases to run function on
console.log(findTargetSumWays([1,1,1,1,1], 3)) // 5
console.log(findTargetSumWays([1], 1)) // 1