// 127. Word Ladder
// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.


// Solution: BFS

// Logic:
// Starting with 'beginWord', we check all its 'neighbors' (words that are one character different).
// We can simply loop through each character in the word, swap each character out for each letter in the alphabet, and check whether this new word exists in the wordList.
// If we find words that exist in the wordList, we push them into the queue and perform the above operation until endWord is found.

// Algorithm:
// Convert wordList to a set (wordSet) for efficient lookup.
// If wordSet doesn't contain the endWord, return 0 (can never be found).
// Initialize a queue with [beginWord, 1]. (The first word is counted too so we start with 1)
// Loop while queue is not empty
  // Shift first item off queue, use array destructuring to store in variables 'curr' (current word) and 'currCount' 
  // If current word is equal to endWord, return currCount. (Found it!)
  // Otherwise, loop through each character in curr
    // Loop through from numbers 0 to 26 (we will swap out ith character in curr for each letter of the alphabet, then check if it exists in wordSet)
      // Construct the new word: curr.slice(0, i) + String.fromCharCode(j + 97) (+97 for lowercase letters a-z) + curr.slice(i + 1).
      // If wordSet contains new word, push it into queue, and delete it from wordSet.
// If the queue becomes empty and the end word is not found, return 0.

// n = length of wordList, m = length of each word in wordList
// Time Complexity: O(n * m^2 * 26) 188ms
// Space Complexity: O(n) 47MB
  var ladderLength = function(beginWord, endWord, wordList) {
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    let queue = [[beginWord, 1]];
    while (queue.length) {
      let [curr, currCount] = queue.shift();
      if (curr === endWord) return currCount;
      for (var i = 0; i < curr.length; i++) {
        for (var j = 0; j < 26; j++) {
          let newWord = curr.slice(0, i) + String.fromCharCode(j + 97) + curr.slice(i+1);
          if (wordSet.has(newWord)) {
            queue.push([newWord, currCount + 1]);
            wordSet.delete(newWord);
          }
        }
      }
    }
    return 0;
  };
  
  // Two test cases to run function on
  console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])) // 5
  console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"])) // 0