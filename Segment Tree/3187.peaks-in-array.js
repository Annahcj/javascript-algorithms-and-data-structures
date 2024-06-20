// 3187. Peaks in Array
// A peak in an array arr is an element that is greater than its previous and next element in arr.
// You are given an integer array nums and a 2D integer array queries.
// You have to process queries of two types:
  // queries[i] = [1, l[i], r[i]], determine the count of peak elements in the subarray nums[l[i]..r[i]].
  // queries[i] = [2, index[i], val[i]], change nums[index[i]] to val[i].
// Return an array answer containing the results of the queries of the first type in order.
// Notes:
  // The first and the last element of an array or a subarray cannot be a peak.


// Solution: Segment Tree

// Use a segment tree to query the number of peaks in a range and efficiently update the peak count.
  // querying peaks: For a range [l,r], get the number of peaks in the tree in the range [l + 1, r - 1], since peaks at the ends of the subarray should not be included in the count.
  // updating peaks: When updating nums[i], we must also update the two adjacent numbers as the condition has changed.

// n = length of nums, m = number of queries
// Time Complexity: O(n + m log(n)) 629ms
// Space Complexity: O(n) (excluding output) 100.1MB
var countOfPeaks = function(nums, queries) {
  let n = nums.length, peaks = Array(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    peaks[i] = isPeak(nums, i) ? 1 : 0;
  }
  let segTree = new SegmentTree(peaks), ans = [];
  for (let [type, ...args] of queries) {
    if (type === 1) {
      let [l, r] = args;
      ans.push(segTree.sumRange(l + 1, r - 1));
    } else {
      let [index, val] = args;
      nums[index] = val;
      
      let affectedIndices = [index - 1, index, index + 1];
      for (let affectedIndex of affectedIndices) {
        let peak = isPeak(nums, affectedIndex);
        if (peaks[affectedIndex] !== peak) {
          peaks[affectedIndex] = peak;
          segTree.update(affectedIndex, peak ? 1 : 0);
        }
      }
    }
  }
  return ans;
};

function isPeak(nums, i) {
  return i > 0 && i < nums.length - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];
}

class SegmentTree {
  constructor(arr) {
    let n = arr.length;
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
    this.build(arr);
  }
  build(arr) {
    let n = this.size;
    for (let i = n; i < n * 2; i++) {
      this.segTree[i] = arr[i - n]; // populate leaf values
    }
    for (let i = n - 1; i > 0; i--) {
      this.segTree[i] = this.segTree[i * 2] + this.segTree[i * 2 + 1]; // sum
    }
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  sumRange(left, right) {
    if (left > right) return 0;
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    // when left is odd or right is even, this indicates partial coverage. 
    // in other words, the parent node will be covering a range outside of the range we are looking for.
    // so, we need to take the partial sum and move the pointers so that it has full coverage.
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Two test cases
console.log(countOfPeaks([3,1,4,2,5], [[2,3,4],[1,0,4]])) // [0]
console.log(countOfPeaks([4,1,4,2,1,5], [[2,2,4],[1,0,2],[1,0,4]])) // [0,1]