// 212. Word Search II
// Given an m x n board of characters and a list of strings words, return all words on the board.
// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.


// Solution: Backtracking + Trie

// Create a new Trie and add all words to it.
// For each cell in board, call backtrack and try to match all words in the trie.


// k = total letters in dictionary
// L = length of longest word in words
// nm = size of board
// Time Complexity: O(nm * 3^L) 792ms -> except for the first cell, we have 4 directions to choose from
// Space Complexity: O(k) 46.2MB -> size of the trie

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.word = null;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let curr = this.root;
    for (var i = 0; i < word.length; i++) {
      curr = curr.children;
      if (!curr[word[i]]) curr[word[i]] = new TrieNode(word[i]);
      curr = curr[word[i]];
    }
    // instead of marking wordEnd as true, store the entire word instead for easy access
    curr.word = word;
  }
}

var findWords = function(board, words) {
  let trie = new Trie();
  for (var word of words) trie.insert(word);
  let res = [];
  // call backtrack for each cell in board
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      backtrack(i, j, trie.root);
    }
  }
  return res;

  function backtrack(row, col, currNode) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    // if we find a word, push it into res and set it to null (we only want to match it once)
    if (currNode.word) {
      res.push(currNode.word);
      currNode.word = null;
    } 
    currNode = currNode.children;
    
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || !currNode[board[row][col]]) return;

    let letter = board[row][col];
    // mark cell as visited
    board[row][col] = '.';

    // try all four directions
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      backtrack(newX, newY, currNode[letter]);
    }
    // unmark cell 
    board[row][col] = letter;
  }
};

// Two test cases to run function on
console.log(findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])) // ["eat","oath"]
console.log(findWords([["a","b"],["c","d"]], ["abcb"])) // []