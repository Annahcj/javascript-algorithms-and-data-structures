// 365. Water and Jug Problem
// You are given two jugs with capacities jug1Capacity and jug2Capacity liters. There is an infinite amount of water supply available. Determine whether it is possible to measure exactly targetCapacity liters using these two jugs.
// If targetCapacity liters of water are measurable, you must have targetCapacity liters of water contained within one or both buckets by the end.
// Operations allowed:
  // Fill any of the jugs with water.
  // Empty any of the jugs.
  // Pour water from one jug into another till the other jug is completely full, or the first jug itself is empty.


// Solution: BFS

// Try out all possibilities with bfs.
// Use a 'seen' set to prevent going to repeated state.

// x = jug1Capacity, y = jug2Capacity
// Time Complexity: O(xy) 8259ms
// Space Complexity: O(xy) 178.1MB
var canMeasureWater = function(jug1Capacity, jug2Capacity, targetCapacity) {
  let queue = [[0, 0]], seen = new Set();
  while (queue.length) {
    let [cap1, cap2] = queue.shift();
    let total = cap1 + cap2;
    if (total === targetCapacity) return true;
    
    let fill1 = [jug1Capacity, cap2], fill2 = [cap1, jug2Capacity];
    let empty1 = [0, cap2], empty2 = [cap1, 0];
    let pour1 = [Math.max(0, jug2Capacity - cap2), Math.min(jug2Capacity, cap2 + cap1)];
    let pour2 = [Math.min(jug1Capacity, cap1 + cap2), Math.max(0, jug1Capacity - cap1)];
    
    let choices = [fill1, fill2, empty1, empty2, pour1, pour2];
    for (var [x, y] of choices) {
      let key = `${x},${y}`;
      if (seen.has(key)) continue;
      queue.push([x, y]);
      seen.add(key);
    }
  }
  return false;
};

// Three test cases to run function on
console.log(canMeasureWater(3, 5, 4)) // true
console.log(canMeasureWater(2, 6, 5)) // false
console.log(canMeasureWater(1, 2, 3)) // true