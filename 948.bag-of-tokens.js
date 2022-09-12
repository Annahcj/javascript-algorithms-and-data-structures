// 948. Bag of Tokens
// You have an initial power of power, an initial score of 0, and a bag of tokens where tokens[i] is the value of the ith token (0-indexed).
// Your goal is to maximize your total score by potentially playing each token in one of two ways:
  // If your current power is at least tokens[i], you may play the ith token face up, losing tokens[i] power and gaining 1 score.
  // If your current score is at least 1, you may play the ith token face down, gaining tokens[i] power and losing 1 score.
// Each token may be played at most once and in any order. You do not have to play all the tokens.
// Return the largest possible score you can achieve after playing any number of tokens.


// Solution: Greedy - Sorting & Two Pointers

// It is optimal to take the tokens (face up) with least power to gain the most score.
// When we run out of power, it is optimal to take the tokens (face down) with the most power to gain more power.

// Sort tokens by power.
// Use two pointers (at the start and end) on the sorted tokens.
// Keep track of the current power and score we have.
// When we run out of power, take tokens from the back until we have enough power to get a token from the front.

// Time Complexity: O(n log(n)) 113ms
// Space Complexity: O(log(n)) (space for sorting) 43.7MB
var bagOfTokensScore = function(tokens, power) {
  tokens.sort((a, b) => a - b);
  let i = 0, j = tokens.length - 1, score = 0;
  while (i <= j) {
    while (j > i && power < tokens[i] && score > 0) {
      power += tokens[j--];
      score--;
    }
    if (power >= tokens[i]) {
      power -= tokens[i];
      score++;
    }
    i++;
  }
  return score;
};

// Three test cases to run function on
console.log(bagOfTokensScore([100],50)) // 0
console.log(bagOfTokensScore([100,200], 150)) // 1
console.log(bagOfTokensScore([100,200,300,400],200)) // 2