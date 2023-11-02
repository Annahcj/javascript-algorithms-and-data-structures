// 846. Hand of Straights
// Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.
// Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.


// Solution: Greedy w/ Sorting & Hashmap

// 1. Count the occurances of each number and store it in a hashmap.
// 2. Sort hand in asc order
// 3. Check whether it is possible to divide the array 
  // If the count of the current number is 0, skip the iteration.
  // Otherwise, check whether we have the k consecutive numbers starting from num.

// Time Complexity: O(n log(n)) 154ms
// Space Complexity: O(n) 49.9MB
var isNStraightHand = function(hand, groupSize) {
  let count = {};
  for (let num of hand) {
    count[num] = (count[num] || 0) + 1;
  }

  hand.sort((a, b) => a - b);

  for (let num of hand) {
    if (!count[num]) continue;
    count[num]--;
    for (let next = num + 1; next < num + groupSize; next++) {
      if (!count[next]) return false;
      count[next]--;
    }
  }
  return true;
};

// Two test cases
console.log(isNStraightHand([1,2,3,6,2,3,4,7,8], 3)) // true
console.log(isNStraightHand([1,2,3,4,5], 4)) // false