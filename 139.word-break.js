// 139. Word Break
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.


// Solution 1: BFS

// Turn the word dictionary into a hashmap/set for more efficient lookup.
// Create a visited map (for storing indexes we have visited), and a queue for bfs.
// Loop while the length of queue is bigger than 0
  // Take the first element from the queue, store it in a variable curr.
  // Keep a 'word' variable to store the ongoing string as you loop through s from the 'curr' starting index.
  // Loop through s from curr index to the end of s (pointer = i) 
    // word += s[i] (build up ongoing string)
    // Check if current string 'word' is one of the words in wordDict
      // If i is the last element of s (we got through s), return true.
      // Push i + 1 (next index to check from) into queue 
  // Add the 'curr' index to visited (so we don't have to go over it more than once)
// If there is nothing left in the queue and we have got to the end, return false.

// Time Complexity: O(n^2) 96ms
// Space Complexity: O(wordDict + n)41.3MB
  var wordBreak = function(s, wordDict) {
    let words = new Set(wordDict);
    let visited = {};
    let queue = [0];
    while (queue.length) {
      let curr = queue.shift();
      if (!visited[curr]) {
        let word = "";
        for (var i = curr; i < s.length; i++) {
          word += s[i];
          if (words.has(word)) {
            if (i === s.length - 1) return true;
            queue.push(i + 1);
          }
        }
      }
      visited[curr] = true;
    }
    return false;
  };
  
  // Four test cases to run function on
  console.log(wordBreak("abaabbbbbbbbbbbbaaa", ["a","b"])) // true
  console.log(wordBreak("leetcode", ["leet","code"])) // true
  console.log(wordBreak("applepenapple", ["apple","pen"])) // true
  console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])) // false