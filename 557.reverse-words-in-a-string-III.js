// 557. Reverse Words in a String III
// Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.


// Solution: Built-in Functions

// 1. Split the string by spaces.
// 2. For each word, split into an array, reverse, and join it back into a string.
// 3. Join the reversed words back into a string separated by spaces.

// Time Complexity: O(n^2) (worst case) 135ms
// Space Complexity: O(n) 48.4MB
var reverseWords = function(s) {
  return s.split(" ").map((word) => word.split("").reverse().join("")).join(" ");
};

// Two test cases to run function on
console.log(reverseWords("Let's take LeetCode contest")) // "s'teL ekat edoCteeL tsetnoc"
console.log(reverseWords("God Ding")) // "doG gniD"