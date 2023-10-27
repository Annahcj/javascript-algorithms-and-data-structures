// 849. Maximize Distance to Closest Person
// You are given an array representing a row of seats where seats[i] = 1 represents a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty (0-indexed).
// There is at least one empty seat, and at least one person sitting.
// Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized. 
// Return that maximum distance to the closest person.


// Solution: Prefix Sum

// 1. Prefix sum from left: for each i, calculate closest person on the left
// 2. Prefix sum from right: for each i, calculate closest person on the right
// 3. Find best empty seat: for all i, find the max of Math.min(left[i], right[i])

// Time Complexity: O(n) 110ms
// Space Complexity: O(n) 44.5MB
var maxDistToClosest = function(seats) {
  let n = seats.length, left = Array(n);
  for (var i = 0; i < n; i++) { // for each i, calculate closest person on the left
    if (seats[i] === 1) left[i] = 0;
    else {
      let prev = i === 0 ? Infinity : left[i - 1];
      left[i] = prev + 1;
    }
  }
  
  let right = Array(n);
  for (i = n - 1; i >= 0; i--) { // for each i, calculate closest person on the right
    if (seats[i] === 1) right[i] = 0;
    else {
      let next = i === n - 1 ? Infinity : right[i + 1];
      right[i] = next + 1;
    }
  }

  let maxDist = -Infinity;
  for (i = 0; i < n; i++) {
    if (seats[i] === 0) { // for each empty seat
      maxDist = Math.max(maxDist, Math.min(left[i], right[i]));
    }
  }
  return maxDist;
};

// Two test cases to run function on
console.log(maxDistToClosest([1,0,0,0,1,0,1])) // 2
console.log(maxDistToClosest([1,0,0,0])) // 3