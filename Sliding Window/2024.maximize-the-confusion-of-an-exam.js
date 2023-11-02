// 2024. Maximize the Confusion of an Exam
// A teacher is writing a test with n true/false questions, with 'T' denoting true and 'F' denoting false. He wants to confuse the students by maximizing the number of consecutive questions with the same answer (multiple trues or multiple falses in a row).
// You are given a string answerKey, where answerKey[i] is the original answer to the ith question. In addition, you are given an integer k, the maximum number of times you may perform the following operation:
  // Change the answer key for any question to 'T' or 'F' (i.e., set answerKey[i] to 'T' or 'F').
// Return the maximum number of consecutive 'T's or 'F's in the answer key after performing the operation at most k times.


// Solution: Sliding Window

// Maintain a sliding window with at most k opposite characters (if there are more T's, F, otherwise if there are more F's, then T)
  // This can be checked by getting the minimum out of the number of T's and F's.
// When this condition is broken, move up the left pointer until the condition is satisfied.

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 46.3MB
var maxConsecutiveAnswers = function(answerKey, k) {
  let t = 0, f = 0, ans = 0;
  for (let j = 0, i = 0; j < answerKey.length; j++) {
    t += answerKey[j] === 'T' ? 1 : 0;
    f += answerKey[j] === 'F' ? 1 : 0;
    while (Math.min(t, f) > k) {
      t -= answerKey[i] === 'T' ? 1 : 0;
      f -= answerKey[i] === 'F' ? 1 : 0;
      i++;
    }
    ans = Math.max(ans, j - i + 1);
  }
  return ans;
};

// Two test cases
console.log(maxConsecutiveAnswers("TTFF", 2)) // 4
console.log(maxConsecutiveAnswers("TFFT", 1)) // 3