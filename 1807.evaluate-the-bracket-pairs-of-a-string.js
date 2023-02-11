// 1807. Evaluate the Bracket Pairs of a String
// You are given a string s that contains some bracket pairs, with each pair containing a non-empty key.
  // For example, in the string "(name)is(age)yearsold", there are two bracket pairs that contain the keys "name" and "age".
// You know the values of a wide range of keys. This is represented by a 2D string array knowledge where each knowledge[i] = [key[i], value[i]] indicates that key key[i] has a value of valuei.
// You are tasked to evaluate all of the bracket pairs. When you evaluate a bracket pair that contains some key key[i], you will:
  // Replace key[i] and the bracket pair with the key's corresponding value[i].
  // If you do not know the value of the key, you will replace key[i] and the bracket pair with a question mark "?" (without the quotation marks).
// Each key will appear at most once in your knowledge. There will not be any nested brackets in s.
// Return the resulting string after evaluating all of the bracket pairs.


// Solution: 

// Store each key value pair in a hashmap.
// Go through s and build up the result string, replacing any key with the corresponding value from the hashmap (or a question mark if it doesn't exist in the hashmap).

// Note: The time complexity is O(n^2) due to the O(n) time complexity of appending to a string.

// n = length of s, m = length of knowledge
// Time Complexity: O(n^2 + m) 234ms
// Space Complexity: O(n + m) 83MB
var evaluate = function(s, knowledge) {
  let map = new Map();
  for (let [key, value] of knowledge) {
    map.set(key, value);
  }  
  let res = "", key = "", shouldReplace = false;
  for (let char of s) {
    if (char === '(') {
      shouldReplace = true;
    } else if (char === ')') {
      res += map.get(key) || '?';
      shouldReplace = false;
      key = "";
    } else if (shouldReplace) {
      key += char;
    } else { // don't need to replace
      res += char;
    }
  }
  return res;
};

// Two test cases
console.log(evaluate("(name)is(age)yearsold", [["name","bob"],["age","two"]])) // "bobistwoyearsold"
console.log(evaluate("hi(name)", [["a","b"]])) // "hi?"