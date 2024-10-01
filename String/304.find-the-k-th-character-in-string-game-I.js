// 3304. Find the K-th Character in String Game I
// Alice and Bob are playing a game. Initially, Alice has a string word = "a".

// You are given a positive integer k.
// Now Bob will ask Alice to perform the following operation forever:
  // Generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word.
// For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
// Return the value of the kth character in word, after enough operations have been done for word to have at least k characters.
// Note that the character 'z' can be changed to 'a' in the operation.


// Solution: Brute Force

// Time Complexity: O(k^2) 63ms
// Space Complexity: O(k) 52.9MB
var kthCharacter = function(k) {
  let word = 'a';  
  while (word.length < k) {
    word += change(word);
  }
  return word[k - 1];
};

function change(word) {
  let newWord = '';
  for (let char of word) {
    let newCharcode = (char.charCodeAt() - 96) % 26;
    newWord += String.fromCharCode(newCharcode + 97);
  }
  return newWord;
}

// Two test cases
console.log(kthCharacter(5)) // "b"
console.log(kthCharacter(10)) // "c"