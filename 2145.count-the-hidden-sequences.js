// 2145. Count the Hidden Sequences
// You are given a 0-indexed array of n integers differences, which describes the differences between each pair of consecutive integers of a hidden sequence of length (n + 1). More formally, call the hidden sequence hidden, then we have that differences[i] = hidden[i + 1] - hidden[i].
// You are further given two integers lower and upper that describe the inclusive range of values [lower, upper] that the hidden sequence can contain.
  // For example, given differences = [1, -3, 4], lower = 1, upper = 6, the hidden sequence is a sequence of length 4 whose elements are in between 1 and 6 (inclusive).
    // [3, 4, 1, 5] and [4, 5, 2, 6] are possible hidden sequences.
    // [5, 6, 3, 7] is not possible since it contains an element greater than 6.
    // [1, 2, 3, 4] is not possible since the differences are not correct.
// Return the number of possible hidden sequences there are. If there are no possible sequences, return 0.


// Solution: Math Logic

// Keep a running sum of differences, record the minimum and maximum states of the sum.

// The answer is Math.max(0, (higher - max) - (lower - min))
  // lower - min = the minimum starting value so that the minimum value doesn't ever go lower than the minimum state
  // higher - max = the maximum starting value so that the maximum value doesn't ever go higher than the maximum state

// Time Complexity: O(n) 130ms
// Space Complexity: O(1) 53.6MB
var numberOfArrays = function(differences, lower, upper) {
  let n = differences.length, sum = 0;
  let min = 0, max = 0;
  for (let i = n - 1; i >= 0; i--) {
    sum += differences[i];
    min = Math.min(min, sum);
    max = Math.max(max, sum);
  }
  return Math.max(0, (upper - max) - (lower - min) + 1);
};

// Three test cases
console.log(numberOfArrays([1,-3,4], 1, 6)) // 2
console.log(numberOfArrays([3,-4,5,1,-2], -4, 5)) // 4
console.log(numberOfArrays([4,-7,2], 3, 6)) // 0