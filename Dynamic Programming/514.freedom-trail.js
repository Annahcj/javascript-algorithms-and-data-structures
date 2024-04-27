// 514. Freedom Trail
// In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring" and use the dial to spell a specific keyword to open the door.
// Given a string ring that represents the code engraved on the outer ring and another string key that represents the keyword that needs to be spelled, return the minimum number of steps to spell all the characters in the keyword.
// Initially, the first character of the ring is aligned at the "12:00" direction. You should spell all the characters in key one by one by rotating ring clockwise or anticlockwise to make each character of the string key aligned at the "12:00" direction and then by pressing the center button.
// At the stage of rotating the ring to spell the key character key[i]:
  // 1. You can rotate the ring clockwise or anticlockwise by one place, which counts as one step. The final purpose of the rotation is to align one of ring's characters at the "12:00" direction, where this character must equal key[i].
  // 2. If the character key[i] has been aligned at the "12:00" direction, press the center button to spell, which also counts as one step. After the pressing, you could begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.


// Solution 1: DP - Recursion w/ Memoization

// Map the positions of occurances to each character: {g: [0,3,4], d: [1,2], ...}.

// Memoize each dp(ringIndex, keyIndex).
// For each key character, try all positions of that character.
// There are two directions to get to a new position (clockwise or anticlockwise). Since it doesn't matter "how" we get there, take the direction with the minimum number of moves.
// Record and return the minimum number of moves to complete all characters in the key.

// n = length of ring, m = length of key
// Time Complexity: O(n^2 * m) 87ms
// Space Complexity: O(nm) 58MB
var findRotateSteps = function(ring, key) {
  let positionsMap = {};
  for (let i = 0; i < ring.length; i++) {
    let char = ring[i];
    if (!positionsMap[char]) positionsMap[char] = [];
    positionsMap[char].push(i);
  }
  let memo = Array(ring.length).fill(0).map(() => Array(key.length).fill(-1));
  return dp(0, 0);
  
  function dp(ringIndex, keyIndex) {
    if (keyIndex === key.length) return 0;
    if (memo[ringIndex][keyIndex] !== -1) return memo[ringIndex][keyIndex];
    
    let positions = positionsMap[key[keyIndex]];
    let ans = Infinity;
    for (let position of positions) {
      let moves = getMinMoves(ringIndex, position, ring.length);
      ans = Math.min(ans, 1 + moves + dp(position, keyIndex + 1));
    }
    return memo[ringIndex][keyIndex] = ans;
  }
};
  
function getMinMoves(position1, position2, n) {
  if (position2 < position1) {
    return getMinMoves(position2, position1, n);
  }
  return Math.min(n + position1 - position2, position2 - position1);
}


// Solution 2: Bottom-up DP & Space Optimized

// Map the positions of occurances to each character: {g: [0,3,4], d: [1,2], ...}.

// Since we are processing each character one after the other, we only need to store the minimum moves from the previous character.
// For each key character, go through each new position, and go through each valid old position and calculate the minimum number of moves from the old to new positions.

// n = length of ring, m = length of key
// Time Complexity: O(n^2 * m) 83ms
// Space Complexity: O(n) 55.8MB
var findRotateSteps = function(ring, key) {
  let positionsMap = {}, n = ring.length;
  for (let i = 0; i < n; i++) {
    let char = ring[i];
    if (!positionsMap[char]) positionsMap[char] = [];
    positionsMap[char].push(i);
  }
  let prev = Array(n).fill(Infinity);
  prev[0] = 0;
  for (let i = 0; i < key.length; i++) {
    let curr = Array(n).fill(Infinity);
    let positions = positionsMap[key[i]];
    for (let position of positions) {
      for (let j = 0; j < n; j++) {
        if (prev[j] === Infinity) continue;
        let moves = getMinMoves(position, j, n);
        curr[position] = Math.min(curr[position], 1 + moves + prev[j]);
      }
    }
    prev = curr;
  }
  return Math.min(...prev);
};

// Two test cases
console.log(findRotateSteps("godding", "gd")) // 4
console.log(findRotateSteps("godding", "godding")) // 13