// 2019. The Score of Students Solving Math Expression
// You are given a string s that contains digits 0-9, addition symbols '+', and multiplication symbols '*' only, representing a valid math expression of single digit numbers (e.g., 3+5*2). This expression was given to n elementary school students. The students were instructed to get the answer of the expression by following this order of operations:
  // Compute multiplication, reading from left to right; Then,
  // Compute addition, reading from left to right.
// You are given an integer array answers of length n, which are the submitted answers of the students in no particular order. You are asked to grade the answers, by following these rules:
  // If an answer equals the correct answer of the expression, this student will be rewarded 5 points;
  // Otherwise, if the answer could be interpreted as if the student applied the operators in the wrong order but had correct arithmetic, this student will be rewarded 2 points;
  // Otherwise, this student will be rewarded 0 points.
// Return the sum of the points of the students.


// Solution: DP 

// Memoize each dp(i, j), where dp(i, j) = all the possible results for the substring in range (i, j).
// For each dp(i, j), try taking each operand answers[k] as the last operand within the substring in range (i, j).
// In other words, we apply parentheses on the left and right parts of each possible split. The left and right parts will then recursively apply the same logic on the substrings.
  // For splitting at the operand s[k], 
    // Left results: dp(i, k - 1) 
    // Right results: dp(k + 1, j)
  // Get all combinations between the left and right results.

// e.g: 1+2*3+4*5
  // dp(0, 8):
    // k = 1: (1)+(2*3+4*5)
    // k = 3: (1+2)*(3+4*5)
    // k = 5: (1+2*3)+(4*5)
    // k = 7: (1+2*3+4)*(5)

var scoreOfStudents = function(s, answers) {
  let n = s.length, memo = Array(n).fill(0).map(() => Array(n).fill(null));
  let possibleAnswers = dp(0, n - 1);
  let actualAnswer = evaluate(s);
  let totalPoints = 0;
  for (let answer of answers) {
    if (answer === actualAnswer) totalPoints += 5;
    else if (possibleAnswers.has(answer)) totalPoints += 2;
  }
  return totalPoints;
  
  function dp(i, j) {
    if (i === j) return new Set([Number(s[i])]);
    if (memo[i][j] !== null) return memo[i][j];
    
    let ans = new Set();
    for (let k = i + 1; k <= j; k += 2) { // go through each operator
      let left = dp(i, k - 1), right = dp(k + 1, j);
      for (let resLeft of left) {
        for (let resRight of right) {
          let res = s[k] === '+' ? resLeft + resRight : resLeft * resRight;
          if (res <= 1000) ans.add(res); // pruning
        }
      }
    }
    return memo[i][j] = ans;
  }
  
  function evaluate(s) {
    let stack = [Number(s[0])];
    for (let i = 2; i < n; i += 2) {
      if (s[i - 1] === '+') stack.push(Number(s[i]));
      else stack.push(stack.pop() * Number(s[i]));
    }
    return stack.reduce((sum, num) => sum + num);
  }
};

// Three test cases
console.log(scoreOfStudents("7+3*1*2", [20,13,42])) // 7
console.log(scoreOfStudents("3+5*2", [13,0,10,13,13,16,16])) // 19
console.log(scoreOfStudents("6+0*1", [12,9,6,4,8,6])) // 10