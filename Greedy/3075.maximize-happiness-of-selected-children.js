// 3075. Maximize Happiness of Selected Children
// You are given an array happiness of length n, and a positive integer k.
// There are n children standing in a queue, where the ith child has happiness value happiness[i]. You want to select k children from these n children in k turns.
// In each turn, when you select a child, the happiness value of all the children that have not been selected till now decreases by 1. Note that the happiness value cannot become negative and gets decremented only if it is positive.
// Return the maximum sum of the happiness values of the selected children you can achieve by selecting k children.


// Solution: Greedy w/ Sorting

// It's optimal to pick the k children with the greatest happiness.
// Sort happiness in desc order and pick the first k children.
// At each turn i, subtract i from happiness[i].

// Time Complexity: O(n log(n)) 248ms
// Space Complexity: O(log(n)) (space for sorting) 67.2MB
var maximumHappinessSum = function(happiness, k) {
  happiness.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < k; i++) {
    ans += Math.max(0, happiness[i] - i);
  }
  return ans;
};

// Three test cases
console.log(maximumHappinessSum([1,2,3], 2)) // 4
console.log(maximumHappinessSum([1,1,1,1], 2)) // 1
console.log(maximumHappinessSum([2,3,4,5], 1)) // 5