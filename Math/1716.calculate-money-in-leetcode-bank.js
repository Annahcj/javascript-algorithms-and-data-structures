// 1716. Calculate Money in Leetcode Bank
// Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.
// He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, he will put in $1 more than the day before. On every subsequent Monday, he will put in $1 more than the previous Monday.
// Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day.


// Solution 1: Math

// Pattern
  // Week 1: 1 2 3 4 5 6 7 (28)
  // Week 2: 2 3 4 5 6 7 8 (35)
  // Week 3: 3 4 5 6 7 8 9 (42)
  // ...

// Using the formula (n * (n + 1)) / 2, we can find the sum of 1 to n in constant time complexity.
// For every week, the money we get is the sum of (the week start, ..., week start + 7).

// Time Complexity: O(n / 7) 57ms
// Space Complexity: O(1) 42.3MB
var totalMoney = function(n) {
  let ans = 0;
  for (let day = 1; day <= n; day += 7) {
    let weekStart = Math.ceil(day / 7);
    let daysInWeek = Math.min(7, n - day + 1);
    ans += sumOf1ToN(weekStart + daysInWeek - 1) - sumOf1ToN(weekStart - 1);
  }
  return ans;
};


// Solution 2: Math - O(1)

// Pattern
  // Week 1: 1 2 3 4 5 6 7 (28)
  // Week 2: 2 3 4 5 6 7 8 (35)
  // Week 3: 3 4 5 6 7 8 9 (42)
  // ...

// Using the formula (n * (n + 1)) / 2, we can find the sum of 1 to n in constant time complexity.
// Observe that every week, we gain exactly 7 dollars more than the previous week.
// Let's call these additional dollars "extra" dollars.
// Each week has a "base" amount of 28 dollars, plus 7 more than the extra from the previous week.
// Since the extra dollars are multiples of 7, we can use the (n * (n + 1)) / 2 formula to calculate the total sum of the multiples, then multiply by 7 at the end.

// Base dollars: 28 * number of full weeks
// Extra dollars: 7 * (full weeks - 1 * (full weeks)) / 2
// Final week (if n % 7 !== 0): 
  // finalWeekStartDollar: The starting amount on Monday of the final week.
  // daysInFinalWeek: Number of days in the final week.
  // Dollars of the final week: Sum of (finalWeekStartDollar, ..., finalWeekStartDollar + daysInFinalWeek - 1).

// Time Complexity: O(1) 62ms
// Space Complexity: O(1) 41.2MB
var totalMoney = function(n) {
  let fullWeeks = Math.floor(n / 7);
  let baseDollars = 28 * fullWeeks;
  
  let extraMultiplesOf7 = sumOf1ToN(fullWeeks - 1);
  let extraDollars = 7 * extraMultiplesOf7;
  
  let daysInFinalWeek = n % 7;
  let finalWeekStartDollar = fullWeeks + 1;
  let finalWeekDollars = daysInFinalWeek > 0 ? sumOf1ToN(finalWeekStartDollar + daysInFinalWeek - 1) - sumOf1ToN(finalWeekStartDollar - 1) : 0;
  return baseDollars + extraDollars + finalWeekDollars;
};

function sumOf1ToN(n) {
  return n * (n + 1) / 2;
}

// Three test cases
console.log(totalMoney(4)) // 10
console.log(totalMoney(10)) // 37
console.log(totalMoney(20)) // 96