// 843. Guess the Word
// You are given an array of unique strings wordlist where wordlist[i] is 6 letters long, and one word in this list is chosen as secret.
// You may call Master.guess(word) to guess a word. The guessed word should have type string and must be from the original list with 6 lowercase letters.
// This function returns an integer type, representing the number of exact matches (value and position) of your guess to the secret word. Also, if your guess is not in the given wordlist, it will return -1 instead.
// For each test case, you have exactly 10 guesses to guess the word. At the end of any number of calls, if you have made 10 or fewer calls to Master.guess and at least one of these guesses was secret, then you pass the test case.


// Solution: Randomize, filter, repeat.

// 1. Pick a random word from the wordlist.
// 2. Filter wordlist to words that contain the same amount of matching characters (* will explain later).
// 3. Repeat step 1 & 2 for 10 iterations (since we only have 10 guesses).

// * Why we only keep words with the SAME amount of matching characters instead of >=.
  // A good example is when we have 0 matching characters. Imagine picking a word with 1 or more matching characters, it would be totally off!
  // That's why the amount of matching characters has to be the same.

// Time Complexity: O(10n) = O(n) 64ms
// Space Complexity: O(n) 38.9MB
var findSecretWord = function(wordlist, master) {
  for (var i = 0; i < 10; i++) {
    let n = wordlist.length;
    let randomIdx = Math.floor(Math.random() * n);
    let randomWord = wordlist[randomIdx];
    let matches = master.guess(randomWord);
    
    let wordlist2 = [];
    for (var word of wordlist) {
      if (numMatches(randomWord, word) === matches) {
        wordlist2.push(word);
      }
    }
    wordlist = wordlist2;
  }
  
  function numMatches(word1, word2) {
    let matches = 0;
    for (var i = 0; i < 6; i++) {
      if (word1[i] === word2[i]) matches++;
    }
    return matches;
  }  
};