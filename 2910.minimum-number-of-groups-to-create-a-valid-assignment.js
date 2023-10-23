// 2910. Minimum Number of Groups to Create a Valid Assignment
// You are given a 0-indexed integer array nums of length n.
// We want to group the indices so for each index i in the range [0, n - 1], it is assigned to exactly one group.
// A group assignment is valid if the following conditions hold:
  // For every group g, all indices i assigned to group g have the same value in nums.
  // For any two groups g1 and g2, the difference between the number of indices assigned to g1 and g2 should not exceed 1.
// Return an integer denoting the minimum number of groups needed to create a valid group assignment.


// Solution: Counting & Greedy

// 1. Count the occurances of each number.
// 2. Find the minimum count.
// 3. Go through each possible group size (<= minimum count), and return the maximum group size such that each count can be split into groups of size `groupSize` and `groupSize - 1`.
  // To check whether a count can be split into groups of size `groupSize` and `groupSize - 1`: Try each possible count of groups with size `groupSize` and check whether the remaining count is divisible by `groupSize - 1`.

// k = minimum count
// Time Complexity: O(n * k^2) 255ms
// Space Complexity: O(n) 83.4MB
var minGroupsForValidAssignment = function(nums) {
  let n = nums.length, count = {};
  for (let num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  let minCount = Infinity;
  for (let num in count) {
    minCount = Math.min(minCount, count[num]);
  }
  for (let groupSize = minCount + 1; groupSize >= 2; groupSize--) { // larger group size, i.e: (groupSize, groupSize - 1)
    let totalGroups = 0, possible = true;
    for (let num in count) {
      let groups = getGroups(count[num], groupSize);
      if (groups === -1) {
        possible = false;
        break;
      }
      totalGroups += groups;
    }
    if (!possible) continue;
    return totalGroups;
  }
  return n;
};

// Find the largest count1 where count1 * size + count2 * (size - 1) = freq.
function getGroups(freq, size) { // split freq into group sizes (size - 1, size)
  for (let count1 = Math.floor(freq / size); count1 >= 0; count1--) { // count1 = number of groups with size `size`
    let remaining = freq - count1 * size;
    if (remaining % (size - 1) === 0) {
      let count2 = remaining / (size - 1);
      return count1 + count2;
    }
  }
  return -1;
}

// Two test cases
console.log(minGroupsForValidAssignment([3,2,3,2,3])) // 2
console.log(minGroupsForValidAssignment([10,10,10,3,1,1])) // 4