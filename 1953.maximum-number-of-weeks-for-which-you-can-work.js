// 1953. Maximum Number of Weeks for Which You Can Work
// There are n projects numbered from 0 to n - 1. You are given an integer array milestones where each milestones[i] denotes the number of milestones the ith project has.
// You can work on the projects following these two rules:
// Every week, you will finish exactly one milestone of one project. You must work every week.
// You cannot work on two milestones from the same project for two consecutive weeks.
// Once all the milestones of all the projects are finished, or if the only milestones that you can work on will cause you to violate the above rules, you will stop working. Note that you may not be able to finish every project's milestones due to these constraints.
// Return the maximum number of weeks you would be able to work on the projects without violating the rules mentioned above.


// If the project with the biggest milestone is smaller than the sum of all the remaining milestones, return the sum of everything.
// Otherwise, return the sum of the remaining milestones times 2 plus 1.

// Algorithm:
// Keep a sum (of all milestones), and biggest (the project with the biggest milestone)
// Loop through milestones to calculate the sum and the max
  // Add milestone to sum
  // Update biggest is milestone is bigger
// If sum - biggest is greater than or equal to biggest, return total sum.
// Otherwise, return remaining (sum - biggest) * 2 + 1.

// Time Complexity: O(n) 137ms
// Space Complexity: O(1) 50.5MB

  var numberOfWeeks = function(milestones) {
    let sum = 0, biggest = 0;
    for (var i = 0; i < milestones.length; i++) sum += milestones[i], biggest = Math.max(biggest, milestones[i]);
    let remaining = sum - biggest;
    if (remaining >= biggest) return sum;
    return remaining * 2 + 1;
  };
  
  // Two test cases to run function on
  console.log(numberOfWeeks([1,2,3])) // 6
  console.log(numberOfWeeks([5,2,1])) // 7