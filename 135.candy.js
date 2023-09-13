// 135. Candy
// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
// You are giving candies to these children subjected to the following requirements:
  // Each child must have at least one candy.
  // Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.


// Solution: Two Passes

// Go through ratings in two passes, 
  // From left to right, satisfy ascending ratings (ratings[i] > ratings[i - 1], e.g: [1,2])
  // From right to left, satisfy ascending ratings (ratings[i] > ratings[i + 1], e.g: [2,1])
  // When doing the second pass, take the maximum value out of the two passes.

// e.g: [2,1,2,3]
// l:   [1,1,2,3]
// r:   [2,1,2,3]
// sum = 8

// Doubt: 
  // It can seem like we could possibly override the left results when going from right to left, but in fact only the peaks of the mountains change (places where ratings[i] > ratings[i - 1] will never change on the second pass)
  // If only the peaks of the mountains change, then the condition of ratings[i] > ratings[i - 1] will still be met because the mountain peak getting bigger will only satisfy this condition even more.

// Time Complexity: O(n) 61ms
// Space Complexity: O(n) 45.9MB
var candy = function(ratings) {
  let n = ratings.length, left = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1;
    }
  }
  let right = left[n - 1], candies = right;
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right = Math.max(right + 1, left[i]);
    } else {
      right = Math.max(1, left[i]);
    }
    candies += right;
  }
  return candies;
};

// Two test cases
console.log(candy([1,0,2])) // 5
console.log(candy([1,2,2])) // 4