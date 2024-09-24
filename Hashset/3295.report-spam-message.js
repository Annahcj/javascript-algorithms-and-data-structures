// 3295. Report Spam Message
// You are given an array of strings message and an array of strings bannedWords.
// An array of words is considered spam if there are at least two words in it that exactly match any word in bannedWords.
// Return true if the array message is spam, and false otherwise.

 
// Solution: Hashset

// Keep a hashset of banned words for quick lookup.
// Count the number of words that exist in the hashset and return true if the count reaches 2.

// n = length of message, m = length of bannedWords
// Time Complexity: O(n + m) 356ms
// Space Complexity: O(m) 115.9MB
function reportSpam(message, bannedWords) {
  bannedWords = new Set(bannedWords);
  let banned = 0;
  for (let word of message) {
    if (bannedWords.has(word)) {
      banned++;
    }
    if (banned === 2) return true;
  }
  return false;
};

// Two test cases
console.log(reportSpam(["hello","world","leetcode"], ["world","hello"])) // true
console.log(reportSpam(["hello","programming","fun"], ["world","programming","leetcode"])) // false