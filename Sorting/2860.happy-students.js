// 2860. Happy Students
// You are given a 0-indexed integer array nums of length n where n is the total number of students in the class. The class teacher tries to select a group of students so that all the students remain happy.
// The ith student will become happy if one of these two conditions is met:
  // The student is selected and the total number of selected students is strictly greater than nums[i].
  // The student is not selected and the total number of selected students is strictly less than nums[i].
// Return the number of ways to select a group of students so that everyone remains happy.


// Solution: Sorting 

// Observation: When taking a number of students, 
  // 1. Each student taken must have nums[i] smaller than the group size
  // 2. Each student not taken must have nums[i] greater than the group size

// We can observe that we need to sort nums, because it's optimal to take students that have a smaller nums[i] 
  // (e.g: if the group size is 5, we want to take the 5 students with the smallest nums[i] so that the first condition has a greater chance of being met) 
// Go through each group size: students on the left are taken, students on the right are not taken.
  // If nums[i] < group size and nums[i + 1] > group size, then we have a valid group.

// Time Complexity: O(n log(n)) 106ms
// Space Complexity: O(log(n)) (space for sorting) 53.3MB
var countWays = function(nums) {
  nums.sort((a, b) => a - b);
  let ways = nums[0] > 0 ? 1 : 0, n = nums.length;
  for (let i = 0; i < n; i++) {
    let groupSize = i + 1;
    let nextLimit = i === n - 1 ? Infinity : nums[i + 1];
    if (groupSize > nums[i] && groupSize < nextLimit) {
      ways++;
    }
  }
  return ways;
};

// Two test cases
console.log(countWays([1,1])) // 2
console.log(countWays([6,0,3,3,6,7,2,7])) // 3