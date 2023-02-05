// 2561. Rearranging Fruits
// You have two fruit baskets containing n fruits each. You are given two 0-indexed integer arrays basket1 and basket2 representing the cost of fruit in each basket. You want to make both baskets equal. To do so, you can use the following operation as many times as you want:
  // Chose two indices i and j, and swap the ith fruit of basket1 with the jth fruit of basket2.
  // The cost of the swap is min(basket1[i],basket2[j]).
// Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.
// Return the minimum cost to make both the baskets equal or -1 if impossible.


// Solution: Greedy - Counting & Sorting

// 1. Get the difference between occurances in basket1 and basket2.
// 2. Go through the difference counts.
  // If the difference is not divisible by 2, then it is impossible to distribute them evenly across two baskets.
  // Otherwise, add the number (differenceCount number of times) to an array "values".
// 3. Sort the values in asc order.
// 4. Go through the first half of the values. 
  // We only need to consider the first half since the smaller numbers will always be the minimum of each pair.
  // Take the minimum cost out of two options to swap a pair:
    // 1. Swap the pair. The cost will be min(value1, value2) since we swap them with each other.
    // 2. Swap the two values with the minimum value across basket1 and basket2. The cost will be minValue * 2 since we swap them separately.

// n = length of basket1 and basket2
// Time Complexity: O(n log(n)) 140ms
// Space Complexity: O(n) 65.4MB
var minCost = function(basket1, basket2) {
  let n = basket1.length, diffCount = {}, minValue = Infinity;
  for (let i = 0; i < n; i++) {
    diffCount[basket1[i]] = (diffCount[basket1[i]] || 0) + 1;
    diffCount[basket2[i]] = (diffCount[basket2[i]] || 0) - 1;
    minValue = Math.min(minValue, basket1[i], basket2[i]);
  }
  let values = [];
  for (let num in diffCount) {
    let diff = Math.abs(diffCount[num]);
    if (diff % 2 !== 0) return -1;
    num = Number(num);
    for (let i = 0; i < diff / 2; i++) {
      values.push(num);
    }
  }
  values.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < values.length / 2; i++) {
    ans += Math.min(values[i], minValue * 2);
  }
  return ans;
};

// Two test cases
console.log(minCost([4,2,2,2], [1,4,1,2])) // 1
console.log(minCost([2,3,4,1], [3,2,5,1])) // -1