// 2048. Next Greater Numerically Balanced Number
// An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.
// Given an integer n, return the smallest numerically balanced number strictly greater than n.


// Solution: Check All Numbers

// Loop through all numbers from n + 1 until we get a numerically balanced number.

// Runtime on LeetCode: 2740ms
// Memory Usage on LeetCode: 45MB
var nextBeautifulNumber = function(n) {
  let i = n + 1;
  while (true) {
    if (isBalanced(i)) return i;
    i++;
  }
  function isBalanced(num) {
    let freq = {};
    while (num > 0) {
      let digit = num % 10;
      num = Math.floor(num / 10);
      freq[digit] = (freq[digit] || 0) + 1;
    }
    for (var n in freq) {
      if (+n !== freq[n]) return false;
    }
    return true;
  }  
};

// Three test cases to run function on
console.log(nextBeautifulNumber(1)) // 22
console.log(nextBeautifulNumber(1000)) // 1333
console.log(nextBeautifulNumber(3000)) // 3133