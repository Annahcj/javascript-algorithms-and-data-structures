// 3453. Separate Squares I
// You are given a 2D integer array squares. Each squares[i] = [x[i], y[i], l[i]] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
// Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.
// Answers within 10^-5 of the actual answer will be accepted.
// Note: Squares may overlap. Overlapping areas should be counted multiple times.


// Solution: Line Sweep

// Use line sweep the find the running sum of areas.
// For every square, 
  // [y, length] to add to the current width
  // [y + length, -length] to subtract off the width
// Sort the widths in asc order by y to perform the line sweep.

// Keep track of the current width, the previous y, and the current sum of areas.
// The area for the current block = the difference between the current y and the previous y, multiplied by the current width.

// Find the smallest y where the sum of area >= target area.
// Formula to calculate the decimal amount ratio to add to the previous y:
  // The missing area = Difference between the target sum and the previous area (area sum for the previous y).
  // The ratio to add to the previous y (the smaller one) = the missing area / width for the current y.
    // We divide by the width for the current y (1 y, not the whole area), because the ratio needs to be in relation to 1 y.

// length of squares
// Time Complexity: O(n log(n)) 335ms
// Space Complexity: O(n) 98.08MB
function separateSquares(squares) {
  const widths = [];
  let totalArea = 0;
  for (let [_, y, l] of squares) {
    widths.push([y, l]);
    widths.push([y + l, -l]);
    totalArea += (l * l);
  }
  widths.sort((a, b) => a[0] - b[0]);
  const targetArea = totalArea / 2;
  let prevY = widths[0][0], width = widths[0][1];
  let area = 0;
  for (let i = 1; i < widths.length; i++) {
    const [y, l] = widths[i];
    const newArea = (y - prevY) * width;
    if (area + newArea >= targetArea) {
      const ratio = (targetArea - area) / width;
      return prevY + ratio;
    }
    area += newArea;
    width += l;
    prevY = y;
  }
};

// Two test cases
console.log(separateSquares([[0,0,1],[2,2,1]])) // 1
console.log(separateSquares([[0,0,2],[1,1,1]])) // 1.16667