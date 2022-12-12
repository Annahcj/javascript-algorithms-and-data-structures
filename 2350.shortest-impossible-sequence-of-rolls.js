// 2350. Shortest Impossible Sequence of Rolls
// You are given an integer array rolls of length n and an integer k. You roll a k sided dice numbered from 1 to k, n times, where the result of the ith roll is rolls[i].
// Return the length of the shortest sequence of rolls that cannot be taken from rolls.
// A sequence of rolls of length len is the result of rolling a k sided dice len times.
// Note that the sequence taken does not have to be consecutive as long as it is in order.


// Solution: Greedy w/ Hashset

// To be able to take all sequences of length x, we need to keep track of the unique numbers we have found so far. We can keep these numbers in a hashset.
// When the set is complete, we can now start the next sequence length x+1.
// This is because the last characters of every sequence of length x must be the complete set of numbers [1, ..., k] before we can start on the next sequence length.
  // e.g: [4,4,1,1,2,2,3,3]
  // The first index where we get the full set of numbers for sequence length 1 is at index 6.
  // From that index onwards, we can now start building sequences of length 2.

// Time Complexity: O(n) 150ms
// Space Complexity: O(k) 59.3MB
var shortestSequence = function(rolls, k) {
  let set = new Set(), len = 0;
  for (let num of rolls) {
    set.add(num);
    if (set.size === k) { // found a full set - all sequences of length "len"
      set = new Set();
      len++;
    }
  }
  return len + 1;
};

// Three test cases
console.log(shortestSequence([4,2,1,2,3,3,2,4,1], 4)) // 3
console.log(shortestSequence([1,1,2,2], 2)) // 2
console.log(shortestSequence([1,1,3,2,2,2,3,3], 4)) // 1