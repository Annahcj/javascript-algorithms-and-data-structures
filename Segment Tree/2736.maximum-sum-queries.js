// 2736. Maximum Sum Queries
// You are given two 0-indexed integer arrays nums1 and nums2, each of length n, and a 1-indexed 2D array queries where queries[i] = [xi, yi].
// For the ith query, find the maximum value of nums1[j] + nums2[j] among all indices j (0 <= j < n), where nums1[j] >= xi and nums2[j] >= yi, or -1 if there is no j satisfying the constraints.
// Return an array answer where answer[i] is the answer to the ith query.


// Solution: Segment Tree 

// 1. Collect tuples of each (nums1[j], nums2[j]) and sort by nums1[j] in desc order.
// 2. Sort the queries in desc order by x, then y.
// 3. Go through each query and use a segment tree to keep track of maximum (nums1[j] + nums2[j]) for each range. index[nums2[j]] is used for the range.
  // a. Keep a pointer in nums and move it right while nums1[j] >= the current x. Update the values in the segment tree as we move the pointer.
  // b. The answer of the query is the maximum (nums1[j] + nums2[j]) in range (y, end of segment tree)

// Note: Since nums2[i] and y <= 10^9, we need to convert these to the minimal form and assign a count starting from 0.

// n = length of nums1, m = number of queries
// Time Complexity: O(n log(n) + m log(m + n)) 649ms 
// Space Complexity: O(m + n) 144.6MB
var maximumSumQueries = function(nums1, nums2, queries) {
  let nums = [], n = nums1.length, indexMap = {}; 
  for (let i = 0; i < n; i++) {
    nums.push([nums1[i], nums2[i]]);
    indexMap[nums2[i]] = 1;
  }
  nums.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]);
  for (let [_x, y] of queries) {
    indexMap[y] = 1;
  }
  let index = 0;
  for (let value in indexMap) {
    indexMap[value] = index++; // assign a minimized index to each value
  }
  queries = queries.map(([x, y], i) => [x, y, i]).sort((a, b) => a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]);

  let m = queries.length, ans = Array(m);
  let segTree = new SegmentTree(index), numsIndex = 0;
  for (let [x, y, queryIndex] of queries) {
    while (numsIndex < n && nums[numsIndex][0] >= x) {
      segTree.update(indexMap[nums[numsIndex][1]], nums[numsIndex][0] + nums[numsIndex][1]);
      numsIndex++;
    }
    let max = segTree.maxRange(indexMap[y], index - 1);
    ans[queryIndex] = max === 0 ? -1 : max;
  }
  return ans;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = Math.max(this.segTree[idx], val);
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxRange(left, right) {
    let n = this.size, max = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) max = Math.max(max, this.segTree[left_idx++]);
      if (right_idx % 2 === 0) max = Math.max(max, this.segTree[right_idx--]);
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return max;
  }
}

// Three test cases
console.log(maximumSumQueries([4,3,1,2], [2,4,9,5], [[4,1],[1,3],[2,5]])) // [6,10,7]
console.log(maximumSumQueries([3,2,5], [2,3,4], [[4,4],[3,2],[1,1]])) // [9,9,9]
console.log(maximumSumQueries([2,1], [2,3], [[3,3]])) // [-1]