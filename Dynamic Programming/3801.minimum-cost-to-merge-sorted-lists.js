// 3801. Minimum Cost to Merge Sorted Lists
// You are given a 2D integer array lists, where each lists[i] is a non-empty array of integers sorted in non-decreasing order.
// You may repeatedly choose two lists a = lists[i] and b = lists[j], where i != j, and merge them. The cost to merge a and b is:
// len(a) + len(b) + abs(median(a) - median(b)), where len and median denote the list length and median, respectively.
// After merging a and b, remove both a and b from lists and insert the new merged sorted list in any position. Repeat merges until only one list remains.
// Return an integer denoting the minimum total cost required to merge all lists into one single sorted list.
// The median of an array is the middle element after sorting it in non-decreasing order. If the array has an even number of elements, the median is the left middle element.


// Solution: DP w/ Bitmasks & Binary Search

// 1. Precompute merging costs.
  // Go through every bitmask of lists (represents all subsets of lists) and precompute the median and length of each bitmask.
  // To precompute length: Sum of lengths in all lists.
  // To precompute median: Binary search for the lowest value x where sum(count smaller than or equal x) on all lists >= median index.
    // For each list, binary search for the number of elements that are smaller than x.
    // TC: O(2^n * log(m) * n log(k))

// 2. DP w/ bitmasks.
  // dp[mask] = minimum cost to merge all lists in mask into one list.
  // For the current dp[mask], try every possible previous two lists by iterating through every subset of mask.
  // dp[mask] = min(dp[mask], dp[prevList1] + dp[prevList2] + costToMerge(prevList1, prevList2)).

// n = length of lists, m = max(lists[i][j]), k = max(lists[i].length)
// Time Complexity: O(3^n) 841ms
  // Precomputation: O(2^n * log(m) * n log(k))
  // DP: O(3^n)
// Space Complexity: O(2^n) 69MB
function minMergeCost(lists) {
  const n = lists.length;
  let min = Infinity, max = -Infinity;
  for (const list of lists) {
    for (let num of list) {
      min = Math.min(min, num);
      max = Math.max(max, num);
    }
  }
  const [length, median] = precomputeLengthAndMedian();
  const dp = Array(1 << n).fill(Infinity);
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let a = (mask - 1) & mask; a > 0; a = (a - 1) & mask) {
      const b = mask - a;
      dp[mask] = Math.min(dp[mask], dp[a] + dp[b] + costToMerge(a, b));
    }
    if (setBits(mask) === 1) {
      dp[mask] = 0;
    }
  }
  return dp[(1 << n) - 1];

  function setBits(mask) {
    let count = 0;
    while (mask > 0) {
      if (mask & 1) {
        count++;
      }
      mask >>= 1;
    }
    return count;
  }

  function costToMerge(a, b) {
    return length[a] + length[b] + Math.abs(median[a] - median[b]);
  }

  function precomputeLengthAndMedian() {
    const length = Array(1 << n).fill(0);
    const median = Array(1 << n).fill(0);
    for (let mask = 1; mask < (1 << n); mask++) {
      length[mask] = getLength(mask);
      median[mask] = getMedian(mask, length[mask]);
    }
    return [length, median];
  }

  function getLength(mask) {
    let length = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        length += lists[i].length;
      }
    }
    return length;
  }

  function getMedian(mask, length) {
    const setLists = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        setLists.push(i);
      }
    }
    let low = min, high = max;
    const medianLength = Math.floor((length - 1) / 2) + 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (countSmallerOrEq(setLists, mid) >= medianLength) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }

  // for each list, binary search for the highest index where list[i] <= x.
  function countSmallerOrEq(setLists, x) {
    let count = 0;
    for (let listIndex of setLists) {
      const list = lists[listIndex];
      let low = 0, high = list.length - 1;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (list[mid] <= x) low = mid;
        else high = mid - 1;
      }
      count += list[low] <= x ? low + 1 : 0; // case when all numbers are larger than x
    }
    return count;
  }
};

// Four test cases
console.log(minMergeCost([[1,3,5],[2,4],[6,7,8]])) // 18
console.log(minMergeCost([[1,1,5],[1,4,7,8]])) // 10
console.log(minMergeCost([[1],[3]])) // 4
console.log(minMergeCost([[1],[1]])) // 2