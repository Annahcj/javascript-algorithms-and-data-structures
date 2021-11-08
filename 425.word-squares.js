// 425. Word Squares 
// Given an array of unique strings words, return all the word squares you can build from words. The same word from words can be used multiple times. You can return the answer in any order.
// A sequence of strings forms a valid word square if the kth row and column read the same string, where 0 <= k < max(numRows, numColumns).
// For example, the word sequence ["ball","area","lead","lady"] forms a word square because each word reads the same both horizontally and vertically.


// Solution: Trie w/ Backtracking

// Runtime on LeetCode: 232ms
// Memory Usage on LeetCode: 51.1MB
var wordSquares = function(words) {
  let trie = new Trie(words);
  let res = [];
  backtrack([], 0);
  return res;

  function backtrack(arr, idx) {
    // if number of words matches the number of letters in the first word, that means we have a valid square.
    // make a deep copy and push into result, and return.
    if (arr.length > 0 && arr.length === arr[0].length) {
      res.push([...arr]);
      return;
    }
    let prefix = "";
    // get the prefix we need 
    for (var i = 0; i < idx; i++) prefix += arr[i][idx];
    // get all words that start with prefix
    let list = trie.startsWith(prefix);
    // backtrack each possibility as long as the length of the new word matches the length of the first word
    for (var word of list) {
      if (!arr.length || word.length === arr[0].length) {
        arr.push(word);
        backtrack(arr, idx + 1);
        arr.pop();
      }
    }
  }
};

// TrieNode with children and wordEnd property
class TrieNode {
  constructor() {
    this.children = {};
    this.wordEnd = false;
  }
}
class Trie {
  constructor(words) {
    this.root = new TrieNode();
    // populate words to trie
    for (var word of words) {
      let node = this.root;
      for (var char of word) {
        node = node.children;
        if (!node[char]) node[char] = new TrieNode();
        node = node[char];
      }
      node.wordEnd = true;
    }
  }
  // returns all words that starts with word
  startsWith(word) {
    let words = [];
    let node = this.root;
    // get node where prefix has been fully matched
    for (var char of word) {
      node = node.children;
      if (!node[char]) return [];
      node = node[char];
    }
    // dfs to get all the words from node onwards
    dfs(node, word);
    return words;

    function dfs(currNode, str) {
      if (currNode.wordEnd) {
        words.push(str);
      }
      for (var child in currNode.children) {
        dfs(currNode.children[child], str + child);
      }
    }
  }
}

// Two test cases to run function on
console.log(wordSquares(["area","lead","wall","lady","ball"])) // [["ball","area","lead","lady"],["wall","area","lead","lady"]]
console.log(wordSquares(["abat","baba","atan","atal"])) // [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]