// 2155. All Divisions With the Highest Score of a Binary Array
// You are given a 0-indexed binary array nums of length n. nums can be divided at index i (where 0 <= i <= n) into two arrays (possibly empty) numsleft and numsright:
  // numsleft has all the elements of nums between index 0 and i - 1 (inclusive), while numsright has all the elements of nums between index i and n - 1 (inclusive).
  // If i == 0, numsleft is empty, while numsright has all the elements of nums.
  // If i == n, numsleft has all the elements of nums, while numsright is empty.
// The division score of an index i is the sum of the number of 0's in numsleft and the number of 1's in numsright.
// Return all distinct indices that have the highest possible division score. You may return the answer in any order.


// Solution 1: Prefix Sum Left Zeros & Right Ones

// 1. Prefix sum for left zeros (not including i)
// 2. Prefix sum for right ones (including i)
// 3. Get the max score (max of leftZeros[i] + rightZeros[i])
// 4. Get all the indices with a score equal to the max score

// Time Complexity: O(n) 610ms
// Space Complexity: O(n) 86.3MB
var maxScoreIndices = function(nums) {
  let n = nums.length;
  let leftZeros = Array(n + 1).fill(0), rightOnes = Array(n + 1).fill(0);

  // compute number of zeros left of each i (not including i)
  for (var i = 1; i <= n; i++) {
    let prevZeros = i === 0 ? 0 : leftZeros[i - 1];
    if (nums[i - 1] === 0) leftZeros[i] = prevZeros + 1;
    else leftZeros[i] = prevZeros;
  }
  // compute number of ones right of each i (inclusive)
  for (i = n - 1; i >= 0; i--) {
    let nextOnes = i === n - 1 ? 0 : rightOnes[i + 1];
    if (nums[i] === 0) rightOnes[i] = nextOnes;
    else rightOnes[i] = nextOnes + 1;
  }

  let maxScore = 0;
  for (i = 0; i <= n; i++) {
    maxScore = Math.max(maxScore, leftZeros[i] + rightOnes[i]); // get max score
  }

  let res = [];
  for (i = 0; i <= n; i++) {
    let score = leftZeros[i] + rightOnes[i];
    if (score === maxScore) res.push(i); // get all indices with score equal to max score
  }
  return res;
};

// Solution 2: Count Total Ones, Running Sum of Zeros

// 1. Get the total sum of 1's.
// 2. Calculate the max score and collect the indices while keeping track of the running sum of zeros.

// Time Complexity: O(n) 280ms
// Space Complexity: O(1) 74.9MB
var maxScoreIndices = function(nums) {
  let n = nums.length, ones = 0;
  for (var i = 0; i < n; i++) ones += nums[i];
  let zeros = 0, res = [], maxScore = 0;
  for (i = 0; i <= n; i++) {
    let score = zeros + ones;
    if (score > maxScore) {
      res = [];
      res.push(i);
      maxScore = score;
    } else if (score === maxScore) {
      res.push(i);
    }
    if (i < n) {
      zeros += nums[i] === 0 ? 1 : 0;
      ones -= nums[i] === 1 ? 1 : 0;
    }
  }
  return res;
};

// Three test cases to run function on
console.log(maxScoreIndices([0,0,1,0])) // [2,4]
console.log(maxScoreIndices([0,0,0])) // [3]
console.log(maxScoreIndices([1,1])) // [0]