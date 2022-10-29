// 1014. Best Sightseeing Pair
// You are given an integer array values where values[i] represents the value of the ith sightseeing spot. Two sightseeing spots i and j have a distance j - i between them.
// The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j: the sum of the values of the sightseeing spots, minus the distance between them.
// Return the maximum score of a pair of sightseeing spots.


// Solution: 

// Keep track of the best index i we have come across so far.
// An index i is better than an index j if the difference between them is larger than the distance between them.
// e.g: [8,1,5]
  // The best index i in this array is 8.
  // If we compare the pair (0, 2), values[i] - values[j] (8 - 5) > j - i (2 - 0).
// Try every index j and record the maximum (values[i] - values[j] < j - i).

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 46.5MB
var maxScoreSightseeingPair = function(values) {
  let n = values.length, i = 0, maxScore = 0;
  for (let j = 1; j < n; j++) {
    let score = values[i] + values[j] + i - j;
    maxScore = Math.max(maxScore, score);
    if (values[i] - values[j] < j - i) i = j;
  }
  return maxScore;
};

// Two test cases
console.log(maxScoreSightseeingPair([8,1,5,2,6])) // 11
console.log(maxScoreSightseeingPair([1,2])) // 2