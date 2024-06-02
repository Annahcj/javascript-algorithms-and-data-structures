// 3170. Lexicographically Minimum String After Removing Stars
// You are given a string s. It may contain any number of '*' characters. Your task is to remove all '*' characters.
// While there is a '*', do the following operation:
  // Delete the leftmost '*' and the smallest non-'*' character to its left. If there are several smallest characters, you can delete any of them.
// Return the lexicographically smallest resulting string after removing all '*' characters.


// Solution: Min Heap

// When we have multiple occurances of the smallest character on the left side, it's optimal to remove the rightmost one to get the lexicographically smallest resulting string.
// This is because we need the smallest characters as early on in the string as possible to ensure the lexicographically smallest string.

// Use a min heap to store the indices of characters in s as we iterate through it.
// The min heap is ordered by the smallest character first, then the highest index if they characters are equal.
// If we encounter a '*', remove the index from the top of the heap and mark it as deleted.
// At the end, build up the final string by concatenating characters that are not '*' and not deleted.

// Time Complexity: O(n log(n)) 494ms
  // Note: String concatenation in JS is O(n), so technically the time complexity is O(n^2), but in practice it's a bit faster.
// Space Complexity: O(n) 77.9MB
function clearStars(s) {
  let n = s.length, heap = new Heap((a, b) => {
    if (s[a] === s[b]) return b - a; // highest index first
    return s[a].localeCompare(s[b]); // then by smallest character
  });
  let deleted = Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (s[i] === '*') {
      deleted[heap.remove()] = true;
    } else {
      heap.add(i);
    }
  }
  let ans = "";
  for (let i = 0; i < n; i++) {
    if (s[i] !== '*' && !deleted[i]) {
      ans += s[i];
    }
  }
  return ans;
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
console.log(clearStars("aaba*")) // "aab"
console.log(clearStars("abc")) // "abc"