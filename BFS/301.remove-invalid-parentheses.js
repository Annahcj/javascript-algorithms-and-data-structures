// 301. Remove Invalid Parentheses
// Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.
// Return all the possible results. You may return the answer in any order.


// Solution: BFS

// Keep track of  
  // 1. A queue of strings 
  // 2. A boolean variable found (once a string is balanced, we use the found variable to stop the process for that string)
  // 3. A hashset 'unique' (only visit each possibility once)
  // 4. The result array 'res'

// Time Complexity: O(n * 2^n) 140ms
// Space Complexity: O(2^n) 46.1MB
var removeInvalidParentheses = function(s) {
  let queue = [s], found = false, unique = new Set(), res = [];
  while (queue.length) {
    let str = queue.shift();
    if (isValid(str)) { // if the string is valid, this is the shortest way
      res.push(str); // add to result
      found = true; // set found to true
    }
    if (found) continue; // if found is true, we don't need to do anything further
    for (var i = 0; i < str.length; i++) {
      if (str[i] === '(' || str[i] === ')') { // only remove if they are parentheses
        let newStr = str.slice(0, i) + str.slice(i + 1); // new string without the character str[i]
        if (!unique.has(newStr)) { 
          queue.push(newStr); // add to queue
          unique.add(newStr);
        }
      }
    }
  }
  return res;

  function isValid(str) { // checks if a string is balanced
    let count = 0;
    for (var char of str) {
      if (char === '(') count++;
      else if (char === ')') count--;
      if (count < 0) return false;
    }
    return count === 0;
  }  
}; 

// Three test cases to run function on
console.log(removeInvalidParentheses("()())()")) // ["(())()","()()()"]
console.log(removeInvalidParentheses("(a)())()")) // ["(a())()","(a)()()"]
console.log(removeInvalidParentheses(")(")) // [""]