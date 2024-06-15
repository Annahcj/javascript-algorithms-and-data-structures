// 502. IPO
// Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.
// You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.
// Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.
// Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.
// The answer is guaranteed to fit in a 32-bit signed integer.


// Solution: Sorting & Max Heap

// As long as we have enough capital, it's optimal to take the projects with the biggest profit.
// Sort projects by capital in asc order, then use a max heap to get the projects with the maximum profit.
// Do this to get the k maximum projects.

// n = number of projects
// Time Complexity: O(n log(n)) 259ms
// Space Complexity: O(n) 82.6MB
var findMaximizedCapital = function(k, w, profits, capital) {
  let n = profits.length, projects = [];
  for (let i = 0; i < n; i++) {
    projects.push([profits[i], capital[i]]);
  }
  projects.sort((a, b) => a[1] - b[1]);
  let heap = new Heap((a, b) => b - a);
  let currCapital = w, j = 0;
  for (let i = 0; i < k; i++) {
    while (j < n && projects[j][1] <= currCapital) {
      heap.add(projects[j][0]);
      j++;
    }
    currCapital += heap.size > 0 ? heap.remove() : 0;
  }
  return currCapital;
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
console.log(findMaximizedCapital(2, 0, [1,2,3], [0,1,1])) // 4
console.log(findMaximizedCapital(3, 0, [1,2,3], [0,1,2])) // 6