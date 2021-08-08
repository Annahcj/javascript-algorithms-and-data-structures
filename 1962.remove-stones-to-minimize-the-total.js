// 1962. Remove Stones to Minimize the Total
// You are given a 0-indexed integer array piles, where piles[i] represents the number of stones in the ith pile, and an integer k. You should apply the following operation exactly k times:
// Choose any piles[i] and remove floor(piles[i] / 2) stones from it.
// Notice that you can apply the operation on the same pile more than once.
// Return the minimum possible total number of stones remaining after applying the k operations.
// floor(x) is the greatest integer that is smaller than or equal to x (i.e., rounds x down).


// Solution: Priority Queue / Max Heap

// Initiate a new MaxHeap 'heap', sum (sum of all piles)
// Add each pile to heap and sum (push each pile into heap and calculate sum)
// Loop while k is bigger than 0
  // Remove first item from heap (the biggest item), save it in a variable 'curr'
  // If piles[0] is equal to 0, return 0 (nothing left to halve)
  // Calculate amount of stones to remove from curr -> Math.floor(curr / 2), save it in a variable 'toTake'.
  // Decrement curr by toTake.
  // Decrement sum by toTake.
  // Decrement k by one.
  // Add the updated curr back to heap.
// Return sum.

// Time Complexity: O(n log(n)) 396ms
// Space Complexity: O(n) 64.1MB

// Max Heap
  class MaxHeap {
    constructor() {
      this.values = [];
    }
    add(value) {
      let pushed = this.values.push(value);
      let currIdx = this.values.length - 1;
      let parentIdx = Math.floor((currIdx - 1) / 2);
      while (parentIdx >= 0 && this.values[parentIdx] < this.values[currIdx]) {
        [this.values[parentIdx], this.values[currIdx]] = [this.values[currIdx], this.values[parentIdx]];
        currIdx = parentIdx;
        parentIdx = Math.floor((currIdx - 1) / 2);
      }
      return pushed;
    }
    remove() {
      if (!this.values.length) return -1;
      let currIdx = 0;
      [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
      let removed = this.values.pop();
      let leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
      function getSmaller(vals, leftIdx, rightIdx) {
        if (rightIdx < vals.length) {
          if (vals[leftIdx] > vals[rightIdx]) {
            return leftIdx;
          } return rightIdx;
        } else {
          if (leftIdx < vals.length) return leftIdx;
          return -1;
        }
      }
      let smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      while (smallerChild > -1 && this.values[smallerChild] > this.values[currIdx]) {
        [this.values[currIdx], this.values[smallerChild]] = [this.values[smallerChild], this.values[currIdx]];
        currIdx = smallerChild;
        leftIdx = currIdx * 2 + 1, rightIdx = currIdx * 2 + 2;
        smallerChild = getSmaller(this.values, leftIdx, rightIdx);
      }
      return removed;
    }
  }
  var minStoneSum = function(piles, k) {
    let heap = new MaxHeap(), sum = 0;
    for (var pile of piles) heap.add(pile), sum += pile;
    while (k > 0) {
      let curr = heap.remove();
      if (piles[0] === 0) return 0;
      let toTake = Math.floor(curr / 2);
      sum -= toTake;
      curr -= toTake;
      k--;
      heap.add(curr);
    }
    return sum;
  };
  
  // Two test cases to run function on
  console.log(minStoneSum([5,4,9], 2)) // 12
  console.log(minStoneSum([4,3,6,7], 3)) // 12