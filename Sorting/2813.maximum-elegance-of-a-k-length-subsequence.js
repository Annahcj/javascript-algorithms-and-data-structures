// 2813. Maximum Elegance of a K-Length Subsequence
// You are given a 0-indexed 2D integer array items of length n and an integer k.
// items[i] = [profit[i], category[i]], where profiti and categoryi denote the profit and category of the ith item respectively.
// Let's define the elegance of a subsequence of items as total_profit + distinct_categories^2, where total_profit is the sum of all profits in the subsequence, and distinct_categories is the number of distinct categories from all the categories in the selected subsequence.
// Your task is to find the maximum elegance from all subsequences of size k in items.
// Return an integer denoting the maximum elegance of a subsequence of items with size exactly k.
// Note: A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order.


// Solution: Greedy w/ Sorting 

// Sort items by profit in desc order.
// Initially, take the first k items with the most profit.
// Keep track of:
  // the number of unique categories for the current k items
  // the duplicate items sorted by profit

// After we take k items, try to add the rest of the items one by one by greatest profit first.
  // If we already have an item with the same category, don't add it since there will be no increase in points even if we add it (the number of categories will stay the same, but we end up needing to remove an item with greater profit).
  // If the item has a new category, we should take the item and remove a duplicate item with the least profit.

// Reasoning: We start off with the k maximum profit items, then we greedily try to add more categories as we go. We are basically trying each amount of unique categories with the maximum profit possible.

// n = number of items
// Time Complexity: O(n log(n)) 267ms
// Space Complexity: O(n) 77.1MB
var findMaximumElegance = function(items, k) {
  items.sort((a, b) => b[0] - a[0]);
  let duplicates = [], count = new Map();
  let currProfit = 0, maxProfit = 0;
  for (let i = 0; i < items.length; i++) {
    let [profit, category] = items[i];
    if (i < k) {
      currProfit += profit;
      count.set(category, (count.get(category) || 0) + 1);
      if (count.get(category) > 1) duplicates.push(items[i]);
    } else {
      if (!count.get(category) && duplicates.length) {
        count.set(category, 1);
        currProfit += profit;
        let [duplicateProfit, duplicateCategory] = duplicates.pop();
        currProfit -= duplicateProfit;
        count.set(duplicateCategory, count.get(duplicateCategory) - 1);
      } 
    }
    maxProfit = Math.max(maxProfit, currProfit + count.size ** 2);
  }
  return maxProfit;
};

// Three test cases
console.log(findMaximumElegance([[3,2],[5,1],[10,1]], 2)) // 17
console.log(findMaximumElegance([[3,1],[3,1],[2,2],[5,3]], 3)) // 19
console.log(findMaximumElegance([[1,1],[2,1],[3,1]], 3)) // 7