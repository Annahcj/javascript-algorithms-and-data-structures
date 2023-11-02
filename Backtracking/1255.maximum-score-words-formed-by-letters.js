// 1255. Maximum Score Words Formed by Letters
// Given a list of words, list of  single letters (might be repeating) and score of every character.
// Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).
// It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.


// Solution: Backtracking

// For each words[i], we either take it (if we can) or don't take it. Record the maximum result.
// Keep track of the count of each character.

// n = number of words, m = words[i].length
// Time Complexity: O(2^n * m) 96ms
// Space Complexity: O(n + m) 44.7MB
var maxScoreWords = function(words, letters, score) {
  let n = words.length, count = Array(26).fill(0);
  for (let char of letters) {
    count[char.charCodeAt(0) - 97]++;
  }
  return backtrack(0, count);
  
  function backtrack(i, count) {
    if (i === n) return 0;

    let maxScore = backtrack(i + 1, count), newCount = getNewCount(words[i], count);
    if (newCount) { // if we can take it
      maxScore = Math.max(maxScore, backtrack(i + 1, newCount) + getScore(words[i]));
    }
    return maxScore;
  }
  
  function getNewCount(word, count) {
    let newCount = [...count];
    for (let i = 0; i < word.length; i++) {
      if (--newCount[word.charCodeAt(i) - 97] < 0) return null;
    }
    return newCount;
  }
  
  function getScore(word) {
    let totalScore = 0;
    for (let i = 0; i < word.length; i++) {
      totalScore += score[word.charCodeAt(i) - 97];
    }
    return totalScore;
  }
};

// Two test cases 
console.log(maxScoreWords(["dog","cat","dad","good"], ["a","a","c","d","d","d","g","o","o"], [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0])) // 23
console.log(maxScoreWords(["xxxz","ax","bx","cx"], ["z","a","b","c","x","x","x"], [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10])) // 27