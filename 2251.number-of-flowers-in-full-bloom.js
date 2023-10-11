// 2251. Number of Flowers in Full Bloom
// You are given a 0-indexed 2D integer array flowers, where flowers[i] = [starti, endi] means the ith flower will be in full bloom from starti to endi (inclusive). You are also given a 0-indexed integer array persons of size n, where persons[i] is the time that the ith person will arrive to see the flowers.
// Return an integer array answer of size n, where answer[i] is the number of flowers that are in full bloom when the ith person arrives.


// Solution 1: Sorting, Min Heap, Two Pointers

// 1. Sort flowers by start date in asc order.
// 2. Sort the people in asc order.
// 3. Use two pointers to go through each people[i] and add flowers with start <= people[i] into a min heap.
  // The min heap is sorted in asc order by end date.
  // Remove all flowers from the heap where the end <= people[i].
  // The size of the heap after the removals is the number of flowers in full bloom.

// Time Complexity: O(n log(n) + m log(m)) 282ms
// Space Complexity: O(n + m) 102.6MB
var fullBloomFlowers = function(flowers, people) {
  flowers.sort((a, b) => a[0] - b[0]);
  people = people.map((time, idx) => [time, idx]).sort((a, b) => a[0] - b[0]);
  let flowerIndex = 0, minHeap = new Heap((a, b) => a[1] - b[1]);
  let fullBloom = Array(people.length);
  for (let [time, idx] of people) {
    // Add flowers with start <= time
    while (flowerIndex < flowers.length && flowers[flowerIndex][0] <= time) {
      minHeap.add(flowers[flowerIndex]);
      flowerIndex++;
    }
    // Remove flowers with end < time
    while (!minHeap.isEmpty() && minHeap.top()[1] < time) {
      minHeap.remove();
    }
    fullBloom[idx] = minHeap.size;
  }
  return fullBloom;
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


// Solution 2: Sweep Line - Prefix Sum & Binary Search

// 1. Get each start position from flowers and count the number of flowers at each position.
// indexes = ordered hashmap
  // indexes[start] += 1
  // indexes[end + 1] -= 1
// 2. Prefix sum on indexes to populate the number of flowers at each position (each unique start and end + 1 positions that exists in flowers).
// 3. Lastly, binary search on the sums for each person (sums[i] = [position, sum])
  // Find the highest index in sums where sums[i][0] <= persons[j]

// n = flowers.length, m = persons.length
// Time Complexity: O(m log(n)) 482ms
// Space Complexity: O(n) 105.5MB
var fullBloomFlowers = function(flowers, persons) {  
  let indexes = {};
  for (let [start, end] of flowers) {
    if (!indexes[start]) indexes[start] = 0;
    if (!indexes[end + 1]) indexes[end + 1] = 0;
    indexes[start]++;
    indexes[end + 1]--;
  }
  
  // prefix sum
  let sums = [], sum = 0;
  for (let position in indexes) {
    sum += indexes[position];
    sums.push([Number(position), sum]);
  }
  
  let res = [];
  for (let time of persons) {
    // binary search for the rightmost index where sums[i][0] <= time
    res.push(getCount(time));
  }
  return res;

  function getCount(time) {
    let low = 0, high = sums.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (sums[mid][0] <= time) low = mid;
      else high = mid - 1;
    }
    return sums[low][0] <= time ? sums[low][1] : 0;
  }
};

// Two test cases 
console.log(fullBloomFlowers([[1,6],[3,7],[9,12],[4,13]], [2,3,7,11])) // [1,2,2,2]
console.log(fullBloomFlowers([[19,37],[19,38],[19,35]], [6,7,21,1,13,37,5,37,46,43])) // [0,0,3,0,0,2,0,2,0,0]