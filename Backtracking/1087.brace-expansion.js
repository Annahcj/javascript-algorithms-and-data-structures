// 1087. Brace Expansion
// You are given a string s representing a list of words. Each letter in the word has one or more options.
  // If there is one option, the letter is represented as is.
  // If there is more than one option, then curly braces delimit the options. For example, "{a,b,c}" represents options ["a", "b", "c"].
// For example, if s = "a{b,c}", the first character is always 'a', but the second character can be 'b' or 'c'. The original list is ["ab", "ac"].
// Return all words that can be formed in this manner, sorted in lexicographical order.


// Solution: Backtracking

// 1. Collect each group of options in an array. 
  // Use a flag 'inBrace' to indicate whether we are in a brace group.
  // e.g: "{a,b}c{d,e}f" = [['a', 'b'], ['c'], ['d', 'e'], ['f']]
// 2. Sort each group of options in asc order
// 3. Use backtracking to generate every combination 

// n = length of s, m = max number of elements in a brace group, k = number of brace groups
// Time Complexity: O(n + m^k) 120ms
// Space Complexity: O(n) (not including output) 43.9MB
var expand = function(s) {
  let options = [], inBrace = false;
  for (let char of s) {
    if (char === '{') {
      inBrace = true;
      options.push([]);
    } else if (char === '}') inBrace = false;
    else if (char !== ',' && inBrace) {
      options[options.length - 1].push(char);
    } else if (char !== ',' && !inBrace) {
      options.push([char]);
    }
  }
  
  let n = options.length;
  for (let i = 0; i < n; i++) {
    options[i].sort();
  }
  
  let res = [];
  backtrack(0, "");
  return res;
  
  function backtrack(idx, str) {
    if (idx === n) {
      res.push(str);
      return;
    }
    for (let option of options[idx]) {
      backtrack(idx + 1, str + option);
    }
  }
};

// Two test cases
console.log(expand("{a,b}c{d,e}f")) // ["acdf","acef","bcdf","bcef"]
console.log(expand("abcd")) // ["abcd"]