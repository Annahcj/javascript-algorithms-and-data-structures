// 3027. Find the Number of Ways to Place People II
// You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
// We define the right direction as positive x-axis (increasing x-coordinate) and the left direction as negative x-axis (decreasing x-coordinate). Similarly, we define the up direction as positive y-axis (increasing y-coordinate) and the down direction as negative y-axis (decreasing y-coordinate)
// You have to place n people, including Alice and Bob, at these points such that there is exactly one person at every point. Alice wants to be alone with Bob, so Alice will build a rectangular fence with Alice's position as the upper left corner and Bob's position as the lower right corner of the fence (Note that the fence might not enclose any area, i.e. it can be a line). If any person other than Alice and Bob is either inside the fence or on the fence, Alice will be sad.
// Return the number of pairs of points where you can place Alice and Bob, such that Alice does not become sad on building the fence.
// Note that Alice can only build a fence with Alice's position as the upper left corner, and Bob's position as the lower right corner. For example, Alice cannot build either of the fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and (3, 3), because:
  // With Alice at (3, 3) and Bob at (1, 1), Alice's position is not the upper left corner and Bob's position is not the lower right corner of the fence.
  // With Alice at (1, 3) and Bob at (1, 1), Bob's position is not the lower right corner of the fence.


// Solution: Sorting & Logic

// Sort points by the x-coordinate in asc order (left-to-right), if the x-coordinate is equal, sort by y-coordinate in desc order (top-to-bottom).
// Now that the x-coordinate is sorted, we only need to deal with the y-coordinate.

// For each point i, find points on the right of index i (after sorting by x), where the y coordinate > than the previous pair point.
  // Explanation: Points further right and strictly further up will never overlap with each other.

// This logic also works for cases where the x or y coordinates are equal.
  // x coordinate equal: Takes the highest point below point[i].
  // y coordinate equal: Takes the leftmost point on the right of point[i].

// e.g: 
  // 6 |
  // 5 |
  // 4 | *         *
  // 3 | 
  // 2 | *   *
  // 1 | *
  //   0 _ _ _ _ _ _ _
  //     1 2 3 4 5 6 7

  // The points sorted by x, then y in desc order:
    // [[1,4],[1,2],[1,1],[3,2],[6,4]]

  // Let's find the pairs which include point (1,4):
    // j = 1: The point (1,2) can be taken because it is below the point (1,4).
    // j = 2: The point (1,1) cannot be taken because the previously taken point (1,2) had y coordinate higher than (1,1).
    // j = 3: The point (3,2) cannot be taken because the previously taken point (1,2) had y coordinate equal to (3,2), meaning it would be on the fence.
    // j = 4: The point (6,4) can be taken because the y coordinate is higher than the previously taken point, but still below point (1,4).

// n = number of points
// Time Complexity: O(n^2) 200ms
// Space Complexity: O(log(n)) 54.9MB
var numberOfPairs = function(points) {
  points.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
  let n = points.length, validPairs = 0;
  for (let i = 0; i < n; i++) {
    let prevPointIndex = -1;
    for (let j = i + 1; j < n; j++) {
      // if point j is below or same y-coordinate as point i
      if (points[j][1] <= points[i][1]) {
        // if current point is further up than pointIndex, we can take another pair.
        if (prevPointIndex === -1 || points[j][1] > points[prevPointIndex][1]) {
          validPairs++;
          prevPointIndex = j;
        }          
      }
    }
  }
  return validPairs;
};

// Three test cases
console.log(numberOfPairs([[1,1],[2,2],[3,3]])) // 0
console.log(numberOfPairs([[6,2],[4,4],[2,6]])) // 2
console.log(numberOfPairs([[3,1],[1,3],[1,1]])) // 2