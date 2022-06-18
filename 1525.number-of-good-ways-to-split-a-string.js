// 1525. Number of Good Ways to Split a String
// You are given a string s.
// A split is called good if you can split s into two non-empty strings sleft and sright where their concatenation is equal to s (i.e., sleft + sright = s) and the number of distinct letters in sleft and sright is the same.
// Return the number of good splits you can make in s.


// Solution: Count Frequency in Arrays

// Keep track of four things:
  // leftCount: leftCount[i] = the frequency of character i on the left
  // rightCount: rightCount[i] = the frequency of character i on the right
  // distinctLeft: the number of distinct characters on the left
  // distinctRight: the number of distinct characters on the right

// For the right count, initially add all the characters in s.
// As the move from left to right, we can remove the characters from rightCount.

// How to count distinctLeft and distinctRight:
  // Before we increment the frequency of a character for the left, check whether the count is 0, this means that we gain a distinct character.
  // After we decrement the frequency of a character for the right, check whether the count is 0, this means that we lose a distinct character.

// Time Complexity: O(n) 103ms
// Space Complexity: O(26) = O(1) 45MB
var numSplits = function(s) {
  let distinctLeft = 0, distinctRight = 0;
  let leftCount = Array(26).fill(0), rightCount = Array(26).fill(0);
  for (let char of s) {
    let charcode = char.charCodeAt() - 97;
    if (rightCount[charcode]++ === 0) distinctRight++;
  }
  
  let ans = 0;
  for (let i = 0; i < s.length - 1; i++) {
    let charcode = s.charCodeAt(i) - 97;
    if (leftCount[charcode]++ === 0) distinctLeft++;
    if (--rightCount[charcode] === 0) distinctRight--;
    if (distinctLeft === distinctRight) ans++;
  }
  return ans;
};

// Three test cases to run function on
console.log(numSplits("aacaba")) // 2
console.log(numSplits("abcd")) // 1
console.log(numSplits("a")) // 0