// 3403. Find the Lexicographically Largest String From the Box I
// You are given a string word, and an integer numFriends.
// Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:
  // word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
  // All the split words are put into a box.
// Find the lexicographically largest string from the box after all the rounds are finished.
// A string a is lexicographically smaller than a string b if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b.
// If the first min(a.length, b.length) characters do not differ, then the shorter string is the lexicographically smaller one.


// Solution: Greedy

// Try out every starting index.
// Greedily take the longest possible substring as that will be lexicographically the largest.
// To determine the longest substring length we can take for a given start index i:
  // max splits already taken = Math.min(i, numFriends - 1) (taking splits of one char each)
  // the largest substring end index = n - (numFriends - splitsTaken)

// For every substring we try out, compare it with the current largest substring.

// n = length of word
// Time Complexity: O(n^2) 4ms
// Space Complexity: O(n) 51.71MB
function answerString(word, numFriends) {
  if (numFriends === 1) return word;
  let largest = "", n = word.length;
  for (let i = 0; i < n; i++) {
    const maxSplits = Math.min(i, numFriends - 1);
    const endIndex = n - (numFriends - maxSplits);
    const substr = word.slice(i, endIndex + 1);
    if (substr > largest) {
      largest = substr;
    }
  }
  return largest;
};

// Two test cases
console.log(answerString("dbca", 2)) // "dbc"
console.log(answerString("gggg", 4)) // "g"