// 2512. Reward Top K Students
// You are given two string arrays positive_feedback and negative_feedback, containing the words denoting positive and negative feedback, respectively. Note that no word is both positive and negative.
// Initially every student has 0 points. Each positive word in a feedback report increases the points of a student by 3, whereas each negative word decreases the points by 1.
// You are given n feedback reports, represented by a 0-indexed string array report and a 0-indexed integer array student_id, where student_id[i] represents the ID of the student who has received the feedback report report[i]. The ID of each student is unique.
// Given an integer k, return the top k students after ranking them in non-increasing order by their points. In case more than one student has the same points, the one with the lower ID ranks higher.


// Solution: Hashset & Sorting

// Store positive and negative words in hashsets for quick lookup.
// Split each report by spaces and check whether each word is in the positive or negative words hashset.
// After getting the score for each student, we can sort by the score and return the first k students.

// n = number of students, m = number of words in each report[i], w = number of positive and negative words
// Time Complexity: O(nm + w + n log(n)) 210ms
// Space Complexity: O(n + w) 62.8MB
var topStudents = function(positive_feedback, negative_feedback, report, student_id, k) {
  let positive = new Set(positive_feedback);
  let negative = new Set(negative_feedback);
  let n = report.length, students = [];
  for (let i = 0; i < n; i++) {
    students.push([student_id[i], getScore(report[i])]);
  }
  students.sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : a[0] - b[0]);
  return students.slice(0, k).map(([id]) => id);
  
  function getScore(report) {
    let words = report.split(" ");
    let score = 0;
    for (let word of words) {
      if (positive.has(word)) score += 3;
      if (negative.has(word)) score -= 1;
    }
    return score;
  }
};

// Two test cases
console.log(topStudents(["smart","brilliant","studious"], ["not"], ["this student is studious","the student is smart"], [1,2], 2)) // [1,2]
console.log(topStudents(["smart","brilliant","studious"], ["not"], ["this student is not studious","the student is smart"], [1,2], 2)) // [2,1]