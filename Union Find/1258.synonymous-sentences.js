// 1258. Synonymous Sentences
// You are given a list of equivalent string pairs synonyms where synonyms[i] = [si, ti] indicates that si and ti are equivalent strings. You are also given a sentence text.
// Return all possible synonymous sentences sorted lexicographically.


// Solution: Union Find & Backtracking

// We can use union find to connect each [s, t] in synonyms.
// Then, we can put them in groups and use backtracking to generate each possible synonymous sentence.

// The steps:
// 1. Since we don't have each synonym and the total number of words, we first need to do some preprocessing to get this information.
  // a. Use a set to get each unique synonym, n = set.size
  // b. Give each unique synonym and index (from 0 to n - 1)
// 2. Use union find to connect each [s, t] in synonyms.
// 3. Get the groups based on the parent of each synonym -> wordGroups: { idx: [word, word], idx: [word, word], ... }
// 4. Sort each group of words lexicographically.
// 5. Lastly, use backtracking to generate each possible synonymous sentence.

// n = average number of synonyms per word, m = number of words in text
// Time Complexity: O(n^m) 70ms
// Space Complexity: O(n^m) 42.4MB
var generateSentences = function(synonyms, text) {
  let uniqueWords = new Set();
  for (let [s, t] of synonyms) {
    uniqueWords.add(s);
    uniqueWords.add(t);
  }
  let n = uniqueWords.size;
  let indexes = {}, idx = 0; 
  // indexes = { word: idx, word: idx, ... }
  for (let word of uniqueWords) {
    indexes[word] = idx++;
  }
  
  let uf = new UnionFind(n);
  for (let [s, t] of synonyms) {
    uf.union(indexes[s], indexes[t]);
  }
  
  let wordGroups = {}; 
  // wordGroups: { idx: [word, word], idx: [word, word], ... }
  for (let word of uniqueWords) {
    let parent = uf.find(indexes[word]);
    if (!wordGroups[parent]) wordGroups[parent] = [];
    wordGroups[parent].push(word);
  }
  for (let index in wordGroups) {
    wordGroups[index].sort();
  }
  
  let words = text.split(" "), res = [];
  backtrack(0, []);
  return res;
  
  function backtrack(idx, sentence) {
    if (idx === words.length) {
      res.push(sentence.join(" "));
      return;
    }
    if (uniqueWords.has(words[idx])) {
      let parent = uf.find(indexes[words[idx]]);
      for (let word of wordGroups[parent]) {
        sentence.push(word);
        backtrack(idx + 1, sentence);
        sentence.pop();
      }
    } else {
      sentence.push(words[idx]);
      backtrack(idx + 1, sentence);
      sentence.pop();
    }
  }
};

class UnionFind {
  constructor(size) {
    this.size = size;
    this.root = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
    else if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
    else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// A test case
console.log(generateSentences([["happy","joy"],["sad","sorrow"],["joy","cheerful"]], "I am happy today but was sad yesterday")) // ["I am cheerful today but was sad yesterday","I am cheerful today but was sorrow yesterday","I am happy today but was sad yesterday","I am happy today but was sorrow yesterday","I am joy today but was sad yesterday","I am joy today but was sorrow yesterday"]