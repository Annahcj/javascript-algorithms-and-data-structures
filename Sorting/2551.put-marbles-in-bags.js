// 2551. Put Marbles in Bags
// You have k bags. You are given a 0-indexed integer array weights where weights[i] is the weight of the ith marble. You are also given the integer k.
// Divide the marbles into the k bags according to the following rules:
  // No bag is empty.
  // If the ith marble and jth marble are in a bag, then all marbles with an index between the ith and jth indices should also be in that same bag.
  // If a bag consists of all the marbles with an index from i to j inclusively, then the cost of the bag is weights[i] + weights[j].
// The score after distributing the marbles is the sum of the costs of all the k bags.
// Return the difference between the maximum and minimum scores among marble distributions.

// We need to find maximum and minimum scores splitting the array into k subarrays.
// Collect each weight[i] + weights[i + 1] into an array splitScores. This signifies a split between two subarrays.
// Sort splitScores in desc order and take the k - 1 maximum values and k - 1 minimum values to get the maximum and minimum scores.
// Note: We must take the start and end of the array, since they are the outer edges of the first and last subarray.


// Solution: Greedy w/ Sorting 

// We need to find maximum and minimum scores splitting the array into k subarrays.
// Collect each weight[i] + weights[i + 1] into an array splitScores. This signifies a split between two subarrays.
  // weight[i] = score for end index of a subarray
  // weight[i + 1] = score for start index of the next subarray
// Sort splitScores and take the k - 1 maximum values and k - 1 minimum values to get the maximum and minimum scores.
// Note: We must take the start and end of the array, since they are the outer edges of the first and last subarray.

// Time Complexity: O(n log(n)) 250ms
// Space Complexity: O(n) 59.7MB
var putMarbles = function(weights, k) {
  let n = weights.length, splitScores = [];
  for (let i = 0; i < n - 1; i++) {
    splitScores.push(weights[i] + weights[i + 1]);
  }
  splitScores.sort((a, b) => a - b);
  let scoreDiff = 0;
  for (let i = 0; i < k - 1; i++) {
    scoreDiff += splitScores[splitScores.length - i - 1] - splitScores[i];
  }
  return scoreDiff;
};

// Two test cases
console.log(putMarbles([1,3,5,1], 2)) // 4
console.log(putMarbles([1,3], 2)) // 0