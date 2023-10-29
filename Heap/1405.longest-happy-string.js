// 1405. Longest Happy String
// A string s is called happy if it satisfies the following conditions:
  // s only contains the letters 'a', 'b', and 'c'.
  // s does not contain any of "aaa", "bbb", or "ccc" as a substring.
  // s contains at most a occurrences of the letter 'a'.
  // s contains at most b occurrences of the letter 'b'.
  // s contains at most c occurrences of the letter 'c'.
// Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".


// Solution: Heap

// n = a + b + c
// Time Complexity: O(n log(n)) 
// Space Complexity: O(n)
var longestDiverseString = function(a, b, c) {
  let heap = new Heap((a, b) => b[1] - a[1]);
  if (a > 0) heap.add(['a', a]);
  if (b > 0) heap.add(['b', b]);
  if (c > 0) heap.add(['c', c]);
  let res = "";

  while (!heap.isEmpty()) {
    let [letter, count] = heap.remove();
    if (res.length < 2 || (res[res.length - 1] !== letter || res[res.length - 2] !== letter)) { // we can use this letter
      res += letter;
      count--;
      if (count > 0) heap.add([letter, count]);
    } else { // we need to take the next letter, we already have the last two letters equal to letter
      if (heap.isEmpty()) return res; // return res, we can't add any more letters.
      let [letter2, count2] = heap.remove(); // remove the next most frequent letter
      res += letter2; 
      count2--;
      if (count2 > 0) heap.add([letter2, count2]); // add letter2 back to the heap
      heap.add([letter, count]); // add letter back to the heap, we didn't use it so the count remains the same.
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
  isEmpty() {
    return this.values.length === 0;
  }
}

// Three test cases
console.log(longestDiverseString(2, 2, 1)) // "aabbc"
console.log(longestDiverseString(1, 1, 7)) // "ccaccbcc"
console.log(longestDiverseString(7, 1, 0)) // "aabaa"