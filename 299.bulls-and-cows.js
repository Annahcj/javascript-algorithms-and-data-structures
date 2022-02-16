// 299. Bulls and Cows
// You are playing the Bulls and Cows game with your friend.
// You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:
  // The number of "bulls", which are digits in the guess that are in the correct position.
  // The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
// Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.
// The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both secret and guess may contain duplicate digits.


// Solution: Two Pass w/ Hashmap

// 1. Pass 1 -> Count the bulls and add non-matching digits to their frequency map.
// 2. Loop through the keys in one hashmap, add the minimum frequency of the key to the cows count.

// Time Complexity: O(n) 114ms
// Space Complexity; O(1) (maximum 10 different digits) 44.2MB
var getHint = function(secret, guess) {
  let secretFreq = {}, guessFreq = {};
  let n = secret.length, bulls = 0, cows = 0;
  for (let i = 0; i < n; i++) {
    if (secret[i] === guess[i]) bulls++;
    else {
      secretFreq[secret[i]] = (secretFreq[secret[i]] || 0) + 1;
      guessFreq[guess[i]] = (guessFreq[guess[i]] || 0) + 1;
    }
  }
  for (let digit in secretFreq) {
    let sFreq = secretFreq[digit], gFreq = guessFreq[digit] || 0;
    cows += Math.min(sFreq, gFreq);
  }
  return `${bulls}A${cows}B`;
};

// Two test cases to run function on
console.log(getHint("1807", "7810")) // "1A3B" 
console.log(getHint("1123", "0111")) // "1A1B" 