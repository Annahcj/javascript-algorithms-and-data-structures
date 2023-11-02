// 1491. Average Salary Excluding the Minimum and Maximum Salary
// You are given an array of unique integers salary where salary[i] is the salary of the ith employee.
// Return the average salary of employees excluding the minimum and maximum salary. Answers within 10^-5 of the actual answer will be accepted.


// Solution: 

// Get the total sum, the minimum, and the maximum salary.
// Return the total sum - minimum salary - maximum salary divided by n-2.

// Time Complexity: O(n) 50ms
// Space Complexity: O(1) 42.1MB
var average = function(salary) {
  let sum = 0, min = salary[0], max = salary[0], n = salary.length;
  for (let i = 0; i < n; i++) {
    sum += salary[i];
    min = Math.min(min, salary[i]);
    max = Math.max(max, salary[i]);
  }
  return (sum - min - max) / (n - 2);
};

// Two test cases
console.log(average([4000,3000,1000,2000])) // 2500
console.log(average([1000,2000,3000])) // 2000