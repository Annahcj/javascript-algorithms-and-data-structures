// 2555. Maximize Win From Two Segments
// There are some prizes on the X-axis. You are given an integer array prizePositions that is sorted in non-decreasing order, where prizePositions[i] is the position of the ith prize. There could be different prizes at the same position on the line. You are also given an integer k.
// You are allowed to select two segments with integer endpoints. The length of each segment must be k. You will collect all prizes whose position falls within at least one of the two selected segments (including the endpoints of the segments). The two selected segments may intersect.
  // For example if k = 2, you can choose segments [1, 3] and [2, 4], and you will win any prize i that satisfies 1 <= prizePositions[i] <= 3 or 2 <= prizePositions[i] <= 4.
// Return the maximum number of prizes you can win if you choose the two segments optimally.


// Solution: Sliding Window 

// Maintain a sliding window with two pointers (i, j), where positions[j] - positions[i] <= k.
// Populate each maxPoints, where maxPoints[j] = the maximum length of a sliding window ending at index j or less.

// First segment: maxPoints[i - 1]
// Second segment: The current window length (j - i + 1)
// Record the maximum maxPoints[i - 1] + (j - i + 1)

// Time Complexity: O(n) 82ms
// Space Complexity: O(n) 51.8MB
var maximizeWin = function(prizePositions, k) {
  let n = prizePositions.length, maxPoints = Array(n).fill(0), ans = 0; 
  for (let j = 0, i = 0; j < n; j++) {
    while (i < j && prizePositions[j] - prizePositions[i] > k) {
      i++;
    }
    maxPoints[j] = j === 0 ? j - i + 1 : Math.max(maxPoints[j - 1], j - i + 1);
    let firstSegment = i === 0 ? 0 : maxPoints[i - 1];
    let secondSegment = j - i + 1;
    ans = Math.max(ans, firstSegment + secondSegment);
  }
  return ans;
};

// Two test cases
console.log(maximizeWin([1,1,2,2,3,3,5], 2)) // 7
console.log(maximizeWin([1,2,3,4], 0)) // 2