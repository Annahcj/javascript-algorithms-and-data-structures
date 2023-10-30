// 2790. Maximum Number of Groups With Increasing Length
// You are given a 0-indexed array usageLimits of length n.
// Your task is to create groups using numbers from 0 to n - 1, ensuring that each number, i, is used no more than usageLimits[i] times in total across all groups. You must also satisfy the following conditions:
  // Each group must consist of distinct numbers, meaning that no duplicate numbers are allowed within a single group.
  // Each group (except the first one) must have a length strictly greater than the previous group.
// Return an integer denoting the maximum number of groups you can create while satisfying these conditions.


// Solution: Binary Search & Line Sweep 

// Binary search for the maximum group size possible based on usageLimits.
// To check whether a group size is possible,
  // Keep track of an array `decrease`. This is used to decrease a range in O(1) time complexity.
  // Loop through each i from groupSize to 1,
    // Update decrease[n - i]-- (this is greedily taking from the last i usageLimits)
  // At the end, accumulate decrease[i] to get the real amount of decrease for each group.
  // Then, accumulate the accumulated decrease[i] with usageLimits[i].
  // If the sum is negative at any point, it is not possible with this amount of groups.

// Reasoning:
  // For each group i, we greedily take from the last i usageLimits.
  // When we accumulate this at the end, any smaller usage limits can fill in the gaps for groups taken from the last i groups.

// Proof: How do we ensure do duplicates are taken from the earlier smaller groups if we just rely on the sum?
  // Because we sort usageLimits in asc order, we are guaranteed to be able to use any combination of the smaller usage limits on the left to satisfy groups without having duplicates. This is true because the left usage limits will never be bigger than any group size, because if they are that means the groups on the right would be enough to satisfy the group sizes, because usageLimits will be sorted.
  // Simulation example of how numbers are used for groups:
  // e.g: usageLimits = [2,2,3], groups = 3
    // groupSize = 3: usageLimits = [1,1,2] 
    // groupSize = 2: usageLimits = [1,0,1]
    // groupSize = 1: usageLimits = [1,0,0]
  // e.g: usageLimits = [2,2,2], groups = 3
    // groupSize = 3: usageLimits = [1,1,1]
    // groupSize = 2: usageLimits = [1,0,0]
    // groupSize = 1: usageLimits = [1,0,-1] (for this group, we can use usageLimits[0] to satisfy the last group)

// Example based on how the code works:
  // e.g: usageLimits = [2,2,2], groups = 3
    // groupSize = 3, decrease = [-1,0,0]
    // groupSize = 2, decrease = [-1,-1,0]
    // groupSize = 1, decrease = [-1,-1,-1]
    // accumulate decrease: [-1,-1,-1] -> [-1,-2,-3] (real amount to deduct from each group)
    // accumulate accumulated decrease with usageLimits: [-1,-2,-3] + [2,2,2] = [1,0,-1] = accumulated [1,0,0]

// Time Complexity: O(n log(n)) 286ms
// Space Complexity: O(n) 68.3MB
var maxIncreasingGroups = function(usageLimits) {
  usageLimits.sort((a, b) => a - b);
  let n = usageLimits.length, low = 0, high = n;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(usageLimits, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isEnough(usageLimits, groupSize) {
  let n = usageLimits.length, decrease = Array(n).fill(0);
  for (let i = groupSize; i >= 1; i--) {
    decrease[n - i]--;
  }
  let sum = 0, decreaseSum = 0;
  for (let i = 0; i < n; i++) {
    decreaseSum += decrease[i];
    sum += usageLimits[i] + decreaseSum;
    if (sum < 0) return false;
  }
  return true;
}

// Three test cases
console.log(maxIncreasingGroups([1,2,5])) // 3
console.log(maxIncreasingGroups([2,1,2])) // 2
console.log(maxIncreasingGroups([1,1])) // 1