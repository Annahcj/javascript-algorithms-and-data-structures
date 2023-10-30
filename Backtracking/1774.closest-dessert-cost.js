// 1774. Closest Dessert Cost
// You would like to make dessert and are preparing to buy the ingredients. You have n ice cream base flavors and m types of toppings to choose from. You must follow these rules when making your dessert:
  // There must be exactly one ice cream base.
  // You can add one or more types of topping or have no toppings at all.
  // There are at most two of each type of topping.
// You are given three inputs:
  // baseCosts, an integer array of length n, where each baseCosts[i] represents the price of the ith ice cream base flavor.
  // toppingCosts, an integer array of length m, where each toppingCosts[i] is the price of one of the ith topping.
  // target, an integer representing your target price for dessert.
// You want to make a dessert with a total cost as close to target as possible.
// Return the closest possible cost of the dessert to target. If there are multiple, return the lower one.


// Solution: Backtracking

// Try all the combinations of toppings (0 - 2 portions) with each of the base types.

// n = baseCosts.length, m = toppingCosts.length
// Time Complexity: O(3^m * n) 145ms
  // 3 choices for each m toppings: 3 * 3 * 3 * 3 * ...
  // There are n bases we can choose from, so 3^m * n
// Space Complexity: O(m) 41.7MB
var closestCost = function(baseCosts, toppingCosts, target) {
  let res = Infinity;
  for (let i = 0; i < baseCosts.length; i++) {
    backtrack(0, baseCosts[i]);
  }
  return res;
  
  function backtrack(index, cost) {
    if (index === toppingCosts.length) {
      let diff = Math.abs(cost - target);
      let bestDiff = Math.abs(res - target);
      if ((diff < bestDiff) || (diff === bestDiff && cost < res)) res = cost;
      return;
    }
    for (let i = 0; i < 3; i++) {
      backtrack(index + 1, cost + toppingCosts[index] * i);
    }
  }
};

// Two test cases
console.log(closestCost([1,7], [3,4], 10)) // 10
console.log(closestCost([2,3], [4,5,100], 18)) // 17