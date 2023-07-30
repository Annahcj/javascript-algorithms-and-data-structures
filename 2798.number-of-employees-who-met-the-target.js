// 2798. Number of Employees Who Met the Target
// There are n employees in a company, numbered from 0 to n - 1. Each employee i has worked for hours[i] hours in the company.
// The company requires each employee to work for at least target hours.
// You are given a 0-indexed array of non-negative integers hours of length n and a non-negative integer target.
// Return the integer denoting the number of employees who worked at least target hours.


// Solution: Count the number of employees with hours[i] >= target.

// n = number of employees
// Time Complexity: O(n) 48ms
// Space Complexity: O(1) 43.9MB
var numberOfEmployeesWhoMetTarget = function(hours, target) {
  return hours.reduce((count, h) => h >= target ? count + 1 : count, 0);
};

// Two test cases
console.log(numberOfEmployeesWhoMetTarget([0,1,2,3,4], 2)) // 3
console.log(numberOfEmployeesWhoMetTarget([5,1,4,2,2], 6)) // 0