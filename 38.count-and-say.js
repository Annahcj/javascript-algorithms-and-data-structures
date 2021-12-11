// 38. Count and Say
// Given a positive integer n, return the nth term of the count-and-say sequence.


// Solution: Recursion

// base case: when n is 1, return "1".
// get the string from countAndSay(n - 1)
// filter the string and return it for earlier calls.

// m = length of longest string
// Time Complexity: O(n * m) 68ms
// Space Complexity: O(m) 40.9MB
var countAndSay = function(n) {
  if (n === 1) return "1";
  let str = countAndSay(n - 1);
  let res = "", count = 1;
  for (var i = 0; i < str.length; i++) {
    if (i === str.length - 1 || str[i] !== str[i + 1]) {
      res += count.toString() + str[i];
      count = 1;
    } else {
      count++;
    }
  }
  return res; 
};

// Two test cases to run function on
console.log(countAndSay(1)) // "1"
console.log(countAndSay(4)) // "1211"