// 752. Open the Lock
// You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.
// The lock initially starts at '0000', a string representing the state of the 4 wheels.
// You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.
// Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.


// Solution: BFS

// Use two queues to keep track of how many steps we have taken and also to avoid using the O(n) shift operation.
// For each state, loop through the four digits and change each digit forwards and backwards.
// Keep track of a dead (deadend) set and a seen set.

// n = number of digits, a = number of choices for each digit (0 to 9), d = deadends.length
// Time Complexity: O(n^2 * a^n + d) 214ms
// Space Complexity: O(a^n + d) 58.1MB
var openLock = function(deadends, target) {
  let dead = new Set();
  for (var deadend of deadends) dead.add(deadend);
  let seen = new Set(['0000']);
  let steps = 0;
  let queue = ['0000'];
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let state = queue.pop();
      if (dead.has(state)) continue; // if it is a deadend, skip.
      if (state === target) return steps; // if target is reached, return the number of steps.
      for (var i = 0; i < 4; i++) {
        let digit = +state[i];
        let forward = (digit + 1) % 10; // move dial in clockwise direction
        let backward = (digit + 9) % 10; // move dial in anti-clockwise direction
        let forwardState = state.slice(0, i) + forward + state.slice(i + 1); 
        let backwardState = state.slice(0, i) + backward + state.slice(i + 1);
        if (!seen.has(forwardState)) {
          next.push(forwardState);
          seen.add(forwardState);
        }
        if (!seen.has(backwardState)) {
          next.push(backwardState);
          seen.add(backwardState);
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1; 
};

// Four test cases to run function on
console.log(openLock(["0201","0101","0102","1212","2002"], "0202")) // 6
console.log(openLock(["8888"], "0009")) // 1
console.log(openLock(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888")) // -1
console.log(openLock(["0000"], "8888")) // -1