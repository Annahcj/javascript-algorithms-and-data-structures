// 1620. Coordinate With Maximum Network Quality
// You are given an array of network towers towers, where towers[i] = [xi, yi, qi] denotes the ith network tower with location (xi, yi) and quality factor qi. All the coordinates are integral coordinates on the X-Y plane, and the distance between the two coordinates is the Euclidean distance.
// You are also given an integer radius where a tower is reachable if the distance is less than or equal to radius. Outside that distance, the signal becomes garbled, and the tower is not reachable.
// The signal quality of the ith tower at a coordinate (x, y) is calculated with the formula ⌊qi / (1 + d)⌋, where d is the distance between the tower and the coordinate. The network quality at a coordinate is the sum of the signal qualities from all the reachable towers.
// Return the array [cx, cy] representing the integral coordinate (cx, cy) where the network quality is maximum. If there are multiple coordinates with the same network quality, return the lexicographically minimum non-negative coordinate.


// Solution: Brute Force

// 1. Find the maximum x and y coordinates from the towers.
// 2. For each coordinate on the grid, get the sum of qualities for each reachable tower.

// m = max(towers[i][0]), n = max(towers[i][1]), k = number of towers
// Time Complexity: O(mn * k) 170ms
// Space Complexity: O(1) 47.5MB
var bestCoordinate = function(towers, radius) {
  let maxX = 0, maxY = 0;
  for (let [x, y] of towers) {
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  
  let maxQualitySum = 0, res = [];
  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      let qualitySum = 0;
      for (let [x, y, quality] of towers) {
        let dist = getDist(i, j, x, y);
        if (dist <= radius) {
          qualitySum += Math.floor(quality / (1 + dist));
        }
      }

      if (qualitySum > maxQualitySum) {
        maxQualitySum = qualitySum;
        res = [i, j];
      } else if (qualitySum === maxQualitySum) {
        res = getSmaller(res, [i, j]);
      }
    }
  }
  return res;
};

function getDist(x1, y1, x2, y2) {
  let distX = (x2 - x1) * (x2 - x1);
  let distY = (y2 - y1) * (y2 - y1);
  return Math.sqrt(distX + distY);
}

function getSmaller(coord1, coord2) {
  if (coord1[0] === coord2[0]) {
    return coord1[1] < coord2[1] ? coord1 : coord2;
  }
  return coord1[0] < coord2[0] ? coord1 : coord2;
}

// Three test cases
console.log(bestCoordinate([[1,2,5],[2,1,7],[3,1,9]], 2)) // [2,1]
console.log(bestCoordinate([[23,11,21]], 9)) // [23,11]
console.log(bestCoordinate([[1,2,13],[2,1,7],[0,1,9]], 2)) // [1,2]