// 1274. Number of Ships in a Rectangle
// Each ship is located at an integer point on the sea represented by a cartesian plane, and each integer point may contain at most 1 ship.
// You have a function Sea.hasShips(topRight, bottomLeft) which takes two points as arguments and returns true If there is at least one ship in the rectangle represented by the two points, including on the boundary.
// Given two points: the top right and bottom left corners of a rectangle, return the number of ships present in that rectangle. It is guaranteed that there are at most 10 ships in that rectangle.
// Submissions making more than 400 calls to hasShips will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.


// Solution: Divide & Conquer into 4 Parts

// Like binary search, but since we have both the x and y coordinates, we would need to divide into 4 parts.
// Note: Make sure to avoid overlapping rectangles since ships can be at a corner.

// Time Complexity: O(10 * log(mn)) 121ms
// Space Complexity: O(10 * log(mn)) 45.4MB
var countShips = function(sea, topRight, bottomLeft) {
  let [topX, topY] = topRight, [bottomX, bottomY] = bottomLeft;
  if (!sea.hasShips(topRight, bottomLeft)) return 0; // no ships in this rectangle, terminate.
  if (topX === bottomX && topY === bottomY) {
    return sea.hasShips(topRight, bottomLeft) ? 1 : 0; // if there is only one point left, return 1 if there is a ship, otherwise 0.
  }

  let midX = Math.floor((topX + bottomX) / 2);
  let midY = Math.floor((topY + bottomY) / 2);

  let res = 0;
  res += countShips(sea, [midX, midY], bottomLeft); // bottom left
  res += countShips(sea, [topX, midY], [midX + 1, bottomY]); // bottom right
  res += countShips(sea, topRight, [midX + 1, midY + 1]); // top right
  res += countShips(sea, [midX, topY], [bottomX, midY + 1]); // top left
  return res;
};