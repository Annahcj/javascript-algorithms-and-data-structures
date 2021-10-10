// 642. Design Search Autocomplete System
// Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').


// Idea:
// 1. Construct trie with all words in sentences
// 2. Store frequency of each word in hashmap (word as key)

// Keep a 'currInput' variable to keep the sentence the user is typing.
// When # is typed,
  // 1. Insert it into the trie
  // 2. update frequency of currInput
  // 3. reset currInput to ''

// input: 
// if input is not #,   
  // 1. traverse trie until the end of the word
  // 2. dfs through trie to find all and any words from that point onwards
  // 3. get the top 3 words using either a minheap or just sorting
  

// Solution 1: Min Heap

// Runtime on LeetCode: 380ms
// Memory Usage on LeetCode: 52.9MB

class MinHeap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) > 0) { 
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) > 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) < 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}

var TrieNode = function(char) {
  this.char = char;
  this.children = {};
  this.wordEnd = false;
}

var AutocompleteSystem = function(sentences, times) {
  this.root = new TrieNode(null);
  this.freq = {};
  this.currInput = '';

  for (var i = 0; i < sentences.length; i++) {
    this.insert(sentences[i]);
    this.freq[sentences[i]] = times[i];
  }  
};

AutocompleteSystem.prototype.insert = function(word) {
  let curr = this.root;
  for (var char of word) {
    curr = curr.children;
    if (!curr[char]) curr[char] = new TrieNode(char);
    curr = curr[char];
  }
  curr.wordEnd = true;
}

AutocompleteSystem.prototype.search = function(word) {
  let res = [];
  let curr = this.root;
  for (var char of word) {
    curr = curr.children;
    if (!curr[char]) return [];
    curr = curr[char];
  }
  dfs(curr, word);
  return res;

  function dfs(currNode, currWord) {
    if (currNode.wordEnd) {
      res.push(currWord);
    }
    currNode = currNode.children;
    for (var key in currNode) {
      dfs(currNode[key], currWord + key);
    }
  }
}

AutocompleteSystem.prototype.input = function(c) {
  if (c === '#') {
    this.insert(this.currInput);
    this.freq[this.currInput] = (this.freq[this.currInput] || 0) + 1;
    this.currInput = '';
    return [];
  } else {
    this.currInput += c;
    let words = this.search(this.currInput);
    let minHeap = new MinHeap((a, b) => {
      if (this.freq[a] === this.freq[b]) {
        return a > b ? 1 : -1;
      } 
      return this.freq[b] - this.freq[a];
    });
    for (var word of words) {
      minHeap.add(word);
      if (minHeap.values.length > 3) minHeap.remove();
    }
    let res = [];
    let maxWords = Math.min(3, minHeap.values.length);
    for (var i = 0; i < maxWords; i++) {
      res.unshift(minHeap.remove());
    }
    return res;
  }
};

// Solution 2: Sorting

// Runtime on LeetCode: 489ms
// Memory Usage on LeetCode: 60.6MB

var TrieNode = function(char) {
  this.char = char;
  this.children = {};
  this.wordEnd = false;
}

var AutocompleteSystem = function(sentences, times) {
  this.root = new TrieNode(null);
  this.freq = {};
  this.currInput = '';

  for (var i = 0; i < sentences.length; i++) {
    this.insert(sentences[i]);
    this.freq[sentences[i]] = times[i];
  }  
};

AutocompleteSystem.prototype.insert = function(word) {
  let curr = this.root;
  for (var char of word) {
    curr = curr.children;
    if (!curr[char]) curr[char] = new TrieNode(char);
    curr = curr[char];
  }
  curr.wordEnd = true;
}

AutocompleteSystem.prototype.search = function(word) {
  let res = [];
  let curr = this.root;
  for (var char of word) {
    curr = curr.children;
    if (!curr[char]) return [];
    curr = curr[char];
  }
  dfs(curr, word);
  return res;

  function dfs(currNode, currWord) {
    if (currNode.wordEnd) {
      res.push(currWord);
    }
    currNode = currNode.children;
    for (var key in currNode) {
      dfs(currNode[key], currWord + key);
    }
  }
}

AutocompleteSystem.prototype.input = function(c) {
  if (c === '#') {
    this.insert(this.currInput);
    this.freq[this.currInput] = (this.freq[this.currInput] || 0) + 1;
    this.currInput = '';
    return [];
  } else {
    this.currInput += c;
    let words = this.search(this.currInput);
    words.sort((a, b) => {
      if (this.freq[a] === this.freq[b]) {
        return a < b ? -1 : 1;
      }
      return this.freq[b] - this.freq[a];
    })
    return words.slice(0, 3);
  }
};


let obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
console.log(obj.input("i")); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
console.log(obj.input(" ")); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
console.log(obj.input("a")); // return []. There are no sentences that have prefix "i a".
console.log(obj.input("#")); // return [].