// 2532. Time to Cross a Bridge


// Solution: Four Heaps 

// Keep track of four heaps:
  // rightPickHeap: Workers picking up boxes from the old warehouse (right bank). Ordered by earliest finish time.
  // rightWaitHeap: Workers ready to cross the bridge from right to left. Ordered by least efficiency.
  // leftPutHeap: Workers putting boxes into the new warehouse (left bank). Order by earliest finish time.
  // leftWaitHeap: Workers ready to cross the bridge from left to right. Ordered by least efficiency.

// If there are workers waiting on the right side of bridge, use the worker with lowest efficiency from rightWaitHeap.

// If there are workers waiting on the left side of bridge, use the worker with lowest efficienty from leftWaitHeap.

// If no workers are waiting on both sides of bridge, fast forward the current time to the earliest time where a worker finishes picking or putting a box in a warehouse.

// Time Complexity: O(n log(n) + 4k log(n)) 226ms
// Space Complexity: O(n) 54.3MB
var findCrossingTime = function(n, k, time) {
  let rightPickHeap = new Heap((a, b) => a[1] - b[1]); // [index, time to finish picking]
  let rightWaitHeap = new Heap((a, b) => time[a][0] + time[a][2] === time[b][0] + time[b][2] ? b - a : (time[b][0] + time[b][2]) - (time[a][0] + time[a][2])); // index
  let leftPutHeap = new Heap((a, b) => a[1] - b[1]); // [index, time to finish putting]
  let leftWaitHeap = new Heap((a, b) => time[a][0] + time[a][2] === time[b][0] + time[b][2] ? b - a : (time[b][0] + time[b][2]) - (time[a][0] + time[a][2])); // index

  let boxes = n;
  for (let i = 0; i < k; i++) {
    leftWaitHeap.add(i);
  }
  
  let currTime = 0, workersCrossedRightToLeft = 0;
  while (!leftWaitHeap.isEmpty() || !leftPutHeap.isEmpty() ||  !rightPickHeap.isEmpty() || !rightWaitHeap.isEmpty()) {
    // move any workers that have finished picking box from right side to the waiting heap
    while (!rightPickHeap.isEmpty() && rightPickHeap.top()[1] <= currTime) {
      rightWaitHeap.add(rightPickHeap.remove()[0]);
    }
    // move any workers that have finished putting box on left side to the waiting heap
    while (!leftPutHeap.isEmpty() && leftPutHeap.top()[1] <= currTime) {
      leftWaitHeap.add(leftPutHeap.remove()[0]);
    }

    if (!rightWaitHeap.isEmpty()) {
      // pick least efficient worker from right side of bridge
      let index = rightWaitHeap.remove();
      let timeToCross = time[index][2];
      workersCrossedRightToLeft++;
      if (workersCrossedRightToLeft === n) {
        return currTime + timeToCross;
      }
      currTime += timeToCross;
      leftPutHeap.add([index, currTime + time[index][3]]);
    } else if (!leftWaitHeap.isEmpty() && boxes > 0) {
      // pick least efficient worker from left side of bridge
      let index = leftWaitHeap.remove();
      let timeToCross = time[index][0];
      currTime += timeToCross;
      rightPickHeap.add([index, currTime + time[index][1]]);
      boxes--;
    } else {
      // fast forward currTime to the earliest finishing time of workers picking/putting a box
      let earliestPickFinishTime = rightPickHeap.isEmpty() ? Infinity : rightPickHeap.top()[1];
      let earliestPutFinishTime = leftPutHeap.isEmpty() ? Infinity : leftPutHeap.top()[1];
      currTime = Math.min(earliestPickFinishTime, earliestPutFinishTime);
    }
  }
  return currTime;
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

// Two test cases
console.log(findCrossingTime(1, 3, [[1,1,2,1],[1,1,3,1],[1,1,4,1]])) // 6
console.log(findCrossingTime(3, 2, [[1,9,1,8],[10,10,10,10]])) // 50