// 3661. Maximum Walls Destroyed by Robots
// There is an endless straight line populated with some robots and walls. You are given integer arrays robots, distance, and walls:
  // robots[i] is the position of the ith robot.
  // distance[i] is the maximum distance the ith robot's bullet can travel.
  // walls[j] is the position of the jth wall.
// Every robot has one bullet that can either fire to the left or the right at most distance[i] meters.
// A bullet destroys every wall in its path that lies within its range. Robots are fixed obstacles: if a bullet hits another robot before reaching a wall, it immediately stops at that robot and cannot continue.
// Return the maximum number of unique walls that can be destroyed by the robots.
// Notes:
  // A wall and a robot may share the same position; the wall can be destroyed by the robot at that position.
  // Robots are not destroyed by bullets.


// Solution: DP & Binary Search

// Go through each robot, and keep track of two pieces of running state:
  // usedLeft = Maximum number of walls destroyed if previous robot shot to the left.
  // unused = Maximum number of walls destroyed if previous robot has not shot yet.

// Handle each pair of adjacent robots in sorted order.

// For each robot, 
  // New unusedLeft is the maximum out of:
    // 1. Previous robot shooting left and current robot shooting left.
    // 2. Previous robot shooting right and current robot shooting left - need to calculate overlap.
  // New unused is the maximum out of:
    // 1. Previous robot shooting left and current robot not shooting yet.
    // 2. Previous robot shooting right and current robot not shooting yet.

// To calculate the number of walls hit on the left and right of each robot, use binary search to find the number of walls in a range.
  // Binary search for the leftmost wall where wall position >= left bound.
  // Binary search for the rightmost wall where wall position <= right bound.

// Note: Walls that share the same position as robots can always be hit, so we deal with them separately and count them at the end.

// n = number of robots, m = number of walls
// Time Complexity: O(n log(n) + m log(m)) 661ms
// Space Complexity: O(n + m) 104MB
function maxWalls(robotPositions, distance, walls) {
  const n = robotPositions.length, robots = [];
  const wallsSet = new Set(walls);
  let wallsWithRobots = 0;
  for (let i = 0; i < n; i++) {
    if (wallsSet.has(robotPositions[i])) {
      wallsWithRobots++;
    }
    robots.push([robotPositions[i], distance[i]]);
  }
  robots.sort((a, b) => a[0] - b[0]);
  walls.sort((a, b) => a - b);
  robots.push([Infinity, 0]);
  const m = walls.length;
  let usedLeft = getCount(Math.max(0, robots[0][0] - robots[0][1]), robots[0][0] - 1), unused = 0;
  for (let i = 0; i < n - 1; i++) {
    const [prevPos, prevDist] = robots[i];
    const [currPos, currDist] = robots[i + 1];
    const prevRight = getCount(prevPos + 1, Math.min(currPos - 1, prevPos + prevDist));
    const currLeft = getCount(Math.max(currPos - currDist, prevPos + 1), currPos - 1);
    const overlapping = getCount(Math.max(prevPos + 1, currPos - currDist), Math.min(currPos - 1, prevPos + prevDist));
    const prevRightCurrLeft = unused + prevRight + currLeft - overlapping;
    const prevLeftCurrLeft = usedLeft + currLeft;
    const newUsedLeft = Math.max(prevRightCurrLeft, prevLeftCurrLeft);
    const newUnused = Math.max(usedLeft, unused + prevRight);
    usedLeft = newUsedLeft, unused = newUnused;
  }
  unused += getCount(robots[n - 1][0] + 1, robots[n - 1][0] + robots[n - 1][1]);
  return Math.max(usedLeft, unused) + wallsWithRobots;

  // get count of walls in between leftBound and rightBound
  function getCount(leftBound, rightBound) {
    // leftmost j where walls[j] >= leftBound
    const leftmostIndex = getLeftmost(leftBound);
    if (leftmostIndex === -1) {
      return 0;
    }
    // rightmost j where walls[j] <= rightBound
    const rightmostIndex = getRightmost(rightBound);
    return Math.max(0, rightmostIndex - leftmostIndex + 1);
  }

  // get rightmost wall j, where walls[j] <= max
  function getRightmost(max) {
    let low = 0, high = m - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (walls[mid] <= max) low = mid;
      else high = mid - 1;
    }
    return walls[low] <= max ? low : -1;
  }

  // get leftmost wall j, where walls[j] >= min
  function getLeftmost(min) {
    let low = 0, high = m - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (walls[mid] >= min) high = mid;
      else low = mid + 1;
    }
    return walls[low] >= min ? low : -1;
  }
};

// Two test cases
console.log(maxWalls([4], [3], [1,10])) // 1
console.log(maxWalls([10,2], [5,1], [5,2,7])) // 3