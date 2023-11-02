// 208. Implement Trie (Prefix Tree)
// Implement the Trie class:
// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

// Runtime on LeetCode: 192ms
// Memory Usage on LeetCode: 54MB
  

var Trie = function() {
  this.root = {};  
};

// Insert Method
  // Create a variable 'curr' which we will use to move down the trie starting from the root.
  // Loop through each character of word, if curr[character] doesn't exist, set it equal to an object
    // Keeping moving to the next character (curr = curr[character])
  // When iteration is done, set the 'isWord' flag to true for the last letter in the word.
  
  // Time Complexity: O(m) (length of word)
  // Space Complexity: O(m) 

Trie.prototype.insert = function(word) {
  let curr = this.root;
  for (var i = 0; i < word.length; i++) {
    if (!curr[word[i]]) {
      curr[word[i]] = {};
    }
    curr = curr[word[i]];
  }  
  curr.isWord = true;
};

  // Loop through each character in word, if character exists in curr, move on to the next character, else return false (not found)
  // When iteration is done, return true if 'isWord' is true, otherwise false.
  
  // Time Complexity: O(m)
  // Space Complexity: O(1)

Trie.prototype.search = function(word) {
  let curr = this.root;
  for (var i = 0; i < word.length; i++) {
    if (!curr[word[i]]) return false;
    curr = curr[word[i]];
   }  
   if (curr.isWord) return true;
   return false;
};

  // Loop through each character in prefix, if character exists in curr, move on to the next character, else return false (not found)
  // When iteration is done, return true.
  
  // Time Complexity: O(m)
  // Space Complexity: O(1)

Trie.prototype.startsWith = function(prefix) {
  let curr = this.root;
  for (var i = 0; i < prefix.length; i++) {
    if (!curr[prefix[i]]) return false;
    curr = curr[prefix[i]];
  }  
  return true;
};


let trie = new Trie();
trie.insert('apple');
console.log(trie.search('app')) // false
console.log(trie.search('apple')) // true
console.log(trie.startsWith('app')) // true
trie.insert('app');
console.log(trie.search('app')) // true