// 1503. Last Moment Before All Ants Fall Out of a Plank
// We have a wooden plank of the length n units. Some ants are walking on the plank, each ant moves with a speed of 1 unit per second. Some of the ants move to the left, the other move to the right.
// When two ants moving in two different directions meet at some point, they change their directions and continue moving again. Assume changing directions does not take any additional time.
// When an ant reaches one end of the plank at a time t, it falls out of the plank immediately.
// Given an integer n and two integer arrays left and right, the positions of the ants moving to the left and the right, return the moment when the last ant(s) fall out of the plank.


// Solution: Assume Ants Just Pass By

// Key: The ants meeting and taking no additional time in changing directions is equivalent to them just passing by without meeting.
// Return the maximum distance of an ant to the end of the plank (if going left: position, if going right: n - position)

// m = number of ants
// Time Complexity: O(m) 77ms
// Space Complexity: O(1) 44.5MB
var getLastMoment = function(n, left, right) {
  let ans = Math.max(...left);
  for (let position of right) {
    ans = Math.max(ans, n - position);
  }
  return ans;
};

// Three test cases
console.log(getLastMoment(4, [4,3], [0,1])) // 4
console.log(getLastMoment(7, [], [0,1,2,3,4,5,6,7])) // 7
console.log(getLastMoment(7, [0,1,2,3,4,5,6,7], [])) // 7