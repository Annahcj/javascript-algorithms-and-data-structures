// 2731. Movement of Robots
// Some robots are standing on an infinite number line with their initial coordinates given by a 0-indexed integer array nums and will start moving once given the command to move. The robots will move a unit distance each second.
// You are given a string s denoting the direction in which robots will move on command. 'L' means the robot will move towards the left side or negative side of the number line, whereas 'R' means the robot will move towards the right side or positive side of the number line.
// If two robots collide, they will start moving in opposite directions.
// Return the sum of distances between all the pairs of robots d seconds after the command. Since the sum can be very large, return it modulo 109 + 7.
// Note:
  // For two robots at the index i and j, pair (i,j) and pair (j,i) are considered the same pair.
  // When robots collide, they instantly change their directions without wasting any time.
  // Collision happens when two robots share the same place in a moment.
    // For example, if a robot is positioned in 0 going to the right and another is positioned in 2 going to the left, the next second they'll be both in 1 and they will change direction and the next second the first one will be in 0, heading left, and another will be in 2, heading right.
    // For example, if a robot is positioned in 0 going to the right and another is positioned in 1 going to the left, the next second the first one will be in 0, heading left, and another will be in 1, heading right.


// Solution: Sorting & Prefix Sum 

// Key: If the robots collide and start moving in the opposite directions, it is equivalent to them passing by each other and not colliding at all.
// Go through each position and get the final position after d seconds 
  // Going right: nums[i] + d
  // Going left: nums[i] - d

// Then sort the final positions and get the sum of differences between all pairs.
// Keep track of the running sum of positions, and for each position add: (positions[i] * i) - runningSum
  // This way, we achieve the effect of getting sum(positions[i] - position[j]) where j < i in O(1) time.

// Time Complexity: O(n log(n)) 179ms
// Space Complexity: O(n) 62.6MB
var sumDistance = function(nums, s, d) {
  let n = nums.length, positions = [];
  for (let i = 0; i < n; i++) {
    let finalPosition = s[i] === 'R' ? nums[i] + d : nums[i] - d;
    positions.push(finalPosition);
  }
  positions.sort((a, b) => a - b);

  let ans = 0, MOD = 1000000007, sum = 0;
  for (let i = 0; i < n; i++) {
    let position = positions[i];
    let pairsDiff = (position * i) - sum;
    ans = (ans + pairsDiff) % MOD;
    sum += position;
  }
  return ans;
};

// Two test cases
console.log(sumDistance([-2,0,2], "RLL", 3)) // 8
console.log(sumDistance([1,0], "RL", 2)) // 5