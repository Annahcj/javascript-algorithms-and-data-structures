// 767. Reorganize String
// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
// Return any possible rearrangement of s or return "" if not possible.


// Solution: Max Heap & Count Occurances

// Count the occurances of each character in s.
// If any count exceeds Math.ceil(s.length / 2), then there is no possible rearrangement.
// Add the character counts to a max heap and greedily take the character with the current max count that is not the same as the previous character.
  // If the character with the max count is the same as the previous character, take the character with the second largest count.

// n = length of s, k = number of unique characters (26)
// Time Complexity: O(nk) 87ms
// Space Complexity: O(k) 47.5MB
var reorganizeString = function(s) {
  let n = s.length, counts = {};
  for (let char of s) {
    counts[char] = (counts[char] || 0) + 1;
    if (counts[char] > Math.ceil(n / 2)) return "";
  }
  let heap = new Heap((a, b) => b[1] - a[1]); // [char, count]
  let res = "";
  for (let char in counts) {
    heap.add([char, counts[char]]);
  }
  for (let i = 0; i < n; i++) {
    let [maxChar, maxCharCount] = heap.remove();
    if (!res.length || res[res.length - 1] !== maxChar) {
      res += maxChar;
      if (maxCharCount > 1) heap.add([maxChar, maxCharCount - 1]);
    } else {
      let [secondMaxChar, secondMaxCharCount] = heap.remove();
      res += secondMaxChar;
      if (secondMaxCharCount > 1) heap.add([secondMaxChar, secondMaxCharCount - 1]);
      heap.add([maxChar, maxCharCount]);
    }
  }
  return res;
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
console.log(reorganizeString("aab")) // "aba"
console.log(reorganizeString("aaab")) // ""