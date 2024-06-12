// 3180. Maximum Total Reward Using Operations I
// You are given an integer array rewardValues of length n, representing the values of rewards.
// Initially, your total reward x is 0, and all indices are unmarked. You are allowed to perform the following operation any number of times:
  // Choose an unmarked index i from the range [0, n - 1].
  // If rewardValues[i] is greater than your current total reward x, then add rewardValues[i] to x (i.e., x = x + rewardValues[i]), and mark the index i.
// Return an integer denoting the maximum total reward you can collect by performing the operations optimally.


// Solution: DP

// Given we will pick a certain subset of rewardValues, it's always optimal to pick these in ascending order to ensure the smallest sum before we pick each value.
// Sort rewardValues in asc order.

// Keep track of all the possible sums of rewardValues, as long as the sum is smaller than or equal to the maximum rewardValue 
  // (Once the sum goes over the maximum rewardValue, we can't add any more to the sum anyway).
// Although we don't store sums that exceed the maximum rewardValue, we still need to record the maximum sum for our final answer.

// Use a hashset to store the running sums, and as we go through each rewardValue, 
  // Try to create any sums that we don't already have in the set.
  // Iterate through each previous sum <= rewardValues[i] - 1, since we can only take rewardValues[i] is the sum is smaller.

// n = length of rewardValues, m = max(rewardValues[i])
// Time Complexity: O(n log(n) + nm)
// Space Complexity: O(m)
var maxTotalReward = function(rewardValues) {
  rewardValues.sort((a, b) => a - b);
  let n = rewardValues.length, maxVal = rewardValues[n - 1];
  let sums = new Set([0]), ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = rewardValues[i] - 1; j >= 0; j--) {
      if (sums.has(j)) {
        let newSum = j + rewardValues[i];
        ans = Math.max(ans, newSum);
        if (newSum <= maxVal) sums.add(newSum);
      }
    }
  }
  return ans;
};

// Two test cases
console.log(maxTotalReward([1,1,3,3])) // 4
console.log(maxTotalReward([1,6,4,3,2])) // 11