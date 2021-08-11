// 767. Reorganize String
// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
// Return any possible rearrangement of s or return "" if not possible.


// Solution: Count Char Frequency / Max Heap

// Logic:
// First, check whether rearrangement is possible -> if the frequency of the most frequent character is bigger than the length of half the string, return "". 
// ^^ It is technically (s.length + 1) / 2, because 'aab', is bigger than half, but since we can put 'a' first, it's still valid.
// Otherwise, use a priority queue to put each character and its frequency, then take out one at a time while checking its not the same as the previous letter.

// Algorithm:
// Intiate a new MaxHeap, and a new map (for keeping frequencies)
// Loop through s, store each frequency in map.
// Loop through each key in frequency map, add it to the maxHeap.
// If frequency of most frequency character is bigger than (s.length + 1) / 2, return "".
// Otherwise, loop while heap is not empty
  // Set curr to heap.remove() (current most frequent character)
  // (curr[0] is the frequency, curr[1] is character)
  // If curr[0] is not equal to the previous character in res (result)
    // Add curr[1] to res
    // If curr[0] is bigger than 1 (only if it has characters left), add it back into heap with frequency - 1.
  // Otherwise,
    // Set 'second' to heap.remove()
    // Add second[1] to res
    // If second[0] is bigger than 1, add it back into heap with frequency - 1.
    // Add curr back to heap (we didn't use it so add it back untouched)
// Return res.

// Time Complexity: O(n log(n)) technically O(n + n log(n) + n log(n)) 88ms
// Space Complexity: O(k) (maxHeap + char count map) 43.5MB
  class MaxHeap {
    constructor() {
      this.values = [];
    }
    add(value) {
      let pushed = this.values.push(value);
      let currIdx = this.values.length - 1;
      let parentIdx = Math.floor((currIdx - 1) / 2);
      while (parentIdx >= 0 && this.values[parentIdx][0] < this.values[currIdx][0]) {
        [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
        currIdx = parentIdx;
        parentIdx = Math.floor((currIdx - 1) / 2);
      }
      return pushed;
    }
    remove() {
      if (!this.values.length) return -1;
      let currIdx = 0;
      [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
      let removed = this.values.pop();
      let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
      function getSmaller(vals, leftIdx, rightIdx) {
        if (rightIdx < vals.length) {
          if (vals[leftIdx][0] > vals[rightIdx][0]) {
            return leftIdx;
          } return rightIdx;
        } else {
          if (leftIdx < vals.length) return leftIdx;
          return -1;
        }
      }
      let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      while (smallerChild > -1 && this.values[smallerChild][0] > this.values[currIdx][0]) {
        [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
        currIdx = smallerChild;
        leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
        smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      }
      return removed;
    }
  }
  var reorganizeString = function(s) {
    let heap = new MaxHeap(), map = {};
    for (var char of s) map[char] = (map[char] || 0) + 1;
    for (var key in map) heap.add([map[key], key]);
    let max = heap.values[0][0];
    if (max > (s.length + 1) / 2) return "";
    let res = "";
    while (heap.values.length) {
      let curr = heap.remove();
      if (curr[1] !== res[res.length - 1]) {
        res += curr[1];
        if (curr[0] > 1) heap.add([curr[0] - 1, curr[1]]);
      } else {
        let second = heap.remove();
        res += second[1];
        if (second[0] > 1) heap.add([second[0] - 1, second[1]]);
        heap.add(curr);
      }
    }
    return res; 
  };
  
  // Two test cases to run function on
  console.log(reorganizeString("aab")) // "aba"
  console.log(reorganizeString("aaab")) // ""