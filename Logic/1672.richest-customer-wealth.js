// 1672. Richest Customer Wealth
// You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the i​​​​​​​​​​​th​​​​ customer has in the j​​​​​​​​​​​th​​​​ bank. Return the wealth that the richest customer has.
// A customer's wealth is the amount of money they have in all their bank accounts. The richest customer is the customer that has the maximum wealth.


// Solution 1: Find Max Sum of Rows

// For each row in accounts, find the sum. 
// Get the max sum.

// Time Complexity: O(mn) 101ms
// Space Complexity: O(1) 42.2MB
var maximumWealth = function(accounts) {
  let max = 0;
  for (let i = 0; i < accounts.length; i++) {
    let sum = 0;
    for (let j = 0; j < accounts[0].length; j++) sum += accounts[i][j];
    max = Math.max(max, sum);
  }
  return max;
};

// Solution 2: One Liner using Higher-Order Functions

// Time Complexity: O(mn) 102ms
// Space Complexity: O(m) 41.6MB
var maximumWealth = function(accounts) {
  return Math.max(...accounts.map(row => row.reduce((prev, amount) => prev + amount), 0));
};

// Two test cases
console.log(maximumWealth([[1,2,3],[3,2,1]])) // 6
console.log(maximumWealth([[1,5],[7,3],[3,5]])) // 10