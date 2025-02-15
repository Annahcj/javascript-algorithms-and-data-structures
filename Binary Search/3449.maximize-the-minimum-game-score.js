// 3449. Maximize the Minimum Game Score
// You are given an array points of size n and an integer m. There is another array gameScore of size n, where gameScore[i] represents the score achieved at the ith game. Initially, gameScore[i] == 0 for all i.
// You start at index -1, which is outside the array (before the first position at index 0). You can make at most m moves. In each move, you can either:
  // Increase the index by 1 and add points[i] to gameScore[i].
  // Decrease the index by 1 and add points[i] to gameScore[i].
// Note that the index must always remain within the bounds of the array after the first move.
// Return the maximum possible minimum value in gameScore after at most m moves.


// Solution: Binary Search & Greedy

// Binary search for maximum minimum value in gameScore.
// For a value x, check whether it takes less than m total moves to turn every points[i] into at least x.

// For every points[i], we need to go back-and-forth between index i and i+1.
// There is no other way that will guarantee less moves.

// n = number of points, m = upper bound of binary search (min(points[i]) * m)
// Time Complexity: O(n log(m)) 219ms
// Space Complexity: O(1) 65.16MB
function maxScore(points, m) {
  const min = Math.min(...points);
  let low = 0, high = min * m;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (isPossible(points, m, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isPossible(points, maxMoves, minPoints) {
  let moves = 0, used = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const timesToVisit = Math.ceil(minPoints / points[i]) - used;
    // usually, we'd always need to move forward to the current index, but the last index is an exception.
    // if we've already visited it a sufficient number of times, we can skip coming back to the last index.
    if (i === n - 1 && timesToVisit <= 0) return true;
    moves += 1 + 2 * Math.max(0, timesToVisit - 1);
    used = Math.max(0, timesToVisit - 1);
    if (moves > maxMoves) return false;
  }
  return true;
}

// Two test cases
console.log(maxScore([2,4], 3)) // 4
console.log(maxScore([1,2,3], 5)) // 2