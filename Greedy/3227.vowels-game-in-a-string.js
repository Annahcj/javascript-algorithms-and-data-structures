// 3227. Vowels Game in a String
// Alice and Bob are playing a game on a string.
// You are given a string s, Alice and Bob will take turns playing the following game where Alice starts first:
  // On Alice's turn, she has to remove any non-empty substring from s that contains an odd number of vowels.
  // On Bob's turn, he has to remove any non-empty substring from s that contains an even number of vowels.
// The first player who cannot make a move on their turn loses the game. We assume that both Alice and Bob play optimally.
// Return true if Alice wins the game, and false otherwise.
// The English vowels are: a, e, i, o, and u.


// Solution: Greedy

// If the number of vowels is even: 
  // Alice will always win because she can remove an odd number of vowels, leaving an odd number of vowels.
  // Bob will then pick a substring with an even number of vowels, leaving a substring with an odd number of vowels for Alice to pick the entire string.

// If the number of vowels is odd:
  // Alice will always win because she can just take the entire string.

// Edge case: If there are no vowels, Alice will always lose.

// In summary, Alice always wins unless there are no vowels.

// Time Complexity: O(n) 101ms
// Space Complexity: O(1) 53.3MB
function doesAliceWin(s) {
  let vowels = 0;
  for (let char of s) {
    if (['a', 'e', 'i', 'o', 'u'].includes(char)) {
      vowels++;
    }
  }
  return vowels > 0;
};

// Two test cases
console.log(doesAliceWin("leetcoder")) // true
console.log(doesAliceWin("bbcd")) // false