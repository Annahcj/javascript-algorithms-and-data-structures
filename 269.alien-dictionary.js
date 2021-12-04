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
// Time Complexity: O(c) 84ms
// Space Complexity: O(n) 42.8MB
var alienOrder = function(words) {
  const graph = {}, indegrees = {};
  for (var word of words) {
    for (var char of word) { // initialize the indegrees and graph to avoid errors
      indegrees[char] = 0;
      graph[char] = [];
    }
  }
  let unique = Object.keys(indegrees).length; // get the number of unique characters

  for (var i = 0; i < words.length - 1; i++) {
    let word1 = words[i], word2 = words[i + 1];
    let l = 0, r = 0;
    while (l < word1.length && r < word2.length) { // find first different character for adjacent words
      if (word1[l] !== word2[r]) break;
      l++, r++;
    }
    if (r === word2.length && word1.length > word2.length) return ""; // check for cases like (abc, ab), where it would be impossible
    if (!word1[l] || !word2[r]) continue;
    indegrees[word2[r]]++; // add to the indegree count of the smaller character
    graph[word1[l]].push(word2[r]); // push the smaller character as a neighbor of the bigger character
  }

  let queue = [];
  for (var char in indegrees) {
    if (indegrees[char] === 0) queue.push(char); // find characters with an indegree of 0
  }

  let ans = '';
  // get chars by topological order
  while (queue.length) {
    let char = queue.shift();
    ans += char;
    unique--;
    for (var neighbor of graph[char]) { 
      indegrees[neighbor]--;
      if (indegrees[neighbor] === 0) queue.push(neighbor);
    }
  }
  return unique === 0 ? ans : '';
};

// Five test cases to run function on
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])) // "wertf"
console.log(alienOrder(["z","x"])) // "zx"
console.log(alienOrder(["z","x","z"])) // ""
console.log(alienOrder([["z","z"]])) // "z"
console.log(alienOrder(["abc","ab"])) // ""