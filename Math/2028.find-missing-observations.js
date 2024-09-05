// 2028. Find Missing Observations
// You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.
// You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.
// Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.
// The average value of a set of k numbers is the sum of the numbers divided by k.
// Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.


// Solution: Math & Greedy

// Find the remaining sum needed to make the total average equal to `mean`.
// Fill all the missing rolls with 1's initially, then greedily fill them up until the remaining sum becomes 0.

// Time Complexity: O(m + n) 240ms
// Space Complexity: O(n) 69.6MB
function missingRolls(rolls, mean, n) {
  let m = rolls.length, targetSum = mean * (m + n);
  let currSum = 0;
  for (let roll of rolls) {
    currSum += roll;
  }
  let remSum = targetSum - currSum;
  if ((6 * n) < remSum || n > remSum) {
    return [];
  }
  let missing = Array(n).fill(1);
  remSum -= n;
  let i = 0;
  while (remSum > 0) {
    missing[i] += Math.min(5, remSum);
    remSum -= Math.min(5, remSum);
    i++;
  }
  return missing;
};

// Three test cases
console.log(missingRolls([1,2,3,4], 6,4)) // []
console.log(missingRolls([1,5,6], 3, 4)) // [2,3,2,2]
console.log(missingRolls([3,2,4,3], 4, 2)) // [6,6]