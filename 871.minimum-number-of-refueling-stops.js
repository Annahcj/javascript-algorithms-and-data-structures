// 871. Minimum Number of Refueling Stops
// A car travels from a starting position to a destination which is target miles east of the starting position.
// There are gas stations along the way. The gas stations are represented as an array stations where stations[i] = [positioni, fueli] indicates that the ith gas station is positioni miles east of the starting position and has fueli liters of gas.
// The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it. It uses one liter of gas per one mile that it drives. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.
// Return the minimum number of refueling stops the car must make in order to reach its destination. If it cannot reach the destination, return -1.
// Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there. If the car reaches the destination with 0 fuel left, it is still considered to have arrived.


// Solution 1: Dynamic Programming

// Create an array 'dp' the size of n + 1 and fill it with 0's
// set dp[0] to startFuel
// (attempt every combination of 0 to n stops)
// loop through from 0 to n - 1 (pointer = i)
  // loop backwards from i to 0 (pointer = j)
    // if dp[j] is bigger than or equal to stations[i][0]
      // update dp[j + 1] if dp[j] + stations[i][1] is bigger than dp[j + 1]

// (dp[i] is the maximum distance which can be reached with i number of stops) 

// (find first distance that reaches target)
// loop through dp from 0 to n
  // if dp[i] is bigger than or equal to target, return i (min number of stops)
// if target cannot be reached, return -1

// Time Complexity: O(n^2) 88ms
// Space Complexity: O(n) 41.3MB
var minRefuelStops = function(target, startFuel, stations) {
  let n = stations.length;
  let dp = Array(n + 1).fill(0);
  dp[0] = startFuel;
  // attempting every combination of 0 to n stops
  for (var i = 0; i < n; i++) {
    for (var j = i; j >= 0; j--) {
      if (dp[j] >= stations[i][0]) {
        dp[j + 1] = Math.max(dp[j + 1], dp[j] + stations[i][1]);
      }
    }
  }
  for (i = 0; i <= n; i++) {
    if (dp[i] >= target) return i;
  }
  return -1;
};

// Solution 2: Priority Queue / Max Heap

// Create a new maxHeap, set ans (min number of stations) to 0
// Set i (index in stations) to 0, and dist (max distance) to startFuel
// Loop while dist is smaller than target
  // loop while i is smaller than AND stations[i][0] is smaller than or equal to dist (current max distance)
    // add stations[i][1] to heap
    // increment i by one
  // if heap is empty (meaning we can't go any further, and we haven't reached the target yet), return -1
  // otherwise, increment dist by heap.remove()
  // increment ans by one
// return ans

// Time Complexity: O(n log(n)) 148ms
// Space Complexity: O(n) 43.4MB
var minRefuelStops = function(target, startFuel, stations) {
  let n = stations.length;
  let heap = new MaxHeap(), ans = 0;
  let i = 0, dist = startFuel;
  while (dist < target) {
    while (i < n && stations[i][0] <= dist) {
      heap.add(stations[i][1]);
      i++;
    }
    if (heap.isEmpty()) return -1;
    dist += heap.remove();
    ans++;
  } 
  return ans;
};

class MaxHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx] > this.values[parentIdx]) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx] > vals[rightIdx]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx] < this.values[childIdx]) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

// Three test cases to run function on
console.log(minRefuelStops(1, 1, [])) // 0
console.log(minRefuelStops(100, 1, [[10,100]])) // -1
console.log(minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]])) // 2