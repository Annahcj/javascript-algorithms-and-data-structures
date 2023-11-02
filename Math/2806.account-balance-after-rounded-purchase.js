// 2806. Account Balance After Rounded Purchase
// Initially, you have a bank account balance of 100 dollars.
// You are given an integer purchaseAmount representing the amount you will spend on a purchase in dollars.
// At the store where you will make the purchase, the purchase amount is rounded to the nearest multiple of 10. In other words, you pay a non-negative amount, roundedAmount, such that roundedAmount is a multiple of 10 and abs(roundedAmount - purchaseAmount) is minimized.
// If there is more than one nearest multiple of 10, the largest multiple is chosen.
// Return an integer denoting your account balance after making a purchase worth purchaseAmount dollars from the store.
// Note: 0 is considered to be a multiple of 10 in this problem.


// Solution:

// We need to round the purchaseAmount to the nearest multiple of 10.
// Divide purchaseAmount by 10, and use Math.round() to round to the nearest whole number.
// Multiply it by 10 to get the purchaseAmount rounded to the nearest multiple of 10.

// Time Complexity: O(1) 55ms
// Space Complexity: O(1) 41.2MB
var accountBalanceAfterPurchase = function(purchaseAmount) {
  return 100 - Math.round(purchaseAmount / 10) * 10;  
};