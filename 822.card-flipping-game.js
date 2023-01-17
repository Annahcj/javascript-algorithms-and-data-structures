// 822. Card Flipping Game
// You are given two 0-indexed integer arrays fronts and backs of length n, where the ith card has the positive integer fronts[i] printed on the front and backs[i] printed on the back. Initially, each card is placed on a table such that the front number is facing up and the other is facing down. You may flip over any number of cards (possibly zero).
// After flipping the cards, an integer is considered good if it is facing down on some card and not facing up on any card.
// Return the minimum possible good integer after flipping the cards. If there are no good integers, return 0.


// Solution: Hashset

// Find the smallest integer where fronts[i] !== backs[i].
// Use a hashset to keep track of all bad integers.
// Then, go through all integers again and record the minimum integer that is not present in the bad hashset.

// n = length of fronts, k = number of unique integers
// Time Complexity: O(n) 77ms
// Space Complexity: O(k) 44.3MB
var flipgame = function(fronts, backs) {
  let bad = new Set(), n = fronts.length;
  for (let i = 0; i < n; i++) {
    if (fronts[i] === backs[i]) {
      bad.add(fronts[i]);
    }
  }
  let min = Infinity;
  for (let i = 0; i < n; i++) {
    if (!bad.has(fronts[i])) min = Math.min(min, fronts[i]);
    if (!bad.has(backs[i])) min = Math.min(min, backs[i]);
  }
  return min === Infinity ? 0 : min;
};

// Two test cases
console.log(flipgame([1,2,4,4,7], [1,3,4,1,3])) // 2
console.log(flipgame([1], [1])) // 0