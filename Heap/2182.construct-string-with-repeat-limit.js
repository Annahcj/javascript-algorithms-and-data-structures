// 2182. Construct String With Repeat Limit
// You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.
// Return the lexicographically largest repeatLimitedString possible.
// A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.


// Solution: Priority Queue 

// It is optimal to repeat the lexographically biggest character as much as possible, then separate it with the second biggest character.
// Use a priority queue sorted in descending lexographical order so store each character and its current frequency.

// Time Complexity: O(n log(26)) = O(n) 1996ms
// Space Complexity: O(n) 99.8MB
var repeatLimitedString = function(s, repeatLimit) {
  let freq = Array(26).fill(0);
  for (let char of s) {
    let charCode = char.charCodeAt() - 97;
    freq[charCode]++;
  }
  let heap = new Heap((a, b) => b[0].localeCompare(a[0]));
  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(i + 97);
    if (freq[i] > 0) heap.add([char, freq[i]]);
  }

  let res = [], cnt = 0; // cnt is the current length of consecutive characters
  while (!heap.isEmpty()) {
    let [char, freq] = heap.remove();
    // there is exactly repeatLimit number of consecutive characters, take the second biggest char.
    if (res.length >= repeatLimit && res[res.length - 1] === char && cnt === repeatLimit) {
      if (heap.isEmpty()) return res.join(""); // no characters left
      let [secondChar, secondFreq] = heap.remove();
      res.push(secondChar);
      if (secondFreq > 1) heap.add([secondChar, secondFreq - 1]);
      heap.add([char, freq]);
      cnt = 1; // reset count
    } else {
      if (res[res.length - 1] === char) cnt++; // another consecutive character
      else cnt = 1; // there is a new biggest character
      res.push(char);
      if (freq > 1) heap.add([char, freq - 1]);
    }
  }
  return res.join("");
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
console.log(repeatLimitedString("cczazcc", 3)) // "zzcccac"
console.log(repeatLimitedString("aababab", 2)) // "bbabaa"
console.log(repeatLimitedString("zzzzzabbbbbbbca", 2)) // "zzczzbzbbabbabb"