// 354. Russian Doll Envelopes
// You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.
// One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.
// Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).
// Note: You cannot rotate an envelope.


// Solution: Sorting & LIS

// 1. Sort envelopes by height in asc order, 
  // If they tie, sort by width in DESC order. (This is because they don't fit together if they have equal width, and can't be included in the same LIS)
// 2. Build LIS (longest increasing subsequence) using binary search

// LIS:
  // The numbers in the LIS may not be the correct sequence, but the length is always correct.
  // The length only changes when a bigger number is added to the end of the sequence. 

// Time Complexity: O(n log(n)) 279ms
// Space Complexity: O(n) 77.3MB
var maxEnvelopes = function(envelopes) {
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1]; // make sure envelopes with equal width are not included in the same LIS
    return a[0] - b[0];
  })

  let seq = [], n = envelopes.length;
  for (let i = 0; i < n; i++) {
    // build LIS
    let index = getIndex(envelopes[i][1]);
    if (index === -1) seq.push(envelopes[i][1]);
    else seq[index] = envelopes[i][1];
  }
  return seq.length;
  
  // binary search for smallest index where seq[index] is bigger than num
  function getIndex(num) {
    let low = 0, high = seq.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (seq[mid] >= num) high = mid;
      else low = mid + 1;
    }
    return seq[low] >= num ? low : -1;
  }
};

// Two test cases to run function on
console.log(maxEnvelopes([[5,4],[6,4],[6,7],[2,3]])) // 3
console.log(maxEnvelopes([[1,1],[1,1],[1,1]])) // 1