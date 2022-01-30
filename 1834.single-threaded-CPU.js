// 1834. Single-Threaded CPU
// You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.
// You have a single-threaded CPU that can process at most one task at a time and will act in the following way:
  // If the CPU is idle and there are no available tasks to process, the CPU remains idle.
  // If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
  // Once a task is started, the CPU will process the entire task without stopping.
  // The CPU can finish a task then start a new one instantly.
// Return the order in which the CPU will process the tasks.


// Solution: Assign Index, Sort, Then Heap.

// 1. Assign an index to each task
// 2. Sort the tasks by enqueue time (in asc order)
// 3. Set time to the first enqueue time, 
  // a. Add all tasks within the current time to the heap
  // b. If the heap is empty, jump to next enqueue time, otherwise process the task at the top of the heap.

// Time Complexity: O(n log(n)) 572ms
// Space Complexity: O(n) 80.5MB
var getOrder = function(tasks) {
  let n = tasks.length;
  let heap = new PriorityQueue((a, b) => { // order by processing time, then index.
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  for (var i = 0; i < n; i++) {
    tasks[i] = [i, tasks[i][0], tasks[i][1]]; // assign index to each task
  }

  tasks.sort((a, b) => a[1] - b[1]); // sort by enqueue time
  let res = [], time = tasks[0][1];
  i = 0;
  while (i < n || !heap.isEmpty()) {
    while (i < n && tasks[i][1] <= time) { // add in all available tasks
      let [idx, enqueuetime, processingTime] = tasks[i];
      heap.add([idx, processingTime]);
      i++;
    }
    if (heap.isEmpty()) {
      time = tasks[i][1]; // jump to the next available task if there are no available tasks.
    } else {
      let [index, processTime] = heap.remove(); // process the task
      res.push(index);
      time += processTime;
    }
  }
  return res;
};

class PriorityQueue {
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

// Two test cases to run function on
console.log(getOrder([[1,2],[2,4],[3,2],[4,1]])) // [0,2,3,1]
console.log(getOrder([[7,10],[7,12],[7,5],[7,4],[7,2]])) // [4,3,2,0,1]