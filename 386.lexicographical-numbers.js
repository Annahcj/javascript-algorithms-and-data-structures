// 386. Lexicographical Numbers
// Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.


// Solution: Recursive DFS

// Starting with 1, repeat the below steps:
// 1. Multiply it by 10 until it becomes bigger than n.
// 2. Backtrack to the last number, add 1 (as long as the number doesn't end with 9), and repeat.

// e.g: n = 100
// DFS from 1: 1 -> 10 -> 100 -> 1000 then cut at 1000
// backtrack to 100
// add 1: 101 then cut at 101
// backtrack to 10
// add 1: 11 -> 110 then cut at 110
// backtrack to 11
// add 1: 12 -> 120 then cut at 12
// ... repeating these steps until it runs out of numbers.

// When we get to 19, remember that we don't add 1 because we should put the number 2 first and leave it to that call to add the 2 -> 20 -> ...
// This is the same for any number with 9 as the last digit.

// Time Complexity: O(n) 116ms
// Space Complexity: O(log10(n) + 10) (call stack) 49.8MB
var lexicalOrder = function(n) {
  let res = [];
  dfs(1);
  return res;
  
  function dfs(num) {
    if (num > n) return;
    res.push(num);
    dfs(num * 10);
    if (num % 10 !== 9) dfs(num + 1); 
  }
};

// Two test cases to run function on
console.log(lexicalOrder(13)) // [1,10,11,12,13,2,3,4,5,6,7,8,9]
console.log(lexicalOrder(2)) // [1,2]