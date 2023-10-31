// 358. Rearrange String k Distance Apart
// Given a string s and an integer k, rearrange s such that the same characters are at least distance k from each other. If it is not possible to rearrange the string, return an empty string "".


// Solution: Priority Queue & Queue

// Use a priority queue to get the character with the biggest frequency.
// Additionally, we also use a normal queue to keep the k - 1 characters that we've just used.
// When the waitQueue reaches a length of k, shift off the leftmost character and add it to the priority queue.

// Time Complexity: O(n) (O(n log(26)) = O(n))
// Space Complexity: O(1) (O(26) = O(1))
var rearrangeString = function(s, k) {
  let freq = Array(26).fill(0);
  for (let char of s) freq[char.charCodeAt() - 97]++;
  let pq = new Heap((a, b) => b.freq - a.freq);
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) pq.add({char: String.fromCharCode(i + 97), freq: freq[i]});
  }
  let waitQueue = [], res = "";
  while (!pq.isEmpty()) {
    let {char, freq} = pq.remove();
    res += char;
    waitQueue.push({char, freq: freq - 1});
    if (waitQueue.length < k) continue;
    let first = waitQueue.shift();
    if (first.freq > 0) {
      pq.add(first);
    }
  }
  return res.length === s.length ? res : "";
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

// Three test cases
console.log(rearrangeString("aabbcc", 3)) // "abcabc"
console.log(rearrangeString("aaabc", 3)) // ""
console.log(rearrangeString("aaadbbcc", 2)) // "abacabcd"