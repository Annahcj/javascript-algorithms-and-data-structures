// 1792. Maximum Average Pass Ratio
// There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.
// You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.
// The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.
// Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.


// Solution: Heap

// Get the increase of the pass ratio in each class if we add one extra student.
  // This is calculated by: ((pass + 1) / (total + 1)) - (pass / total), meaning the pass rate with one extra passing student - the current pass rate
// Since extraStudents <= 10^5, we can do this for every extra student.

// Keep each (increase, pass, total) in a max heap.
// After assigning an extra student to a class, add the updated values (new increase, pass + 1, total + 1) back into the heap.

// Time Complexity: O(n log(n)) 1133ms
// Space Complexity: O(n) 113MB
var maxAverageRatio = function(classes, extraStudents) {
  let heap = new Heap((a, b) => b[0] - a[0]);
  for (let [pass, total] of classes) {
    heap.add([getIncrease(pass, total), pass, total]);
  }
  for (let i = 0; i < extraStudents; i++) {
    let [_, pass, total] = heap.remove();
    heap.add([getIncrease(pass + 1, total + 1), pass + 1, total + 1]);
  }
  return heap.values.reduce((acc, curr) => {
    return acc + (curr[1] / curr[2]);
  }, 0) / classes.length;
  
  function getIncrease(pass, total) {
    return ((pass + 1) / (total + 1)) - (pass / total);
  }
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
console.log(maxAverageRatio([[1,2],[3,5],[2,2]], 2)) // 0.78333
console.log(maxAverageRatio([[2,4],[3,9],[4,5],[2,10]], 4)) // 0.53485