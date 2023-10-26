// 679. 24 Game
// You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.
// You are restricted with the following rules:
  // The division operator '/' represents real division, not integer division.
    // For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
  // Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
    // For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
  // You cannot concatenate numbers together
    // For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
// Return true if you can get such expression that evaluates to 24, and false otherwise.


// Solution: Backtracking

// Use backtracking to try all the combinations.
// For backtrack(nums), go through each pair of numbers and try every possible operation between the two numbers.
// If a result approximately evalutes to 24 with a tolerance of 0.001 (can be bigger), then we return true.

var judgePoint24 = function(cards) {
  let canEvaluateTo24 = false;
  backtrack(cards);
  return canEvaluateTo24;
  
  function backtrack(nums) {
    if (nums.length === 1) {
      if (Math.abs(nums[0] - 24) < 0.001) { // approximately 24
        canEvaluateTo24 = true;
      }
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        let options = [nums[i] + nums[j], nums[i] - nums[j], nums[j] - nums[i], nums[i] * nums[j], nums[i] / nums[j], nums[j] / nums[i]];
        for (let option of options) {
          let updated = [...nums.filter((_num, idx) => idx !== i && idx !== j), option];
          backtrack(updated);
        }
      }
    }
  }
};

// Two test cases
console.log(judgePoint24([4,1,8,7])) // true
console.log(judgePoint24([1,2,1,2])) // false