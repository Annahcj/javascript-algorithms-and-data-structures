// 752. Open the Lock
// You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.
// The lock initially starts at '0000', a string representing the state of the 4 wheels.
// You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.
// Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.


// Solution: BFS

// There are at most 10^4 states (10 choices for each wheel, 4 wheels).
// Use BFS to find the minimum moves to reach each state.
// Use a hashset to keep track of states we have seen, and don't revisit them.

// For each state, go through each wheel and move it either backwards or forwards by 1.
// If we haven't seen the backward or forward states and they are not deadends, we can visit them.

// Time Complexity: O(10^4 * 4^2 + deadends) 178ms
// Space Complexity: O(10^4 + deadends) 62.7MB
var openLock = function(deadends, target) {
  let deadendsSet = new Set(deadends);
  if (deadendsSet.has('0000')) return -1;
  let queue = ['0000'], seen = new Set(['0000']);
  let moves = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let state = queue.pop();
      if (state === target) return moves;
      for (let i = 0; i < 4; i++) {
        let back = (((Number(state[i]) - 1) + 10) % 10).toString();
        let forward = ((Number(state[i]) + 1) % 10).toString();
        let backState = state.slice(0, i) + back + state.slice(i + 1);
        let forwardState = state.slice(0, i) + forward + state.slice(i + 1);
        if (!deadendsSet.has(backState) && !seen.has(backState)) {
          seen.add(backState);
          next.push(backState);
        }
        if (!deadendsSet.has(forwardState) && !seen.has(forwardState)) {
          seen.add(forwardState);
          next.push(forwardState);
        }
      }
    }
    moves++;
    queue = next;
  }
  return -1;
};

// Four test cases
console.log(openLock(["0201","0101","0102","1212","2002"], "0202")) // 6
console.log(openLock(["8888"], "0009")) // 1
console.log(openLock(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888")) // -1
console.log(openLock(["0000"], "8888")) // -1