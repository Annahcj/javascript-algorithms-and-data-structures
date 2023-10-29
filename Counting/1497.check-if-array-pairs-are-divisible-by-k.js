// 1497. Check If Array Pairs Are Divisible by k
// Given an array of integers arr of even length n and an integer k.
// We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.
// Return true If you can find a way to do that or false otherwise.


// Solution: Mod & Counter

// Use an array of length k to store the count of numbers: mods[i] = count of numbers whose mod value is equal to i.
// When we find a pair for arr[i], decrease the count for the pair. Otherwise, increase the count of the mod of arr[i].

// Notes: 
  // When a number is negative, add k to it.
  // (k - mod) % k: In the case of when mod is 0, and so k - 0 = k, we need to mod it by k again.

// Time Complexity: O(n) 148ms
// Space Complexity: O(k) 54.8MB
var canArrange = function(arr, k) {
  let n = arr.length, pairs = 0;
  let mods = Array(k).fill(0);
  for (let num of arr) {
    let mod = num % k;
    if (mod < 0) mod += k;
    let pairMod = (k - mod) % k;
    if (mods[pairMod] > 0) {
      mods[pairMod]--;
      pairs++;
    } else mods[mod]++;
  }
  return pairs === n / 2;
};

// Two test cases
console.log(canArrange([1,2,3,4,5,10,6,7,8,9], 5)) // true
console.log(canArrange([-1,1,-2,2,-3,3,-4,4], 3)) // true