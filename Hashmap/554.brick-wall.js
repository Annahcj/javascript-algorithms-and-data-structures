// 554. Brick Wall
// There is a rectangular brick wall in front of you with n rows of bricks. The ith row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.
// Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.
// Given the 2D array wall that contains the information about the wall, return the minimum number of crossed bricks after drawing such a vertical line.


// Solution: Hashmap

// Count the number of edges at the same position.
// Only record positions at known edges since we know there can be less crossed bricks.
// Get the maximum count of edges at one position.

// This solution is fast enough because we know sum(wall[i].length) <= 2 * 10^4

// n = total number of bricks
// Time Complexity: O(n) 131ms
// Space Complexity: O(n) 47.9MB
var leastBricks = function(wall) {
  let edges = new Map(), maxEdges = 0;
  for (let i = 0; i < wall.length; i++) {
    let sum = 0;
    for (let j = 0; j < wall[i].length - 1; j++) {
      sum += wall[i][j];
      edges.set(sum, (edges.get(sum) || 0) + 1);
      maxEdges = Math.max(maxEdges, edges.get(sum));
    }
  }
  return wall.length - maxEdges;
};

// Two test cases to run function on
console.log(leastBricks([[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]])) // 2
console.log(leastBricks([[1],[1],[1]])) // 3