// 2284. Sender With Largest Word Count
// You have a chat log of n messages. You are given two string arrays messages and senders where messages[i] is a message sent by senders[i].
// A message is list of words that are separated by a single space with no leading or trailing spaces. The word count of a sender is the total number of words sent by the sender. Note that a sender may send more than one message.
// Return the sender with the largest word count. If there is more than one sender with the largest word count, return the one with the lexicographically largest name.
// Note:
  // Uppercase letters come before lowercase letters in lexicographical order.
  // "Alice" and "alice" are distinct.


// Solution: Hashmap

// Use a hashmap to store the word count for each unique sender.
// For each message, the number of words = the number of spaces + 1

// n = number of messages, m = max(messages[i].length), k = max(senders[i].length)
// Time Complexity: O(n * m + k) 270ms
// Space Complexity: O(n) 59.7MB
var largestWordCount = function(messages, senders) {
  let wordCount = {}, n = messages.length;
  let maxWordCount = 0, maxSender = "";
  for (let i = 0; i < n; i++) {
    let words = getWordCount(messages[i]);
    let sender = senders[i];
    wordCount[sender] = (wordCount[sender] || 0) + words;
    
    let currWordCount = wordCount[sender];
    if (currWordCount > maxWordCount) {
      maxWordCount = currWordCount;
      maxSender = sender;
    } else if (currWordCount === maxWordCount) {
      if (maxSender < sender) maxSender = sender;
    }
  }
  return maxSender;
};

function getWordCount(message) { // count number of words in a message
  let spaces = 0;
  for (let char of message) {
    spaces += char === ' ' ? 1 : 0;
  }
  return spaces + 1;
}

// Two test cases
console.log(largestWordCount(["Hello userTwooo","Hi userThree","Wonderful day Alice","Nice day userThree"], ["Alice","userTwo","userThree","Alice"])) // "Alice"
console.log(largestWordCount(["How is leetcode for everyone","Leetcode is useful for practice"], ["Bob","Charlie"])) // "Charlie"