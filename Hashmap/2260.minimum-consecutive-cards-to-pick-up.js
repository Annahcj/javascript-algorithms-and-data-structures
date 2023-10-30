// 2260. Minimum Consecutive Cards to Pick Up
// You are given an integer array cards where cards[i] represents the value of the ith card. A pair of cards are matching if the cards have the same value.
// Return the minimum number of consecutive cards you have to pick up to have a pair of matching cards among the picked cards. If it is impossible to have matching cards, return -1.


// Solution: Hashmap

// Use a hashmap to keep track of the last occurance of each card.
// Find the minimum gap between two equal cards by comparing the current index with the last index.

// Time Complexity: O(n) 355ms
// Space Complexity: O(n) 76.3MB
var minimumCardPickup = function(cards) {
  let lastIndex = {}, ans = Infinity;
  for (let i = 0; i < cards.length; i++) {
    if (lastIndex[cards[i]] !== undefined) {
      ans = Math.min(ans, i - lastIndex[cards[i]] + 1);
    }
    lastIndex[cards[i]] = i;
  }
  return ans === Infinity ? -1 : ans;
};

// Two test cases
console.log(minimumCardPickup([3,4,2,3,4,7])) // 4
console.log(minimumCardPickup([1,0,5,3])) // -1