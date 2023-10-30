// 1776. Car Fleet II
// There are n cars traveling at different speeds in the same direction along a one-lane road. You are given an array cars of length n, where cars[i] = [positioni, speedi] represents:
  // position[i] is the distance between the ith car and the beginning of the road in meters. It is guaranteed that position[i] < position[i+1].
  // speed[i] is the initial speed of the ith car in meters per second.
// For simplicity, cars can be considered as points moving along the number line. Two cars collide when they occupy the same position. Once a car collides with another car, they unite and form a single car fleet. The cars in the formed fleet will have the same position and the same speed, which is the initial speed of the slowest car in the fleet.
// Return an array answer, where answer[i] is the time, in seconds, at which the ith car collides with the next car, or -1 if the car does not collide with the next car. Answers within 10^-5 of the actual answers are accepted.


// Solution: Monotonic Stack 

// Loop through cars from right to left.
// Maintain a monotonic increasing stack of cars by speed and collision time.
// We need to loop backwards because collisions for cars on the right will affect cars on the left.

// Pop the last car from the stack if: 
  // 1. Current car is slower than last car in the stack (will never collide)
  // 2. The collision time of the current car to the last car in the stack is slower than the collision time of the last car in the stack to the car in front of it. 
// We don't need to keep these cars in the stack because upcoming cars will always collide with the current car faster than the cars we are popping off (because of the conditions we are checking for).

// Calculate time of collision:
  // The previous car travels (curr speed - prev speed) meters further per second.
  // The time of collision = (prev position - curr position) / (curr speed - prev speed).
  // Once a previous car collides with the current car, both cars will have the same speed of the current car. Both the position and speed of the current car will not change.

// Time Complexity: O(n) 545ms
// Space Complexity: O(n) 107.3MB
var getCollisionTimes = function(cars) {
  let stack = [], n = cars.length, res = Array(n).fill(-1);
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && (cars[i][1] <= cars[stack[stack.length - 1]][1] || (res[stack[stack.length - 1]] > -1 && getTimeToCollide(cars[i], cars[stack[stack.length - 1]]) > res[stack[stack.length - 1]]))) { // pop out all cars on the right which will never collide with the current car or cars that will collide with other cars faster than with the current car
      stack.pop();
    }
    if (stack.length) {
      res[i] = getTimeToCollide(cars[i], cars[stack[stack.length - 1]]);
    } 
    stack.push(i);
  }
  return res;
  
  function getTimeToCollide(prevCar, currCar) {
    return (currCar[0] - prevCar[0]) / (prevCar[1] - currCar[1]);
  }
};

// Two test cases
console.log(getCollisionTimes([[1,2],[2,1],[4,3],[7,2]])) // [1.00000,-1.00000,3.00000,-1.00000]
console.log(getCollisionTimes([[3,4],[5,4],[6,3],[9,1]])) // [2.00000,1.00000,1.50000,-1.00000]