// 22. Generate Parentheses
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.


// Solution: Backtracking

// Logic:
// We would use the number of opening parentheses and closing parentheses to determine which ones we can add to the string.
// At any given location, we have two choices, 
  // 1. Add an opening parenthesis to str
  // 2. Add a closing parenthesis to str
// However, for the parentheses to be valid, the number of closing parentheses must be bigger than or equal to the number of opening parentheses. 
// For e.g: If we put ')', the number of closing parentheses is now less than the number of opening parentheses, therefore invalid.

// Start off with (n, n) number of opening and closing parentheses

// Algorithm:
// Keep an array res, which we will return when the algorithm is finished.
// Create a backtrack function, (accepts l (number of opening parentheses), r (number of closing parentheses), str (which we will build up as we go)) 
  // Base case: If str.length is equal to n * 2, push str into res, and return.
  // If l is bigger than 0 AND r is bigger than or equal to l
    // Recursively call backtrack for (l - 1 (we just used an opening parenthesis), r, str + '(')
  // If r is bigger than 0
    // Recursively call backtrack for (l, r - 1 (we just used a closing parenthesis), str + ')')
// Call backtrack(n, n, '')
// Return res.

// Time Complexity: O(2^2n) (length of str will always be 2n, and we get two choices at each step) 68ms
// Space Complexity: O(n) (call stack) 40MB
var generateParenthesis = function(n) {
  let res = [];
  backtrack(n, n, '');
  
  function backtrack(l, r, str) {
    if (str.length === n * 2) {
      res.push(str);
      return;
    }
    if (l > 0 && r >= l) backtrack(l - 1, r, str + '(');
    if (r > 0) backtrack(l, r - 1, str + ')');
  }
  return res;
};

// Two test cases
console.log(generateParenthesis(3)) // ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)) // ["()"]