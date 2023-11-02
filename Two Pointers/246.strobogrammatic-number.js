// 246. Strobogrammatic Number
// Given a string num which represents an integer, return true if num is a strobogrammatic number.
// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).


// Solution: Two Pointers & Hashmap

// Flippable numbers:
  // 0, 1, 8 with themselves.
  // 6 with 9.
  // 9 with 6.
// Use a hashmap to keep the pairs.
// Use two pointers to check each pair.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 38.6MB
var isStrobogrammatic = function(num) {
  let allowed = {
    '0': '0',
    '1': '1',
    '8': '8',
    '6': '9',
    '9': '6',
  };
  let start = 0, end = num.length - 1;
  while (start <= end) {
    if (!allowed[num[start]]) return false;
    if (num[end] !== allowed[num[start]]) return false;
    start++, end--;
  }
  return true;
};

// Three test cases to run function on
console.log(isStrobogrammatic("69")) // true
console.log(isStrobogrammatic("88")) // true
console.log(isStrobogrammatic("962")) // false