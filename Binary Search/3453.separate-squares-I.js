// 3453. Separate Squares I
// You are given a 2D integer array squares. Each squares[i] = [x[i], y[i], l[i]] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
// Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.
// Answers within 10^-5 of the actual answer will be accepted.
// Note: Squares may overlap. Overlapping areas should be counted multiple times.


// Solution: Binary Search & Math

// Find the total sum of area across all squares, and half of that is the target area.

// Binary search for the lowest y where bottom area sum >= targetArea.
// To calculate the bottom area sum, iterate through every square and get the sum of area below the line: (cutoff y - square y) * length

// For this lowest higher y, we can subtract 1 to get the highest lower y (highest y with bottom area sum <= targetArea).
// Get the missing area: target area - lower y's bottom area sum.
// Divide the missing area by the difference between the areas of the higher and lower y.
// This ratio is the decimal amount we need to add to the first y.

// e.g. squares = [[0,0,2],[1,1,1]]
  // y  |   bottom area sum
  // 0      0
  // 1      2
  // 2      5
// Target area = 2.5
// Lowest y where bottom sum >= target area = 2
// Highest y with smaller sum = 2 - 1 = 1
// Missing area = target area - highest y = 2.5 = 2 = 0.5
// Difference between lower and higher y's areas: 5 - 2 = 3
// Ratio: 0.5 / 3 = 0.16667
// Answer = Higher y + ratio = 1 + 0.16667 = 1.16667

// n = number of squares, m = max y
// Time Complexity: O(n log(m)) 81ms
// Space Complexity: O(1) 83.46MB
function separateSquares(squares) {
  let maxY = 0, totalArea = 0;
  for (let [_, y, l] of squares) {
    maxY = Math.max(maxY, y + l);
    totalArea += l * l;
  }
  const targetArea = totalArea / 2;
  let low = 0, high = maxY;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (bottomAreaSum(squares, mid) >= targetArea) high = mid;
    else low = mid + 1;
  }
  const minBiggerBottomArea = bottomAreaSum(squares, low);
  if (minBiggerBottomArea === targetArea) {
    return low;
  }
  const maxSmallerBottomArea = bottomAreaSum(squares, low - 1);
  const missingArea = targetArea - maxSmallerBottomArea;
  return (low - 1) + (missingArea / (minBiggerBottomArea - maxSmallerBottomArea));
};

function bottomAreaSum(squares, y) {
  let bottomArea = 0;
  for (let i = 0; i < squares.length; i++) {
    const heightBelowY = Math.min(y, squares[i][1] + squares[i][2]) - squares[i][1];
    bottomArea += Math.max(0, heightBelowY) * squares[i][2];
  }
  return bottomArea;
}

// Two test cases
console.log(separateSquares([[0,0,1],[2,2,1]])) // 1
console.log(separateSquares([[0,0,2],[1,1,1]])) // 1.16667