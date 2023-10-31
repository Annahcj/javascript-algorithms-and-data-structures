// 2325. Decode the Message
// You are given the strings key and message, which represent a cipher key and a secret message, respectively. The steps to decode message are as follows:
  // 1. Use the first appearance of all 26 lowercase English letters in key as the order of the substitution table.
  // 2. Align the substitution table with the regular English alphabet.
  // 3. Each letter in message is then substituted using the table.
  // 4. Spaces ' ' are transformed to themselves.
  // For example, given key = "happy boy" (actual key would have at least one instance of each letter in the alphabet), we have the partial substitution table of ('h' -> 'a', 'a' -> 'b', 'p' -> 'c', 'y' -> 'd', 'b' -> 'e', 'o' -> 'f').
// Return the decoded message.


// Solution: Map Characters

// Map each unused character in key to the appropriate character from a - z.
// Keep track of characters we have used.
// Use arrays of size 26 since there are always 26 lowercase letters.

// Time Complexity: O(n) 129ms
// Space Complexity: O(26) = O(1) 45.2MB
var decodeMessage = function(key, message) {
  let seen = Array(26).fill(0);
  let map = Array(26).fill(0), i = 0;
  for (let char of key) {
    let charcode = char.charCodeAt() - 97;
    if (char === ' ' || seen[charcode]) continue;
    let newChar = String.fromCharCode(i + 97);
    map[charcode] = newChar;
    seen[charcode] = 1;
    i++;
  }
  
  let ans = '';
  for (let char of message) {
    let charcode = char.charCodeAt() - 97;
    if (char === ' ') ans += ' ';
    else {
      ans += map[charcode];
    }
  }
  return ans;
};

// Two test cases
console.log(decodeMessage("the quick brown fox jumps over the lazy dog", "vkbs bs t suepuv")) // "this is a secret"
console.log(decodeMessage("eljuxhpwnyrdgtqkviszcfmabo", "zwx hnfx lqantp mnoeius ycgk vcnjrdb")) // "the five boxing wizards jump quickly"