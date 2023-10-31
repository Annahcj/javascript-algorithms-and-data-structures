// 2211. Count Collisions on a Road
// There are n cars on an infinitely long road. The cars are numbered from 0 to n - 1 from left to right and each car is present at a unique point.
// You are given a 0-indexed string directions of length n. directions[i] can be either 'L', 'R', or 'S' denoting whether the ith car is moving towards the left, towards the right, or staying at its current point respectively. Each moving car has the same speed.
// The number of collisions can be calculated as follows:
  // When two cars moving in opposite directions collide with each other, the number of collisions increases by 2.
  // When a moving car collides with a stationary car, the number of collisions increases by 1.
// After a collision, the cars involved can no longer move and will stay at the point where they collided. Other than that, cars cannot change their state or direction of motion.
// Return the total number of collisions that will happen on the road.


// Solution: Stack

// If we are at an 'L':
  // If the previous car is 'S': +1 and do nothing.
  // Otherwise, if the previous car is 'R', +2, pop and become stationary.
  // Let all 'R' cars in the stack crash into the newly stationary car and +1 each time. Become stationary finally.

// If we are at an 'R':
  // push 'R' into the stack

// If we are at an 'S':
  // Let all 'R' cars crash into this car, +1 each time. Become stationary finally.

// Time Complexity: O(n) 216ms
// Space Complexity: O(n) 54.5MB
var countCollisions = function(directions) {
  let stack = [], ans = 0;
  for (let dir of directions) {
    if (dir === 'L') {
      let hasCrashed = false;
      if (stack.length && stack[stack.length - 1] === 'R') { // only the first RL crash is an opposite collision, it then becomes stationary.
        stack.pop();
        ans += 2;
        hasCrashed = true;
      } else if (stack.length && stack[stack.length - 1] === 'S') { // current car crashes against stationary car for 1 point
        ans++;
      }

      while (stack.length && stack[stack.length - 1] === 'R') { // let all 'R' cars crash into the newly stationary car
        stack.pop();
        ans++;
      }
      if (hasCrashed) stack.push('S'); // cars have crashed into this car, become stationary.
    } else if (dir === 'R') {
      stack.push(dir);
    } else {
      // S, pop out R's
      while (stack.length && stack[stack.length - 1] === 'R') {
        stack.pop();
        ans++;
      }
      stack.push('S');
    }
  }
  return ans;
};

// Three test cases
console.log(countCollisions("RLRSLL")) // 5
console.log(countCollisions("LLRR")) // 0
console.log(countCollisions("LLRLRLLSLRLLSLSSSS")) // 10