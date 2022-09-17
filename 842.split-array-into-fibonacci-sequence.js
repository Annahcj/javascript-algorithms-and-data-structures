// 842. Split Array into Fibonacci Sequence
// You are given a string of digits num, such as "123456579". We can split it into a Fibonacci-like sequence [123, 456, 579].
// Formally, a Fibonacci-like sequence is a list f of non-negative integers such that:
  // 0 <= f[i] < 2^31, (that is, each integer fits in a 32-bit signed integer type),
  // f.length >= 3, and
  // f[i] + f[i + 1] == f[i + 2] for all 0 <= i < f.length - 2.
// Note that when splitting the string into pieces, each piece must not have extra leading zeroes, except if the piece is the number 0 itself.
// Return any Fibonacci-like sequence split from num, or return [] if it cannot be done.


// Solution: Try Each Starting Pair

// Try each pair of the first two numbers in the sequence.
// If a valid sequence exists with a pair of numbers, generate the sequence and return it.
// After that, the following numbers will be predefined (the sum of the previous two numbers).

// Special cases:
  // 1. Leading zeros
  // 2. A number exceeding 2^31

// Time Complexity: O(n^3) 231ms
// Space Complexity: O(n) 51.1MB
var splitIntoFibonacci = function(num) {
  let n = num.length, prevPrev = 0;
  let MAX_NUM = 2 ** 31;
  for (let i = 0; i < n; i++) {
    if (hasLeadingZero(i, prevPrev)) continue; 
    prevPrev = prevPrev * 10 + Number(num[i]);
    let prev = 0;
    for (let j = i + 1; j < n; j++) {
      if (hasLeadingZero(j - i - 1, prev)) continue;
      prev = prev * 10 + Number(num[j]);
      let nextNum = prevPrev + prev;
      if (isValidSequence(j + 1, prev, nextNum)) {
        return getSequence(j + 1, prevPrev, prev);
      }
    }
  }
  return [];
  
  function isValidSequence(start, prevNum, nextNum) {
    let nextNumStr = nextNum.toString(), i = start;
    if (n - start + 1 < nextNumStr.length) return false;
    while (i < n) {
      if (nextNum >= MAX_NUM || !hasNextNum(i, nextNumStr)) {
        return false;
      }
      i += nextNumStr.length;
      let newNextNum = prevNum + nextNum;
      prevNum = nextNum;
      nextNum = newNextNum;
      nextNumStr = nextNum.toString();
    }
    return true;
  }
  
  function hasNextNum(start, nextNumStr) {
    if (n - start + 1 < nextNumStr.length) return false;
    for (let i = 0; i < nextNumStr.length; i++) {
      if (num[start + i] !== nextNumStr[i]) return false;
    }
    return true;
  }

  function hasLeadingZero(start, num) {
    return start > 0 && num === 0;
  }
  
  function getSequence(start, prevPrev, prev) {
    let nextNum = prevPrev + prev, nextNumStr = nextNum.toString();
    let i = start, sequence = [prevPrev, prev];
    while (i < n) {
      sequence.push(nextNum);
      i += nextNumStr.length;
      let newNextNum = prev + nextNum;
      prev = nextNum;
      nextNum = newNextNum;
      nextNumStr = nextNum.toString();
    }
    return sequence;
  }
};

// Two test cases to run function on
console.log(splitIntoFibonacci("1101111")) // [11,0,11,11]
console.log(splitIntoFibonacci("112358130")) // []