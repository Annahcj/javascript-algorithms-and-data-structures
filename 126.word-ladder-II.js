// 126. Word Ladder II
// Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists.


// Solution: BFS w/ Two Queues

// Use two queues to process the current level, and push new combinations into the next level.
// Two levels are necessary because if we find the endWord (as the last word of a combination), 
// we return all combinations in the current level which end with endWord.

// Turn wordList into a set. We will use this to keep track of which words we have left by removing it after using.
  // The catch: We can't remove it immediately after the first use, since other combinations may need it.
  // However, using a word again AFTER the current level would be suboptimal, so we can safely remove it after processing all the combinations at the current level.
  // Use an array 'usedWords' to keep track of the words we have used in the current level.
  // When the current level finishes processing, remove the usedWords from the wordList. 

// Runtime on LeetCode: 165ms
// Memory Usage on LeetCode: 50.6MB
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

// Two test cases to run function on
console.log(findLadders("hit", "cog", ["hot","dot","dog","lot","log","cog"])) // [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
console.log(findLadders("hit", "cog", ["hot","dot","dog","lot","log"])) // []