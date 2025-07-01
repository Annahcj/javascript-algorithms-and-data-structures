// 3330. Find the Original Typed String I
// Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
// Although Alice tried to focus on her typing, she is aware that she may still have done this at most once.
// You are given a string word, which represents the final output displayed on Alice's screen.
// Return the total number of possible original strings that Alice might have intended to type.


// Solution: Counting

// Find the groups of consecutively equal characters with more than one occurrance.
// For each group, the possible strings is equal to the occurrances in the group - 1.
// Get the sum of occurrances-1.

// Time Complexity: O(n) 45ms
// Space Complexity: O(1) 54MB
function possibleStringCount(word) {
  let consec = 1, count = 0;
  const n = word.length;  
  for (let i = 1; i < n; i++) {
    if (word[i] === word[i - 1]) {
      consec++;
    } else {
      count += consec > 1 ? consec - 1 : 0;
      consec = 1;
    }
  }
  if (consec > 1) {
    count += consec - 1;
  }
  return count + 1; // the original string itself
};

// Three test cases
console.log(possibleStringCount("abbcccc")) // 5
console.log(possibleStringCount("abcd")) // 1
console.log(possibleStringCount("aaaa")) // 4