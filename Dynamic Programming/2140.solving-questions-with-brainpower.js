// 2140. Solving Questions With Brainpower
// You are given a 0-indexed 2D integer array questions where questions[i] = [pointsi, brainpoweri].
// The array describes the questions of an exam, where you have to process the questions in order (i.e., starting from question 0) and make a decision whether to solve or skip each question. Solving question i will earn you pointsi points but you will be unable to solve each of the next brainpoweri questions. If you skip question i, you get to make the decision on the next question.
  // For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
    // If question 0 is solved, you will earn 3 points but you will be unable to solve questions 1 and 2.
    // If instead, question 0 is skipped and question 1 is solved, you will earn 4 points but you will be unable to solve questions 2 and 3.
// Return the maximum points you can earn for the exam.


// Solution: Dynamic Programming

// Work backwards, calculating the maximum points for each position.
// For each i, we only need to know the maximum of the points beyond the next exam we are allowed to take.

// So, each maxPoints[i] = maximum points from this exam onwards.
// Each position, we take the best of
  // 1. The current points + the maximum of next allowed exams 
  // 2. maxPoints[i + 1] (the previously calculated points (on the right))

// Time Complexity: O(n) 157ms
// Space Complexity: O(n) 74.4MB
var mostPoints = function(questions) {
  let n = questions.length;
  let maxPoints = Array(n).fill(0), ans = 0;
  for (let i = n - 1; i >= 0; i--) {
    let [points, skip] = questions[i];
    let nextExam = i + skip + 1 >= n ? 0 : maxPoints[i + skip + 1];
    let next = i === n - 1 ? 0 : maxPoints[i + 1];
    maxPoints[i] = Math.max(points + nextExam, next);
    ans = Math.max(ans, maxPoints[i]);
  }
  return ans;
};

// Two test cases
console.log(mostPoints([[3,2],[4,3],[4,4],[2,5]])) // 5
console.log(mostPoints([[1,1],[2,2],[3,3],[4,4],[5,5]])) // 7