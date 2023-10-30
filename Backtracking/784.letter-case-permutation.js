// 784. Letter Case Permutation
// Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.
// Return a list of all possible strings we could create. Return the output in any order.


// Solution: Backtracking

// Backtracking with recursion.
// For each s[index], 
  // if s[index] is a number: add it to the sequence
  // otherwise, try both lowercase and uppercase of the letter.

// Time Complexity: O(2^n) 112ms
// Space Complexity: O(2^n) 45.6MB
var letterCasePermutation = function(s) {
  let res = [], n = s.length;
  backtrack(0, []);
  return res;
  
  function backtrack(index, arr) {
    if (index === n) {
      res.push(arr.join(""));
      return;
    }
    if (!isNaN(+s[index])) { // number
      arr.push(s[index]);
      backtrack(index + 1, arr);
      arr.pop();
    } else { // character
      arr.push(s[index].toLowerCase());
      backtrack(index + 1, arr);
      arr.pop();
      
      arr.push(s[index].toUpperCase());
      backtrack(index + 1, arr);
      arr.pop();
    }
  }
};

// Two test cases
console.log(letterCasePermutation("a1b2")) // ["a1b2","a1B2","A1b2","A1B2"]
console.log(letterCasePermutation("3z4")) // ["3z4","3Z4"]