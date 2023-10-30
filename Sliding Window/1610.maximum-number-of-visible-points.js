// 1610. Maximum Number of Visible Points
// You are given an array points, an integer angle, and your location, where location = [posx, posy] and points[i] = [xi, yi] both denote integral coordinates on the X-Y plane.
// Initially, you are facing directly east from your position. You cannot move from your position, but you can rotate. In other words, posx and posy cannot be changed. Your field of view in degrees is represented by angle, determining how wide you can see from any given view direction. Let d be the amount in degrees that you rotate counterclockwise. Then, your field of view is the inclusive range of angles [d - angle/2, d + angle/2].
// You can see some set of points if, for each point, the angle formed by the point, your position, and the immediate east direction from your position is in your field of view.
// There can be multiple points at one coordinate. There may be points at your location, and you can always see these points regardless of your rotation. Points do not obstruct your vision to other points.
// Return the maximum number of points you can see.


// Solution: atan2 & sliding window

// Use the Math.atan2 function, which returns the returns the angle in the plane (in radians) between the positive x-axis and the ray from (0,0) to the point (x,y).
// To convert it to degrees, multiply it by (180 / Math.PI).

// 1. Convert points to atan2 angles in radians and convert to degrees
// 2. Sort the angles 
// 3. Wrap the angles around: add each angle + 360 degrees to the angles
// 4. Sliding window over the angles

// Time Complexity: O(n log(n)) 396ms
// Space Complexity: O(n) 81.5MB
var visiblePoints = function(points, angle, location) {
  let angles = [], sameLocation = 0;
  for (let [x, y] of points) {
    let angle = Math.atan2(y - location[1], x - location[0]) * (180 / Math.PI);
    if (x === location[0] && y === location[1]) sameLocation++;
    else angles.push(angle);
  }

  angles.sort((a, b) => a - b);
  let len = angles.length;
  for (let i = 0; i < len; i++) {
    angles.push(angles[i] + 360);
  }
  
  let ans = sameLocation, i = 0;
  for (let j = 0; j < angles.length; j++) {
    while (angles[j] - angles[i] > angle) i++;
    ans = Math.max(ans, j - i + 1 + sameLocation);
  }
  return ans;
};

// Three test cases
console.log(visiblePoints([[2,1],[2,2],[3,3]], 90, [1,1])) // 3
console.log(visiblePoints([[1,1],[2,1],[2,2],[3,3]], 90, [1,1])) // 4
console.log(visiblePoints([[1,0],[2,1]], 13, [1,1])) // 1