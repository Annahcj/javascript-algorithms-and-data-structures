// 506. Relative Ranks
// You are given an integer array score of size n, where score[i] is the score of the ith athlete in a competition. All the scores are guaranteed to be unique.
// The athletes are placed based on their scores, where the 1st place athlete has the highest score, the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines their rank:
  // The 1st place athlete's rank is "Gold Medal".
  // The 2nd place athlete's rank is "Silver Medal".
  // The 3rd place athlete's rank is "Bronze Medal".
  // For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").
// Return an array answer of size n where answer[i] is the rank of the ith athlete.


// Solution: Sorting

// 1. Map each score to its index and sort it in desc order by score.
// 2. Go through each score in sorted order and assign the rank to the answer at the index mapped to it.

// n = length of score
// Time Complexity: O(n log(n)) 89ms
// Space Complexity: O(n) 52.7MB
var findRelativeRanks = function(score) {
  let n = score.length, sortedScores = score.map((val, i) => [val, i]).sort((a, b) => b[0] - a[0]);
  let ans = Array(n);
  for (let i = 0; i < n; i++) {
    let [_, index] = sortedScores[i];
    ans[index] = getScore(i);
  }
  return ans;
};

function getScore(index) {
  if (index === 0) {
    return 'Gold Medal';
  }
  if (index === 1) {
    return 'Silver Medal';
  }
  if (index === 2) {
    return 'Bronze Medal';
  }
  return (index + 1).toString();
}

// Two test cases
console.log(findRelativeRanks([5,4,3,2,1])) // ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
console.log(findRelativeRanks([10,3,8,9,4])) // ["Gold Medal","5","Bronze Medal","Silver Medal","4"]