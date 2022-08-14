// 126. Word Ladder II
// Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists.


// Solution 1: BFS w/ Two Queues

// Use two queues to process the current level, and push new combinations into the next level.
// Two levels are necessary because if we find the endWord (as the last word of a combination), 
// we return all combinations in the current level which end with endWord.

// Turn wordList into a set. We will use this to keep track of which words we have left by removing it after using.
  // The catch: We can't remove it immediately after the first use, since other combinations may need it.
  // However, using a word again AFTER the current level would be suboptimal, so we can safely remove it after processing all the combinations at the current level.
  // Use an array 'usedWords' to keep track of the words we have used in the current level.
  // When the current level finishes processing, remove the usedWords from the wordList.

// Note: After test cases were updated, this solution only passes 32/35 test cases due to too much memory usage. 

// [Previous Run] Runtime on LeetCode: 165ms
// [Previous Run] Memory Usage on LeetCode: 50.6MB
var findLadders = function(beginWord, endWord, wordList) {
  wordList = new Set(wordList);
  if (!wordList.has(endWord)) return [];
  wordList.delete(beginWord); 
  let queue = [[beginWord]];
  
  while (queue.length) {
    let next = [], usedWords = [];
    for (let i = queue.length - 1; i >= 0; i--) {
      let seq = queue[i], lastWord = seq[seq.length - 1];
      if (lastWord === endWord) return findValid(queue);
      for (let j = 0; j < lastWord.length; j++) {
        for (let k = 0; k < 26; k++) { // try to replace each character with a...z.
          let char = String.fromCharCode(k + 97);
          let newWord = lastWord.slice(0, j) + char + lastWord.slice(j + 1);
          if (wordList.has(newWord)) {
            next.push([...seq, newWord]); // a new combination
            usedWords.push(newWord);
          }
        }
      }
    }
    for (let word of usedWords) wordList.delete(word); // delete used words of this level. we definitely will not use them again.
    queue = next;
  }
  return [];
  
  function findValid(queue) { // returns all combinations which end with endWord
    let res = [];
    for (let seq of queue) {
      if (seq[seq.length - 1] === endWord) res.push(seq);
    }
    return res;
  }
};

// Solution 2: BFS & Backtracking

// 1. Use BFS to 
  // find the shortest distance from beginWord to each word
  // record the list of previous words for every word
// 2. Use backtracking to generate the paths with the shortest distance, starting from endWord since we record the previous words. 
  // Only traverse next words with the correct distance (current distance - 1) so that we save time.

// Runtime on LeetCode: 100ms
// Memory Usage on LeetCode: 49.2MB
var findLadders = function(beginWord, endWord, wordList) {
  wordList = new Set(wordList);
  if (!wordList.has(endWord)) return [];
  wordList.delete(beginWord);
  let queue = [beginWord];
  let dist = new Map(), prev = new Map();
  dist.set(beginWord, 0);
  
  let steps = 0, finished = false;
  while (queue.length) {
    steps++;
    if (finished) break;
    for (let i = queue.length - 1; i >= 0; i--) {
      let word = queue.shift();
      for (let j = 0; j < word.length; j++) {
        for (let k = 0; k < 26; k++) {
          let char = String.fromCharCode(k + 97);
          let newWord = word.slice(0, j) + char + word.slice(j + 1);
          if (!wordList.has(newWord)) continue;
          if (!prev.has(newWord)) prev.set(newWord, []);
          prev.get(newWord).push(word);
          
          if (dist.has(newWord)) continue;
          if (newWord === endWord) finished = true;
          dist.set(newWord, steps);
          queue.push(newWord);
        }
      }
    }
  }
  let res = [];
  getPaths(endWord, [endWord]);
  return res;
  
  function getPaths(word, path) {
    if (word === beginWord) {
      let newPath = [...path];
      res.push(newPath.reverse());
      return;
    }
    for (let prevWord of (prev.get(word) || [])) {
      if (dist.get(prevWord) + 1 === dist.get(word)) {
        path.push(prevWord);
        getPaths(prevWord, path);
        path.pop();
      }
    }
  }
};


// Two test cases to run function on
console.log(findLadders("hit", "cog", ["hot","dot","dog","lot","log","cog"])) // [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
console.log(findLadders("hit", "cog", ["hot","dot","dog","lot","log"])) // []