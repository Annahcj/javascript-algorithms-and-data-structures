// 2240. Number of Ways to Buy Pens and Pencils
// You are given an integer total indicating the amount of money you have. You are also given two integers cost1 and cost2 indicating the price of a pen and pencil respectively. You can spend part or all of your money to buy multiple quantities (or none) of each kind of writing utensil.
// Return the number of distinct ways you can buy some number of pens and pencils.


// Solution: Enumeration

// Try every amount of pens while total >= cost1 * pens.
  // Get the maximum amount of pencils we can take: Math.floor((total - cost1 * pens) / cost2).
    // total - cost1 * pens = the money left over to buy pencils
  // From here, we have (max amount of pencils) + 1 number of ways to take pencils. 

// Get the total sum of the number of ways to take pencils for every amount of pens.

// Time Complexity: O(total/cost1) 79ms
// Space Complexity: O(1) 41.8MB
var waysToBuyPensPencils = function(total, cost1, cost2) {
  let pens = 0, totalWays = 0;
  while (total >= cost1 * pens) {
    let maxPencils = Math.floor((total - cost1 * pens) / cost2);
    totalWays += 1 + maxPencils; // +1 for zero pencils
    pens++;
  }
  return totalWays;
};

// Two test cases
console.log(waysToBuyPensPencils(20, 10, 5)) // 9
console.log(waysToBuyPensPencils(5, 10, 10)) // 1