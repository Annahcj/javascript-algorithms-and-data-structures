// 857. Minimum Cost to Hire K Workers
// There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the minimum wage expectation for the ith worker.
// We want to hire exactly k workers to form a paid group. To hire a group of k workers, we must pay them according to the following rules:
  // 1. Every worker in the paid group must be paid at least their minimum wage expectation.
  // 2. In the group, each worker's pay must be directly proportional to their quality. This means if a worker’s quality is double that of another worker in the group, then they must be paid twice as much as the other worker.
// Given the integer k, return the least amount of money needed to form a paid group satisfying the above conditions. Answers within 10-5 of the actual answer will be accepted.


// Solution: Greedy w/ Heap

// Calculate the wage:quality ratio for each worker (wage / quality).
// The maximum wage:quality ratio in a group of workers is the ratio that everyone in the group must follow (because we must respect the minimum wage for every worker).
// Hence, we can try to select a group of workers with the smallest wage:quality ratio.

// Sort workers based on wage:quality ratio in asc order.
// Process the workers in the sorted order, while keeping track of workers in a heap sorted by quality in desc order.
// When the heap has more than k workers, remove the worker with maximum quality. This is because given the same wage:quality ratio for everyone in the group, the person with maximum quality will require the most money.

// Time Complexity: O(n log(n) + n log(k)) 113ms
// Space Complexity: O(n + k) 65.8MB
var mincostToHireWorkers = function(quality, wage, k) {
  let n = quality.length, workers = [];
  for (let i = 0; i < n; i++) {
    workers.push([wage[i] / quality[i], quality[i]]);
  }
  // sort by wage:quality ratio in asc order
  workers.sort((a, b) => a[0] - b[0]); 
  
  let heap = new Heap((a, b) => b[1] - a[1]); // [wageQualityRatio, quality]
  let qualitySum = 0, minGroupPay = Infinity;
  for (let [wageQualityRatio, quality] of workers) {
    qualitySum += quality;
    heap.add([wageQualityRatio, quality]);
    if (heap.size > k) {
      let [_, removedQuality] = heap.remove();
      qualitySum -= removedQuality;
    }
    if (heap.size === k) {
      // the current wageQualityRatio is the maximum of the group since workers is sorted in asc order by wageQualityRatio
      let groupPay = qualitySum * wageQualityRatio;
      minGroupPay = Math.min(minGroupPay, groupPay);
    }
  }
  return minGroupPay;
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
console.log(mincostToHireWorkers([10,20,5], [70,50,30], 2)) // 105
console.log(mincostToHireWorkers([3,1,10,10,1], [4,8,2,2,7], 3)) // 30.66667