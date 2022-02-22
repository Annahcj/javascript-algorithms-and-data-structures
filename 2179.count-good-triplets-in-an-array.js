// 2179. Count Good Triplets in an Array
// You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].
// A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.
// Return the total number of good triplets.


// Solution: Segment Tree 

// 1. Get the indices of nums1[i] in nums2.
  // e.g: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
  // idxs = [0,2,1,4,3]
// 2. For each i, get the number of indices to the left of i smaller than idxs[i] in both nums1 and nums2.
// 3. For each i, get the number of indices to the right of i bigger than idxs[i] in both nums1 and nums2.
// 4. Get the number of good triplets by using each i as the middle of the triplet -> smallerLeft[i] * biggerRight[i]
  // Formula explanation: Let's say we have indices 0,1 on the left and indices 3,4 on the right.
  // We have 2 * 2 = 4 pairs because for each left index, it can be paired with each right index (with i as the middle element).
  // 0,3  0,4 and 1,3  1,4

// Segment Tree explanation:
  // Similar to 315. Count of Smaller Numbers After Self, we use each bucket to store the frequency of the number.
  // Instead of counting smaller numbers on the right, we are counting smaller numbers on the left and bigger numbers on the right.

// Time Complexity: O(n log(n)) 359ms
// Space Complexity: O(n) 65.1MB
var goodTriplets = function(nums1, nums2) {
  let n = nums1.length, nums2_idx = Array(n);
  for (let i = 0; i < n; i++) nums2_idx[nums2[i]] = i;
  let idxs = Array(n);
  for (let i = 0; i < n; i++) idxs[i] = nums2_idx[nums1[i]];
  
  let smallerLeft = getSmallerLeft(idxs); // smallerLeft[i] = number of indices to the left of i smaller than idxs[i] in both nums1 and nums2
  let biggerRight = getBiggerRight(idxs); // biggerRight[i] = number of indices to the right of i bigger than idxs[i] in both nums1 and nums2
  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    ans += smallerLeft[i] * biggerRight[i];
  }
  return ans;
};

function getSmallerLeft(idxs) {
  let n = idxs.length, res = Array(n).fill(0);
  let segTree = new SegmentTree(n);
  for (let i = 0; i < n; i++) {
    res[i] = segTree.getSum(0, idxs[i] - 1);
    segTree.update(idxs[i], 1);
  }
  return res;
}

function getBiggerRight(idxs) {
  let n = idxs.length, res = Array(n).fill(0);
  let segTree = new SegmentTree(n);
  for (let i = n - 1; i >= 0; i--) {
    res[i] = segTree.getSum(idxs[i] + 1, n - 1);
    segTree.update(idxs[i], 1);
  }
  return res;
}

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] += val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  getSum(left, right) {
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Two test cases to run function on
console.log(goodTriplets([2,0,1,3], [0,1,2,3])) // 1
console.log(goodTriplets([4,0,1,3,2], [4,1,0,2,3])) // 4