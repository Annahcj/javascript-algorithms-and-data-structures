// 2696. Minimum String Length After Removing Substrings
// You are given a string s consisting only of uppercase English letters.
// You can apply some operations to this string where, in one operation, you can remove any occurrence of one of the substrings "AB" or "CD" from s.
// Return the minimum possible length of the resulting string that you can obtain.
// Note that the string concatenates after removing the substring and could produce new "AB" or "CD" substrings.


// Solution: Stack

// The order in which you remove substrings does not affect the result.
// Use a stack to pop off previous characters if they make up 'AB' or 'CD'.

// Time Complexity: O(n) 85ms
// Space Complexity: O(n) 45.2MB
var minLength = function(s) {
  let n = s.length, stack = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === 'B' && stack.length && stack[stack.length - 1] === 'A') stack.pop();
    else if (s[i] === 'D' && stack.length && stack[stack.length - 1] === 'C') stack.pop();
    else stack.push(s[i]);
  }
  return stack.length;
};

// Two test cases
console.log(minLength("ABFCACDB")) // 2
console.log(minLength("ACBBD")) // 5