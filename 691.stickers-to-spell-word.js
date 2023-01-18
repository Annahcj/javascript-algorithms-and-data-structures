// 691. Stickers to Spell Word
// We are given n different types of stickers. Each sticker has a lowercase English word on it.
// You would like to spell out the given string target by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.
// Return the minimum number of stickers that you need to spell out target. If the task is impossible, return -1.
// Note: In all test cases, all words were chosen randomly from the 1000 most common US English words, and target was chosen as a concatenation of two random words.


// Solution: DP w/ Bitmasks

// Since target.length <= 15, we can use a bitmask to keep track of which characters we have taken in target.

// Memoize each dp(mask), mask = bitmask of characters we have taken in target.
// For each dp(mask), 
  // Try to take each sticker and eliminate characters in the mask.
  // Return the minimum number of stickers taken out of all possibilities.

// Optimization: First filter out stickers with no overlapping characters in target.

// n = length of target, m = number of stickers, k = max(stickers[i].length)
// Time Complexity: O(2^n * m * k * n) 1029ms
// Space Complexity: O(2^n) 45.5MB
var minStickers = function(stickers, target) {
  let n = target.length, fullMask = (1 << n) - 1;
  stickers = stickers.filter(hasOverlappingChars); // filter out stickers with no overlapping characters in target
  let memo = Array(1 << n).fill(-1);
  let res = dp(0);
  return res === Infinity ? -1 : res;
  
  function dp(mask) {
    if (mask === fullMask) return 0;
    if (memo[mask] !== -1) return memo[mask];
    
    let ans = Infinity;
    for (let sticker of stickers) {
      let newMask = takeSticker(sticker, mask);
      if (newMask === mask) continue; // there are no characters gained from this sticker
      ans = Math.min(ans, 1 + dp(newMask));
    }
    return memo[mask] = ans;
  }  
  
  function takeSticker(sticker, mask) { // take characters in target that appear in the sticker
    let newMask = mask;
    for (let char of sticker) {
      for (let i = 0; i < n; i++) {
        if (char !== target[i]) continue;
        let bitIsUsed = (newMask >> i) & 1;
        if (!bitIsUsed) {
          newMask |= (1 << i);
          break;
        }
      }
    }
    return newMask;
  }

  function hasOverlappingChars(sticker) {
    for (let char of sticker) {
      if (target.includes(char)) return true;
    }
    return false;
  }
};

// Two test cases
console.log(minStickers(["with","example","science"], "thehat")) // 3
console.log(minStickers(["notice","possible"], "basicbasic")) // -1