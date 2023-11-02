// 1882. Process Tasks Using Servers
// You are given two 0-indexed integer arrays servers and tasks of lengths n​​​​​​ and m​​​​​​ respectively. servers[i] is the weight of the i​​​​​​th​​​​ server, and tasks[j] is the time needed to process the j​​​​​​th​​​​ task in seconds.
// Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.
// At second j, the jth task is inserted into the queue (starting with the 0th task being inserted at second 0). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the smallest weight, and in case of a tie, it is assigned to a free server with the smallest index.
// If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.
// A server that is assigned task j at second t will be free again at second t + tasks[j].
// Build an array ans​​​​ of length m, where ans[j] is the index of the server the j​​​​​​th task will be assigned to.
// Return the array ans​​​​.


// Solution: Two Heaps

// Keep two heaps -> occupied & available

// The values in the heaps will look like: {idx, time, weight}

// Occupied: Order by time, then weight, then index.
// Available: Order by weight, then index.

// 1. Add all servers into available with a time of 0.
// 2. Loop through each task (pointer = i)
  // Remove from occupied and add to available while the top element has a time less than or equal to i
  // If available is empty
    // Remove the top element 'next' from occupied 
    // add it back to occupied with a time value of next.time + tasks[i]
    // set result[i] to the index of next.idx
  // Otherwise,
    // remove the top element from available
    // add it to occupied with a time value of i + tasks[i]
    // set result[i] to the index of the server we removed

// Time Complexity: O(n log(n)) 836ms
// Space Complexity: O(n) 90MB
var assignTasks = function(servers, tasks) {
  let occupied = new Heap((a, b) => { // order by time, then weight, then index.
    if (a.time === b.time) {
      if (a.weight === b.weight) return a.idx - b.idx;
      return a.weight - b.weight;
    }
    return a.time - b.time;
  });
  let available = new Heap((a, b) => { // order by weight, then index.
    if (a.weight === b.weight) {
      return a.idx - b.idx;
    } 
    return a.weight - b.weight;
  });
  for (let i = 0; i < servers.length; i++) {
    available.add({idx: i, time: 0, weight: servers[i]});
  }

  let res = [];
  for (let i = 0; i < tasks.length; i++) {
    while (!occupied.isEmpty() && occupied.top().time <= i) {
      available.add(occupied.remove());
    }
    if (available.isEmpty()) { // if there are no available servers, take the one that would finish earliest
      let next = occupied.remove();
      occupied.add({idx: next.idx, time: next.time + tasks[i], weight: next.weight}); // the finishing will be the previous finishing time + time to process tasks[i]
      res[i] = next.idx;
    } else {
      let next = available.remove();
      occupied.add({idx: next.idx, time: i + tasks[i], weight: next.weight});
      res[i] = next.idx;
    }
  }
  return res;
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
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
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

// Two test cases
console.log(assignTasks([3,3,2], [1,2,3,2,1,2])) // [2,2,0,2,1,2]
console.log(assignTasks([5,1,4,3,2], [2,1,2,4,5,2,1])) // [1,4,1,4,1,3,2]