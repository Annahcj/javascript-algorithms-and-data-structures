// 2545. Sort the Students by Their Kth Score
// There is a class with m students and n exams. You are given a 0-indexed m x n integer matrix score, where each row represents one student and score[i][j] denotes the score the ith student got in the jth exam. The matrix score contains distinct integers only.
// You are also given an integer k. Sort the students (i.e., the rows of the matrix) by their scores in the kth (0-indexed) exam from the highest to the lowest.
// Return the matrix after sorting it.


// Solution: Sort Rows

// Sort the rows by score[i][k] in desc order.

// n = number of rows
// Time Complexity: O(n log(n)) 200ms
// Space Complexity: O(log(n)) (space for sorting) 51.3MB
var sortTheStudents = function(score, k) {
  return score.sort((a, b) => b[k] - a[k]);
};

// Two test cases
console.log(sortTheStudents([[10,6,9,1],[7,5,11,2],[4,8,3,15]], 2)) // [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
console.log(sortTheStudents([[3,4],[5,6]], 0)) // [[5,6],[3,4]]