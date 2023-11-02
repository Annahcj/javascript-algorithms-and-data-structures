// 1244. Design A Leaderboard
// Design a Leaderboard class, which has 3 functions:
  // addScore(playerId, score): Update the leaderboard by adding score to the given player's score. If there is no player with such id in the leaderboard, add him to the leaderboard with the given score.
  // top(K): Return the score sum of the top K players.
  // reset(playerId): Reset the score of the player with the given id to 0 (in other words erase it from the leaderboard). It is guaranteed that the player was added to the leaderboard before calling this function.
// Initially, the leaderboard is empty.


// Solution: Heap

// Runtime on LeetCode: 124ms
// Memory Usage on LeetCode: 46MB

// top: use a minheap which only keeps the largest k values.
  // remove the smallest score once the size of the minheap exceeds k.
  // sum up the k scores which are in the minheap.

// Time Complexity:
  // addScore: O(1)
  // top: O(n log(k))
  // reset: O(1)

// Space Complexity:
  // addScore: O(1)
  // top: O(k)
  // reset: O(1)

var Leaderboard = function() {
  this.scores = {};  
};

Leaderboard.prototype.addScore = function(playerId, score) {
  if (this.scores[playerId] === undefined) this.scores[playerId] = 0;
  this.scores[playerId] += score;  
};

Leaderboard.prototype.top = function(K) {
  let minHeap = new Heap((a, b) => a - b);  
  for (let player in this.scores) {
    minHeap.add(this.scores[player]);
    if (minHeap.size > K) {
      minHeap.remove();
    }
  }
  let sum = 0;
  for (let score of minHeap.values) sum += score;
  return sum;
};

Leaderboard.prototype.reset = function(playerId) {
  this.scores[playerId] = 0;  
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.size = 0;
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    this.size++;
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    this.size--;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  isEmpty() {
    return this.size === 0;
  }
}

// A few test cases
let leaderboard = new Leaderboard();
leaderboard.addScore(1,73);   // leaderboard = [[1,73]];
leaderboard.addScore(2,56);   // leaderboard = [[1,73],[2,56]];
leaderboard.addScore(3,39);   // leaderboard = [[1,73],[2,56],[3,39]];
leaderboard.addScore(4,51);   // leaderboard = [[1,73],[2,56],[3,39],[4,51]];
leaderboard.addScore(5,4);    // leaderboard = [[1,73],[2,56],[3,39],[4,51],[5,4]];
console.log(leaderboard.top(1)); // returns 73;
leaderboard.reset(1);         // leaderboard = [[2,56],[3,39],[4,51],[5,4]];
leaderboard.reset(2);         // leaderboard = [[3,39],[4,51],[5,4]];
leaderboard.addScore(2,51);   // leaderboard = [[2,51],[3,39],[4,51],[5,4]];
console.log(leaderboard.top(3)); // returns 141 = 51 + 51 + 39;