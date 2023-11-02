// 2463. Minimum Total Distance Traveled
// There are some robots and factories on the X-axis. You are given an integer array robot where robot[i] is the position of the ith robot. You are also given a 2D integer array factory where factory[j] = [positionj, limitj] indicates that positionj is the position of the jth factory and that the jth factory can repair at most limitj robots.
// The positions of each robot are unique. The positions of each factory are also unique. Note that a robot can be in the same position as a factory initially.
// All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.
// At any moment, you can set the initial direction of moving for some robot. Your target is to minimize the total distance traveled by all the robots.
// Return the minimum total distance traveled by all the robots. The test cases are generated such that all the robots can be repaired.
// Note that:
  // All robots move at the same speed.
  // If two robots move in the same direction, they will never collide.
  // If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
  // If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
  // If the robot moved from a position x to a position y, the distance it moved is |y - x|.


// Solution: DP - Recursion w/ Memoization 

// Try to assign continuous segments of robots (in sorted order) to each factory (also in sorted order).
  // e.g: Robot 0,1,2 -> Factory 0, Robot 3,4 -> Factory 1, Robot 5,6,7,8 -> Factory 2, and so on.

// Memoize each dp(i, j, count), where
  // i = the index of robot
  // j = the index of factory
  // count = amount of robots factory[j] has already repaired

// For the ith robot and jth factory, we have two choices:
  // 1. Take factory j: repair the ith robot in the jth factory.
  // 2. Don't take factory j, skip to the next one.
// Record and return the minimum result out of the two choices.

// Note: When the robot passes a factory that has not reached its limits, it will always get repaired there.
  // So how is the distance calculation correct when we assign the ith robot to the jth factory?
  // It is correct because if the ith robot can be repaired in the jth factory, and the jth factory is closer (in the same direction) than the j+1th factory, it will result in a smaller result, and since we take the minimum result, the distance will always be correct.

// n = number of robots, m = number of factories, k = max(limit[j]).
// Time Complexity: O(m * n * k) 735ms
// Space Complexity: O(m * n * k) 128.1MB
var minimumTotalDistance = function(robot, factory) {
  let n = robot.length, m = factory.length, k = factory.reduce((max, [_, limit]) => Math.max(max, limit), 0);
  let memo = Array(n).fill(0).map(() => Array(m).fill(0).map(() => Array(k + 1).fill(-1)));
  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);
  return dp(0, 0, 0);
  
  function dp(i, j, count) {
    if (i === n) return 0;
    if (j === m) return Infinity;
    if (memo[i][j][count] !== -1) return memo[i][j][count];
    
    let ans = dp(i, j + 1, 0);
    if (factory[j][1] > count) {
      let cost = Math.abs(robot[i] - factory[j][0]);
      ans = Math.min(ans, cost + dp(i + 1, j, count + 1));
    }
    return memo[i][j][count] = ans;
  }
};

// Two test cases
console.log(minimumTotalDistance([0,4,6], [[2,2],[6,2]])) // 4
console.log(minimumTotalDistance([1,-1], [[-2,1],[2,1]])) // 2