// 1488. Avoid Flood in The City
// Your country has an infinite number of lakes. Initially, all the lakes are empty, but when it rains over the nth lake, the nth lake becomes full of water. If it rains over a lake that is full of water, there will be a flood. Your goal is to avoid floods in any lake.
// Given an integer array rains where:
  // rains[i] > 0 means there will be rains over the rains[i] lake.
  // rains[i] == 0 means there are no rains this day and you can choose one lake this day and dry it.
// Return an array ans where:
  // ans.length == rains.length
  // ans[i] == -1 if rains[i] > 0.
  // ans[i] is the lake you choose to dry in the ith day if rains[i] == 0.
// If there are multiple valid answers return any of them. If it is impossible to avoid flood return an empty array.
// Notice that if you chose to dry a full lake, it becomes empty, but if you chose to dry an empty lake, nothing changes.


// Solution: Min Heap

// For each dry day, we need to know which lakes will be filled in the coming future.

// Store sorted arrays of raining days for each lake type. Reverse the order so that we can pop from the back as we use them.
// Use a min heap to keep track of which lake should be emptied first on a dry day. It is optimal to empty the lake with the earliest coming rainy day.

// On a rainy day, add the next coming rainy day for that lake type into the heap.
// On a dry day, 
  // Pull out the earliest coming rainy day from the min heap and dry up that lake.
  // However, if the earliest coming rainy day is less than the current dry day, then it is impossible since the lake would have already flooded.

// Time Complexity: O(n log(n)) 587ms
// Space Complexity: O(n) 137.6MB
var avoidFlood = function(rains) {
  let n = rains.length, heap = new Heap((a, b) => a[0] - b[0]), lakes = {};
  for (let i = 0; i < n; i++) {
    if (rains[i] === 0) continue;
    if (!lakes[rains[i]]) lakes[rains[i]] = [];
    lakes[rains[i]].push(i);
  }
  for (let key in lakes) {
    lakes[key].reverse(); // reverse so that we can pop from the right later on
  }
  let ans = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    if (rains[i] > 0) { // rainy day
      let days = lakes[rains[i]];
      days.pop(); // remove current day
      if (days.length) {
        heap.add([days[days.length - 1], rains[i]]); // add the next rainy day for this lake type
      }
    } else { // dry day
      if (heap.isEmpty()) ans[i] = 1; // there are no full lakes at this point, so it doesn't matter which lake we choose to empty
      else {
        if (heap.top()[0] < i) return []; // lake has already been flooded
        ans[i] = heap.remove()[1];
      }
    }
  }
  return heap.isEmpty() ? ans : [];
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Three test cases
console.log(avoidFlood([1,2,3,4])) // [-1,-1,-1,-1]
console.log(avoidFlood([1,2,0,0,2,1])) // [-1,-1,2,1,-1,-1]
console.log(avoidFlood([1,2,0,1,2])) // []