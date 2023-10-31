// 1804. Implement Trie II (Prefix Tree)
// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
// Implement the Trie class:
// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// int countWordsEqualTo(String word) Returns the number of instances of the string word in the trie.
// int countWordsStartingWith(String prefix) Returns the number of strings in the trie that have the string prefix as a prefix.
// void erase(String word) Erases the string word from the trie.

// Runtime on LeetCode: 404ms
// Memory Usage on LeetCode: 71.2MB

var Trie = function() {
  this.root = {};  
};

// Insert:
// For each character, if the trie doesn't contain it yet, set it to a new object, and set its count to 1.
// If it does contain the character, increment its count by 1.
// At the end of the word, set its wordEnd property to 1 if it doesn't exist, or increment it by 1.

// n = word.length
// Time Complexity: O(n)

Trie.prototype.insert = function(word) {
  let curr = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!curr[word[i]]) {
      curr[word[i]] = {};
      curr[word[i]].count = 1;
    } else {
      curr[word[i]].count++;
    }
    curr = curr[word[i]];
  }
  curr.wordEnd = (curr.wordEnd || 0) + 1; 
};

// Count Words Equal To:
// Loop through each character in word
  // if curr doesn't contain word[i], return 0 (no words)
  // otherwise set curr to curr[word[i]]
// Return curr wordEnd if it exists, or 0.

// Time Complexity: O(n)

Trie.prototype.countWordsEqualTo = function(word) {
  let curr = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!curr[word[i]]) return 0;
    curr = curr[word[i]];
  }  
  return curr.wordEnd ? curr.wordEnd : 0;
};

// Count Words Starting With:
// (Get the minimum count property as we loop through the trie for each character)
// Set words to Infinity initially
// Loop through each character in prefix
  // If curr doesn't contain prefix[i], return 0 (no words)
  // otherwise set words to curr[prefix[i]].count if it is smaller
  // set curr to curr[prefix[i]]
// Return words, or 0 if words is equal to Infinity.

// Time Complexity: O(n)

Trie.prototype.countWordsStartingWith = function(prefix) {
  let words = Infinity;
  let curr = this.root;
  for (let i = 0; i < prefix.length; i++) {
    if (!curr[prefix[i]]) return 0;
    words = Math.min(words, curr[prefix[i]].count);
    curr = curr[prefix[i]];
  }  
  return words === Infinity ? 0 : words;
};

// Erase:
// Loop through each character in word
  // If the count of curr[word[i]] is bigger than 1,
    // decrement the count of curr[word[i]] by one
    // set curr to curr[word[i]]
  // otherwise if the count is 1, 
    // delete curr[word[i]] and return
// Decrement the wordEnd counter of curr by one

// Time Complexity: O(n)

Trie.prototype.erase = function(word) {
  let curr = this.root;
  for (let i = 0; i < word.length; i++) {
    if (curr[word[i]].count > 1) {
      curr[word[i]].count--;
      curr = curr[word[i]];
    } else {
      delete curr[word[i]];
      return;
    }
  }  
  curr.wordEnd--;
};

// A few test cases
let trie = new Trie();
trie.insert("apple");               // Inserts "apple".
trie.insert("apple");               // Inserts another "apple".
console.log(trie.countWordsEqualTo("apple"));    // There are two instances of "apple" so return 2.
console.log(trie.countWordsStartingWith("app")); // "app" is a prefix of "apple" so return 2.
trie.erase("apple");                // Erases one "apple".
console.log(trie.countWordsEqualTo("apple"));    // Now there is only one instance of "apple" so return 1.
console.log(trie.countWordsStartingWith("app")); // return 1
trie.erase("apple");                // Erases "apple". Now the trie is empty.
console.log(trie.countWordsStartingWith("app")); // return 0