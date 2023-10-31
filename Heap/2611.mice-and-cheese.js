// 2611. Mice and Cheese
// There are two mice and n different types of cheese, each type of cheese should be eaten by exactly one mouse.
// A point of the cheese with index i (0-indexed) is:
  // reward1[i] if the first mouse eats it.
  // reward2[i] if the second mouse eats it.
// You are given a positive integer array reward1, a positive integer array reward2, and a non-negative integer k.
// Return the maximum points the mice can achieve if the first mouse eats exactly k types of cheese.


// Solution 1: Greedy w/ Sorting

// The first mouse should always take the k cheese with the maximum difference (reward1[i] - reward2[i]).
// This ensures the loss is minimal.

// Time Complexity: O(n log(n)) 302ms
// Space Complexity: O(n) 70.8MB
var miceAndCheese = function(reward1, reward2, k) {
  let n = reward1.length, rewards = [];
  for (let i = 0; i < n; i++) {
    rewards.push([reward1[i], reward2[i], reward1[i] - reward2[i]]);
  }
  rewards.sort((a, b) => b[2] - a[2]);
  let score = 0;
  for (let i = 0; i < n; i++) {
    score += i < k ? rewards[i][0] : rewards[i][1];
  }
  return score;
};


// Solution 2: Greedy w/ Heap

// Use a min heap to keep track of the k cheese with maximum difference.
// When the heap has more than k elements, remove the element with minimum difference.

// Let the second mouse take all the cheese, then subtract the difference of reward1[i] - reward2[i] from the k cheese that the first mouse takes.

// Time Complexity: O(k log(k)) 340ms
// Space Complexity: O(k) 72.2MB
var miceAndCheese = function(reward1, reward2, k) {
  let n = reward1.length, heap = new Heap((a, b) => a[2] - b[2]);
  let score = 0;
  for (let i = 0; i < n; i++) {
    score += reward2[i];
    heap.add([reward1[i], reward2[i], reward1[i] - reward2[i]]);
    if (heap.size > k) heap.remove(); // maintain k maximum
  }
  for (let i = 0; i < k; i++) {
    let [r1, r2] = heap.remove();
    score += r1 - r2;
  }
  return score;
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
console.log(miceAndCheese([1,1,3,4], [4,4,1,1], 2)) // 15
console.log(miceAndCheese([1,1], [1,1], 2)) // 2