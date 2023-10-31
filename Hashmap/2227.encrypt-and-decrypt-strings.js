// 2227. Encrypt and Decrypt Strings
// You are given a character array keys containing unique characters and a string array values containing strings of length 2. You are also given another string array dictionary that contains all permitted original strings after decryption. You should implement a data structure that can encrypt or decrypt a 0-indexed string.


// Solution: Two Hashmaps

// Use an array of length 26 'values' to represent the value for each lowercase letter. character code of keys[i] - 97: values[i]  
  // When encrypt is called, replace each character with its associated value.
// Encrypt each word in the dictionary and count the occurances of each encrypted word.
  // When decrypt is called, get the count of the word from the hashmap.

// n = keys.length, m = dictionary.length
// Time Complexity: 265ms
  // initial: O(n + m)
  // encrypt: O(word1.length)
  // decrypt: O(1)
// Space Complexity: O(m) 68.6MB
var Encrypter = function(keys, values, dictionary) {
  this.values = Array(26);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i].charCodeAt() - 97;
    this.values[key] = values[i];
  }
  this.count = new Map();
  for (let word of dictionary) {
    let encrypted = this.encrypt(word);
    this.count.set(encrypted, (this.count.get(encrypted) || 0) + 1);
  }
};

Encrypter.prototype.encrypt = function(word1) {
  let n = word1.length, res = Array(n);
  for (let i = 0; i < n; i++) {
    let key = word1.charCodeAt(i) - 97;
    res[i] = this.values[key];
  }
  return res.join("");
};

Encrypter.prototype.decrypt = function(word2) {
  return this.count.get(word2) || 0;
};

// A few test cases
let encrypter = new Encrypter(['a', 'b', 'c', 'd'], ["ei", "zf", "ei", "am"], ["abcd", "acbd", "adbc", "badc", "dacb", "cadb", "cbda", "abad"]);
console.log(encrypter.encrypt("abcd")); // return "eizfeiam". 
                           // 'a' maps to "ei", 'b' maps to "zf", 'c' maps to "ei", and 'd' maps to "am".
console.log(encrypter.decrypt("eizfeiam")); // return 2. 