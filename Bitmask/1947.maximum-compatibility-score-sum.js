// 1947. Maximum Compatibility Score Sum
// There is a survey that consists of n questions where each question's answer is either 0 (no) or 1 (yes).
// The survey was given to m students numbered from 0 to m - 1 and m mentors numbered from 0 to m - 1. The answers of the students are represented by a 2D integer array students where students[i] is an integer array that contains the answers of the ith student (0-indexed). The answers of the mentors are represented by a 2D integer array mentors where mentors[j] is an integer array that contains the answers of the jth mentor (0-indexed).
// Each student will be assigned to one mentor, and each mentor will have one student assigned to them. The compatibility score of a student-mentor pair is the number of answers that are the same for both the student and the mentor.
  // For example, if the student's answers were [1, 0, 1] and the mentor's answers were [0, 0, 1], then their compatibility score is 2 because only the second and the third answers are the same.
// You are tasked with finding the optimal student-mentor pairings to maximize the sum of the compatibility scores.
// Given students and mentors, return the maximum compatibility score sum that can be achieved.


// Solution: DP w/ Bitmasks

// Memoize each dp(i, mask), where
  // i = the ith student
  // mask = bitmask of mentors that have been assigned a student

// For each student, try to assign a free mentor and record the best result.

// Time Complexity: O(m * 2^m * mn) 119ms
// Space Complexity: O(m * 2^m) 42.8MB
var maxCompatibilitySum = function(students, mentors) {
  let m = students.length, n = students[0].length;
  let memo = Array(m).fill(0).map(() => Array(1 << m).fill(-1));
  return dp(0, 0);
  
  function dp(i, mask) {
    if (i === m) return 0;
    if (memo[i][mask] !== -1) return memo[i][mask];
    
    let ans = 0;
    for (let j = 0; j < m; j++) {
      if ((mask >> j) & 1) continue; // mentor j already has a student assigned
      ans = Math.max(ans, dp(i + 1, mask | (1 << j)) + getScore(students[i], mentors[j]));
    }
    return memo[i][mask] = ans;
  }
  
  function getScore(scores1, scores2) {
    let score = 0;
    for (let i = 0; i < n; i++) {
      score += scores1[i] == scores2[i] ? 1 : 0;
    }
    return score;
  }
};

// Two test cases
console.log(maxCompatibilitySum([[1,1,0],[1,0,1],[0,0,1]], [[1,0,0],[0,0,1],[1,1,0]])) // 8
console.log(maxCompatibilitySum([[0,0],[0,0],[0,0]], [[1,1],[1,1],[1,1]])) // 0