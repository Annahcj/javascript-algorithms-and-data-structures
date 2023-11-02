// 2028. Find Missing Observations
// You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.
// You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.
// Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.
// The average value of a set of k numbers is the sum of the numbers divided by k.
// Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.


// Solution: 

// Let mSum = the sum of m/rolls
// Find the sum needed for n -> mean * (n + m) - mSum
// Let smaller be nSum / n rounded down;

// Edge case: If nSum is smaller than n (that means each value will be less than 1) or nSum is bigger than 6 * n (that means each value will be bigger than 6), return [] (impossible)

// Create our result array res, with length n, filled with Math.floor(nSum / n)
// Then, calculate the how many numbers need to have 1 more added to it (mod) -> nSum % n
// Loop through from 0 to mod
  // increment res[i] by 1
  
// Return res

// Time Complexity: O(n) 380ms
// Space Complexity: O(1) 61MB (O(n) is required for our answer)
var missingRolls = function(rolls, mean, n) {
  let m = rolls.length, mSum = 0;
  for (let num of rolls) {
    mSum += num;
  }
  let nSum = mean * (n + m) - mSum;
  let smaller = Math.floor(nSum / n);

  if (nSum < n || nSum > 6 * n) return [];

  let res = Array(n).fill(smaller), mod = nSum % n;
  for (let i = 0; i < mod; i++) {
    res[i]++;
  }
  return res; 
};

// Four test cases
console.log(missingRolls([6,3,4,3,5,3],1,6)) // []
console.log(missingRolls([1,2,3,4], 6,4)) // []
console.log(missingRolls([3,2,4,3], 4, 2)) // [6,6]
console.log(missingRolls([1,5,6], 3, 4)) // [2,3,2,2]