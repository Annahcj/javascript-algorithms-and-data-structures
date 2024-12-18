// 1475. Final Prices With a Special Discount in a Shop
// You are given an integer array prices where prices[i] is the price of the ith item in a shop.
// There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.
// Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.

 
// Solution: Monotonic Stack

// Maintain a monotonic increasing stack of prices.
// Iterate through prices from left-to-right.
// For every prices[i], pop prices off the top of the stack while prices[stack[stack.length - 1]] >= prices[i].
// prices[j] is the closest smaller price for prices[stack[stack.length - 1]].

// n = length of prices
// Time Complexity: O(n) 2ms
// Space Complexity: O(n) 52MB
function finalPrices(prices) {
  const n = prices.length, stack = [];
  const answer = [...prices];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && prices[stack[stack.length - 1]] >= prices[i]) {
      const lastIndex = stack.pop();
      answer[lastIndex] = prices[lastIndex] - prices[i];
    }
    stack.push(i);
  }
  return answer;
};

// Three test cases
console.log(finalPrices([8,4,6,2,3])) // [4,2,4,2,3]
console.log(finalPrices([1,2,3,4,5])) // [1,2,3,4,5]
console.log(finalPrices([10,1,1,6])) // [9,0,1,6]