// 269. Alien Dictionary
// There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.
// You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.
// Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.
// A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.


// Solution: Kahn's Algorithm / Topological Sort

// Another famous problem which uses Kahn's Algorithm is Course Schedule.
// The number of prerequisites for a course was its indegree.
// This problem can be solved in the same way, except instead of courses, we are using characters.

// For each two adjacent words, the characters that matter are the first characters at which the two words differ.
// So, the indegree of a character is basically the number of characters that need to come before it.

// Algorithm:

// 1. Loop through each character in all the words, and set the indegree of each unique character to 0. (the number of unique characters is the size of our indegree hashmap)
// 2. set indegrees and construct the reverse graph (leftChar -> rightChar)
// now, we use a queue
// 3. get all letters with indegree of 0, push into queue
// 4. get each letter in topological order one by one (shifting off queue, checking neighbors, decrementing indegrees by 1, getting next letters)
// finally, return the ans if the length of ans is equal to the number of unique characters, otherwise return an empty string.


// c = number of characters in all words, n = number of words
// Time Complexity: O(c) 124ms
// Space Complexity: O(n) 42.8MB
var alienOrder = function(words) {
  let graph = {};
  let indegrees = {};
  // set indegree for each character to 0
  for (var word of words) {
    for (var char of word) {
      indegrees[char] = 0;
    }
  }
  let numUnique = Object.keys(indegrees).length;
  for (var i = 1; i < words.length; i++) {
    let l = 0, r = 0;
    // find first different character for adjacent words
    while (l < words[i - 1].length || r < words[i].length) {
      if (words[i - 1][l] !== words[i][r]) break;
      l++, r++;
    }
    let prevChar = words[i - 1][l], currChar = words[i][r];
    // check for cases like (abc, ab), where it would be impossible
    if (r === words[i].length && words[i - 1].length > words[i].length) return "";
    if (!prevChar || !currChar) continue;
    // add indegrees of currChar (bigger char)
    indegrees[currChar] = (indegrees[currChar] || 0) + 1;
    // add currChar as neighbor of prevChar
    if (!graph[prevChar]) graph[prevChar] = [];
    graph[prevChar].push(currChar);
  }

  let queue = [], ans = '';
  // get chars with indegree of 0
  for (var key in indegrees) {
    if (indegrees[key] === 0) queue.push(key);
  }
  // get chars by topological order
  while (queue.length) {
    let curr = queue.shift();
    ans += curr;
    for (var neighbor of (graph[curr] || [])) {
      indegrees[neighbor]--;
      if (indegrees[neighbor] === 0) queue.push(neighbor);
    }
  }
  return ans.length === numUnique ? ans : "";
};


// Five test cases to run function on
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])) // "wertf"
console.log(alienOrder(["z","x"])) // "zx"
console.log(alienOrder(["z","x","z"])) // ""
console.log(alienOrder([["z","z"]])) // "z"
console.log(alienOrder(["abc","ab"])) // ""