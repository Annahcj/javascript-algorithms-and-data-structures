// 416. Partition Equal Subset Sum
// Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.


// Solution: Recursion w/ Memoization

// n = nums.length, m = sum of targets / 2
// Time Complexity: O(nm) 156ms
// Space Complexity: O(nm) 55.6MB
var canPartition = function(nums) {
  let totalSum = 0;
  for (var num of nums) totalSum += num;
  if (totalSum % 2 !== 0) return false; // if the totalSum is not divisible by 2, it's impossible.
  let target = totalSum / 2;
  let memo = new Map();
  return recurse(target, 0);

  function recurse(sum, idx) {
    if (sum === 0) return true; // found a subset with sum equal to totalSum / 2
    if (sum < 0 || idx === nums.length) return false; // out of bounds, can't progress further
    if (memo.has(`${sum},${idx}`)) return memo.get(`${sum},${idx}`); // if memo already contains, return what was recorded in memo
    //            take item, move forward    OR     skip item, move forward
    let ans = recurse(sum - nums[idx], idx + 1) || recurse(sum, idx + 1);
    memo.set(`${sum},${idx}`, ans); // save in memo
    return ans; // return for earlier calls
  }
};

// Two test cases to run function on
console.log(canPartition([1,5,11,5])) // true
console.log(canPartition([1,2,3,5])) // false