// 403. Frog Jump
// A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.
// Given a list of stones' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit.
// If the frog's last jump was k units, its next jump must be either k - 1, k, or k + 1 units. The frog can only jump in the forward direction.

 
// Solution: Recursion w/ Memoization and Hashmap

// 1. Add all stones to a set so we can check whether a certain stone exists
// 2. Use recursion and memoization to check whether we can reach the last stone

// Time Complexity: O(n^2) 132ms
// Space Complexity: O(n^2) 51.9MB
var canCross = function(stones) {
  let set = new Set();
  for (var stone of stones) set.add(stone);
  let memo = {}, lastStone = stones[stones.length - 1];
  if (!set.has(1)) return false; // the first jump must be 1, so if 1 doesn't exist, the answer must be false.
  return recurse(1, 1);

  function recurse(stone, k) {
    if (!set.has(stone) || k === 0) return false; // if the stone doesn't exist or k is 0, return false.
    if (memo[`${stone},${k}`] !== undefined) return memo[`${stone},${k}`]; // return if we have been in this situation before
    if (stone === lastStone) return true; // reached the last stone, return true.
    let ans = recurse(stone + k - 1, k - 1) || recurse(stone + k, k) || recurse(stone + k + 1, k + 1); // check k - 1, k, and k + 1.
    memo[`${stone},${k}`] = ans; // save in memo
    return ans;
  }
};

// Two test cases to run function on
console.log(canCross([0,1,3,5,6,8,12,17])) // true
console.log(canCross([0,1,2,3,4,8,9,11])) // false