// 135. Candy
// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.
// You are giving candies to these children subjected to the following requirements:
  // Each child must have at least one candy.
  // Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.


// Solution: Two Pass

// 1. Left to right: calculate the minimum candies to be more than left neighbor (who has higher rating).
// 2. Right to left: calculate the minimum candies to be more than right neighbor (who has higher rating).
// 3. [Part of the second loop]: Calculate the sum of max(left[i], right[i]).

// e.g: [2,1,2,3]
// l:   [1,1,2,3]
// r:   [2,1,1,1]
// max: [2,1,2,3], sum = 8

// Time Complexity: O(n) 126ms
// Space Complexity: O(n) 47.1MB
var candy = function(ratings) {
  let n = ratings.length;
  let left = Array(n).fill(1), right = Array(n).fill(1);
  for (var i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) left[i] = left[i - 1] + 1;
  }
  
  let ans = Math.max(left[n - 1], 1);
  for (i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) right[i] = right[i + 1] + 1;
    ans += Math.max(left[i], right[i]);
  }
  return ans;
};

// Two test cases to run function on
console.log(candy([1,0,2])) // 5
console.log(candy([1,2,2])) // 4