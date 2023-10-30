// 1583. Count Unhappy Friends
// You are given a list of preferences for n friends, where n is always even.
// For each person i, preferences[i] contains a list of friends sorted in the order of preference. In other words, a friend earlier in the list is more preferred than a friend later in the list. Friends in each list are denoted by integers from 0 to n-1.
// All the friends are divided into pairs. The pairings are given in a list pairs, where pairs[i] = [x[i], y[i]] denotes x[i] is paired with y[i] and y[i] is paired with x[i].
// However, this pairing may cause some of the friends to be unhappy. A friend x is unhappy if x is paired with y and there exists a friend u who is paired with v but:
  // x prefers u over y, and
  // u prefers x over v.
// Return the number of unhappy friends.


// Solution: Hashmap 

// For each preferences[i], map each person to it's preference index.
// This is so that we can have quick lookup for a friend's preference index in each preference array.
// Additionally we also map each person to their pair in an array for quick lookup.

// For each [x, y] in pairs,
  // For x, 
    // Go through each friend "u" in preferences[i][x] that comes before friend y.
    // Check whether friend x exists before friend v in preferences[i][u] for the pair (u, v).
  // Repeat the same check for y.

// m = total number of preferences, n = number of people
// Time Complexity: O(mn) 128ms
// Space Complexity: O(mn) 66.6MB
var unhappyFriends = function(n, preferences, pairs) {
  let preferenceMap = Array(n).fill(0).map(() => new Map());
  for (let i = 0; i < n; i++) {
    for (let index = 0; index < preferences[i].length; index++) {
      let friend = preferences[i][index];
      preferenceMap[i].set(friend, index);
    }
  }
  let pairsMap = Array(n).fill(0);
  for (let [x, y] of pairs) {
    pairsMap[x] = y;
    pairsMap[y] = x;
  }
  
  let unhappy = 0;
  for (let [x, y] of pairs) {
    if (isUnhappy(x, y)) unhappy++;
    if (isUnhappy(y, x)) unhappy++;
  }
  return unhappy;
  
  function isUnhappy(x, y) {
    for (let i = 0; i < preferences[x].length; i++) {
      let u = preferences[x][i];
      if (u === y) break;
      let vIndex = preferenceMap[u].get(pairsMap[u]);
      let xIndex = preferenceMap[u].get(x) ?? Infinity;
      if (vIndex > xIndex) return true;
    }
    return false;
  }
};

// Three test cases
console.log(unhappyFriends(4, [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], [[0, 1], [2, 3]])) // 2
console.log(unhappyFriends(2, [[1], [0]], [[1, 0]])) // 0
console.log(unhappyFriends(4, [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], [[1, 3], [0, 2]])) // 4