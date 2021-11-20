// 735. Asteroid Collision
// We are given an array asteroids of integers representing asteroids in a row.
// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.
// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.


// Solution: Stack

// We maintain a stack where

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 41.4MB
var asteroidCollision = function(asteroids) {
  let stack = [];
  for (var asteroid of asteroids) {
    if (asteroid < 0) { // left going asteroid
      while (stack.length && stack[stack.length - 1] > 0 && stack[stack.length - 1] < -asteroid) {
        stack.pop(); // pop out all smaller right going asteroids
      }
      if (!stack.length || (stack[stack.length - 1] < 0)) stack.push(asteroid); // if stack is empty or last asteroid is also left going
      if (stack.length && stack[stack.length - 1] === -asteroid) stack.pop(); // if last asteroid is equal, both are destroyed.
    } else {
      stack.push(asteroid); // otherwise push in right going asteroids
    }
  }  
  return stack;
};

// Four test cases to run function on
console.log(asteroidCollision([5,10,-5])) // [5,10]
console.log(asteroidCollision([8,-8])) // []
console.log(asteroidCollision([10,2,-5])) // [10]
console.log(asteroidCollision([-2,-1,1,2])) // [-2,-1,1,2]