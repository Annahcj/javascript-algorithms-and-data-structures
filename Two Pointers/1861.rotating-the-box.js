// 1861. Rotating the Box
// You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:
  // A stone '#'
  // A stationary obstacle '*'
  // Empty '.'
// The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.
// It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.
// Return an n x m matrix representing the box after the rotation described above.


// Solution: Rotate & Two Pointers

// 1. Rotate the box 90 degrees clockwise
// 2. Use two pointers to drop the stones as far down as possible

// Time Complexity: O(mn) 444ms
// Space Complexity: O(mn) 72.6MB
var rotateTheBox = function(box) {
  let m = box.length, n = box[0].length;
  let newBox = Array(n).fill(0).map(() => Array(m));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      newBox[j][m - 1 - i] = box[i][j];
    }
  }

  for (let col = 0; col < m; col++) {
    let bottom = n - 1;
    while (bottom > 0 && newBox[bottom][col] === '*') bottom--; // find first position to drop to (first non-obstalce)
    for (let top = n - 1; top >= 0; top--) {
      if (newBox[top][col] === '*') { // obstacle is found, update next position to drop to 
        bottom = top - 1;
      } else if (newBox[top][col] === '#') { // drop stone, swap, move bottom up.
        newBox[top][col] = newBox[bottom][col];
        newBox[bottom][col] = '#';
        bottom--;
      }
    }
  }

  return newBox;
};

// Three test cases
console.log(rotateTheBox([["#","#","*",".","*","."],["#","#","#","*",".","."],["#","#","#",".","#","."]])) // [[".","#","#"],[".","#","#"],["#","#","*"],["#","*","."],["#",".","*"],["#",".","."]]
console.log(rotateTheBox([["#",".","*","."],["#","#","*","."]])) // [["#","."],["#","#"],["*","*"],[".","."]]
console.log(rotateTheBox([["#",".","#"]])) // [["."],["#"],["#"]]