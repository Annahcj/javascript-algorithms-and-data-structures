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

// Time Complexity: O(n log(n)) 61ms
// Space Complexity: O(log(n)) (space for sorting) 50.5MB
var bagOfTokensScore = function(tokens, power) {
  tokens.sort((a, b) => a - b);
  let left = 0, right = tokens.length - 1;
  let score = 0;
  while (left < right) {
    if (power >= tokens[left]) {
      power -= tokens[left];
      left++, score++;
    } else if (score > 0) {
      power += tokens[right];
      right--, score--;
    } else {
      break;
    }
  }
  score += power >= tokens[left] ? 1 : 0;
  return Math.max(0, score);
};

// Three test cases 
console.log(bagOfTokensScore([100],50)) // 0
console.log(bagOfTokensScore([100,200], 150)) // 1
console.log(bagOfTokensScore([100,200,300,400],200)) // 2