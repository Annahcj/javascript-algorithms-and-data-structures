// 921. Minimum Add to Make Parentheses Valid
// Return the minimum number of moves required to make s valid.


// Solution: Counting

// Count open and closed parentheses.
// When we find a closed parenthesis, increment closed if there are no open parenthesis, otherwise decrement open.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 40.5MB
var minAddToMakeValid = function(s) {
  let open = 0, closed = 0;
  for (let paren of s) {
    if (paren === '(') open++;
    else {
      if (!open) closed++;
      else open--;
    }
  }
  return open + closed;
};

// Four test cases 
console.log(minAddToMakeValid("())")) // 1
console.log(minAddToMakeValid("(((")) // 3
console.log(minAddToMakeValid("()")) // 0
console.log(minAddToMakeValid("()))((")) // 4