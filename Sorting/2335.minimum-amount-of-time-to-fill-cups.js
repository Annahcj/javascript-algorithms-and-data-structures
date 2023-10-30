// 2335. Minimum Amount of Time to Fill Cups
// You have a water dispenser that can dispense cold, warm, and hot water. Every second, you can either fill up 2 cups with different types of water, or 1 cup of any type of water.
// You are given a 0-indexed integer array amount of length 3 where amount[0], amount[1], and amount[2] denote the number of cold, warm, and hot water cups you need to fill respectively. Return the minimum number of seconds needed to fill up all the cups.


// Solution: Sorting

// Since n is <= 3, we can afford to sort on each iteration.
// If n is bigger, we can use a priority queue to keep track of the biggest amounts so we can avoid sorting the whole array on each iteration.

// n = amount.length (3), m = sum of amount
// Time Complexity: O(m * n log(n)) 79ms
// Space Complexity: O(1) 46.2MB
var fillCups = function(amount) {
  let res = 0;
  amount.sort((a, b) => b - a);
  while (amount[0] > 0) {
    res++;
    amount[0]--;
    amount[1]--;
    amount.sort((a, b) => b - a);
  }
  return res;
};

// Two test cases
console.log(fillCups([1,4,2])) // 4
console.log(fillCups([5,4,4])) // 7