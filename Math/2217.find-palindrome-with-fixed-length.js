// 2217. Find Palindrome With Fixed Length
// Given an integer array queries and a positive integer intLength, return an array answer where answer[i] is either the queries[i]th smallest positive palindrome of length intLength or -1 if no such palindrome exists.
// A palindrome is a number that reads the same backwards and forwards. Palindromes cannot have leading zeros.


// Solution: Math Logic

// e.g: intLength = 5
// each query can represent the first half of the palindrome.
// if query = 3, the palindrome = 10201. 
// if query = 13, the palindrome = 11211.
// if query = 20, the palindrome = 11911.

// for a query, the palindrome can be represented in layers.
// e.g: 15
// Note: Because the digits are 0-9, each query is 1 ahead, so we will need to subtract 1 from each query.
// So, 15 becomes 14.
// the 4 represents the number in the middle layer. __4__
// the 1 repesents the numbers in the second layer. _1_1_

// finally, for the outer layer, we need to add 10^(k-1), where k is half of intLength.
// So, 15 becomes 115. This is because the palindrome cannot have leading zeros, so we only have 9 digits (1-9). So we need to offset by 1.
// If query was 115, it becomes 215.

// back to our example, the last layer is repesented by the 1. 1___1
// the final result is 11411.

// How to handle an impossible case:
  // The maximum possible palindrome is 99999, if intLength is 5. 
  // Since we only need to know half of the palindrome, the maximum query is 999, 
  // which we can compare to our queries to make sure it is not invalid.

// n = length of queries, m = intLength
// Time Complexity: O(n) 422ms
  // since intLength <= 15, it can be treated as a constant.
// Space Complexity: O(m) (not including output)  83MB
var kthPalindrome = function(queries, intLength) {
  let k = Math.ceil(intLength / 2);
  let maxQuery = 10 ** k - 1, res = [];
  
  for (let i of queries) {
    let query = i - 1 + 10 ** (k - 1);
    if (query > maxQuery) {
      res.push(-1);
      continue;
    }
    let firstHalf = query.toString().split("");
    let secondHalf = intLength % 2 === 0 ? firstHalf : firstHalf.slice(0, k - 1);
    res.push(+(firstHalf.join("") + secondHalf.reverse().join("")));
  }
  return res;
};

// Two test cases
console.log(kthPalindrome([1,2,3,4,5,90,91], 3)) // [101,111,121,131,141,999,-1]
console.log(kthPalindrome([2,4,6], 4)) // [1111,1331,1551]