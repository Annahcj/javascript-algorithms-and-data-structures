// 3453. Separate Squares I
// You are given a 2D integer array squares. Each squares[i] = [x[i], y[i], l[i]] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.
// Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.
// Answers within 10^-5 of the actual answer will be accepted.
// Note: Squares may overlap. Overlapping areas should be counted multiple times.


// Solution: Line Sweep

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