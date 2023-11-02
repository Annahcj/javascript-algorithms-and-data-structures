// 1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
// Return the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in the arrays horizontalCuts and verticalCuts. Since the answer can be a large number, return this modulo 10^9 + 7.


// Solution: Sorting

// Thoughts:
// We need to imagine the cake divided by each horizontal cut and vertical cut, then find the biggest piece.
// We can find this biggest piece by sorting the horizontal cuts and vertical cuts, and finding the biggest difference of two adjacent cuts. For the edges, we can check for the difference between the start (0) and the first horizontal/vertical cut, and the difference between the height/width of the cake and the last horizontal/vertical cut.

// Algorithm:
// Sort the horizontal and vertical cuts.
// Set a maximum height variable to the bigger of the two horizontal edge cases (first horizontal cut, height - last horizontal cut)
// Similarly, set a maximum width variable to the bigger of the two vertical edge cases (first vertical cut, width - last vertical cut)
// Loop through horizontalCuts from 1 to end (pointer = i)
  // update maxH (max height) if difference between horizontalCuts[i] and horizontalCuts[i - 1] is bigger than maxH.
// Loop through verticalCuts from 1 to end (pointer = j)
  // update maxW (max width) if difference between verticalCuts[j] and verticalCuts[j - 1] is bigger than maxH.
// When loops are finished, we now have the height and width of the biggest piece of cake.
// We can return height * width, but since the numbers may be big, convert both to big integers and divide it by modular BigInt(10^9 + 7)

// Time Complexity: O(h + v) (horizontalCuts + verticalCuts) 140ms
// Space Complexity: O(1) 47.8MB
var maxArea = function(h, w, horizontalCuts, verticalCuts) {
  horizontalCuts = horizontalCuts.sort((a, b) => a - b);
  verticalCuts = verticalCuts.sort((a, b) => a - b);
  let maxH = Math.max(horizontalCuts[0], h - horizontalCuts[horizontalCuts.length - 1]);
  let maxW = Math.max(verticalCuts[0], w - verticalCuts[verticalCuts.length - 1]);
  for (let i = 1; i < horizontalCuts.length; i++) {
    maxH = Math.max(maxH, horizontalCuts[i] - horizontalCuts[i - 1]);
  }
  for (let j = 1; j < verticalCuts.length; j++) {
    maxW = Math.max(maxW, verticalCuts[j] - verticalCuts[j - 1]);
  }
  return Number(BigInt(maxH) * BigInt(maxW) % 1000000007n);
};

// Four test cases
console.log(maxArea(1000000000,1000000000,[2],[2])) // 81
console.log(maxArea(5, 4, [1,2,4], [1,3])) // 4
console.log(maxArea(5, 4, [3,1], [1])) // 6
console.log(maxArea(5, 4, [3], [3])) // 9