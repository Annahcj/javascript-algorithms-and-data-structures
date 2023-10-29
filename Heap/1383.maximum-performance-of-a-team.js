// 1383. Maximum Performance of a Team
// You are given two integers n and k and two integer arrays speed and efficiency both of length n. There are n engineers numbered from 1 to n. speed[i] and efficiency[i] represent the speed and efficiency of the ith engineer respectively.
// Choose at most k different engineers out of the n engineers to form a team with the maximum performance.
// The performance of a team is the sum of their engineers' speeds multiplied by the minimum efficiency among their engineers.
// Return the maximum performance of this team. Since the answer can be a huge number, return it modulo 109 + 7.


// Solution: Sorting, Heap, BigInt

// Note: Without BigInt, JavaScript fails the last test case. 

// 1. Group speed and efficiency together into an array 'engineers' -> for sorting.
// 2. Sort engineers by efficiency in asc order.
// 3. Loop from back to front and keep track of the k highest speeds in a heap, 
  // keep track of the best combination of: sum of k highest speeds * current minimum efficiency

// Observations:
  // Once we have a minimum efficiency, the efficiency of the other engineers does not matter as long as it is greater than or equal to the min efficiency.
  // So, we should loop from back to front and keep track of the k highest speeds in a heap.
  // Since we have sorted based on efficiency, the current efficiency we are at is the minimum efficiency.

// Time Complexity: O(n log(n)) 510ms
  // O(n log(n)) for sorting
  // O(n log(k)) for heap
// Space Complexity: O(n + k) 82.8MB
  // O(n) for engineers
  // O(k) for heap
var maxPerformance = function(n, speed, efficiency, k) {  
  let engineers = [], mod = BigInt(10 ** 9 + 7);
  for (let i = 0; i < n; i++) engineers.push([speed[i], efficiency[i]]);
  engineers.sort((a, b) => a[1] - b[1]);

  let ans = 0n, sum = 0n, heap = new Heap((a, b) => a - b); // min heap
  for (let j = n - 1; j >= 0; j--) {
    let speed = BigInt(engineers[j][0]), efficiency = BigInt(engineers[j][1]);
    sum += speed; // sum of speed
    heap.add(speed);
    if (j < n - k) sum -= heap.remove(); // only keep the k highest speeds
    if (sum * efficiency > ans) ans = sum * efficiency;
  }
  return ans % mod;
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
console.log(maxPerformance(6, [2,10,3,1,5,8], [5,4,3,9,7,2], 2)) // 60
console.log(maxPerformance(6, [2,10,3,1,5,8], [5,4,3,9,7,2], 3)) // 68