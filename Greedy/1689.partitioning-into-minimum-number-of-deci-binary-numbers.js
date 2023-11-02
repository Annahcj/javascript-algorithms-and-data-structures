// 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
// A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.
// Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.

 
// Solution: Greedy

// Since we can use any deci-binary number, the greedy solution is to take numbers with 1's in any place where n[i] > 0.
// e.g: if n = '3213', the optimal solution can look like:
  // take 1111, left with '2102'
  // take 1101, left with '1001'
  // take 1001, left with '0'

// The answer is the maximum digit in n.

// Time Complexity: O(n) 130ms
// Space Complexity: O(1) 45.5MB
var minPartitions = function(n) {
  let ans = 0;
  for (let char of n) {
    ans = Math.max(ans, Number(char));
  }
  return ans;
};

// Two test cases
console.log(minPartitions("32")) // 3
console.log(minPartitions("82734")) // 8