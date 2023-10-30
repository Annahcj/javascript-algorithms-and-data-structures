// 2861. Maximum Number of Alloys
// You are the owner of a company that creates alloys using various types of metals. There are n different types of metals available, and you have access to k machines that can be used to create alloys. Each machine requires a specific amount of each metal type to create an alloy.
// For the ith machine to create an alloy, it needs composition[i][j] units of metal of type j. Initially, you have stock[i] units of metal type i, and purchasing one unit of metal type i costs cost[i] coins.
// Given integers n, k, budget, a 1-indexed 2D array composition, and 1-indexed arrays stock and cost, your goal is to maximize the number of alloys the company can create while staying within the budget of budget coins.
// All alloys must be created with the same machine.
// Return the maximum number of alloys that the company can create.


// Solution: Binary Search 

// Binary search for the maixmum number of alloys.
// To check whether a number of alloys (x) is viable, 
// go through each machine and check whether it's possible to create x alloys based on the composition, stock, cost, and budget.

// k = number of machines, n = number of metals, m = max possible alloys (max(stocks[i]) + budget)
// Time Complexity: O(kn log(m)) 72ms
// Space Complexity: O(1) 45MB
var maxNumberOfAlloys = function(n, k, budget, composition, stock, cost) {
  let maxStock = Math.max(...stock) + budget;
  let low = 0, high = maxStock;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isPossible(n, k, budget, composition, stock, cost, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isPossible(n, k, budget, composition, stock, cost, alloys) {
  for (let i = 0; i < k; i++) {
    let budgetUsed = 0, machineCanHandle = true;
    for (let j = 0; j < n; j++) {
      let need = Math.max(composition[i][j] * alloys, stock[j]) - (stock[j]);
      let currCost = need * cost[j];
      if (budgetUsed + currCost > budget) {
        machineCanHandle = false;
        break;
      }
      budgetUsed += currCost;
    }
    if (machineCanHandle) return true;
  }
  return false;
}

// Two test cases
console.log(maxNumberOfAlloys(3, 2, 15, [[1,1,1],[1,1,10]], [0,0,0], [1,2,3])) // 2
console.log(maxNumberOfAlloys(2, 3, 10, [[2,1],[1,2],[1,1]], [1,1], [5,5])) // 2