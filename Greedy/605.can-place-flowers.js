// 605. Can Place Flowers
// You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.
// Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.


// Solution: Greedy

// if flowerbed[i] is 1, increment i by 2.
// if flowerbed[i] is 0, 
  // if we are at the end of the flowerbed OR the next plot is empty: add to count, increment i by 2.
  // if next plot is 1: increment i by 3 

// Time Complexity: O(n) 122ms
// Space Complexity: O(1) 40.7MB
var canPlaceFlowers = function(flowerbed, n) {
  let len = flowerbed.length, count = 0;
  let i = 0;
  while (i < len) {
    if (flowerbed[i] === 1) i += 2;
    else {
      if (i === len - 1 || flowerbed[i + 1] === 0) {
        count++;
        i += 2;
      } else i += 3;
    }
  }
  return count >= n;
};

// Two test cases to run function on
console.log(canPlaceFlowers([1,0,0,0,1], 1)) // true
console.log(canPlaceFlowers([1,0,0,0,1], 2)) // false