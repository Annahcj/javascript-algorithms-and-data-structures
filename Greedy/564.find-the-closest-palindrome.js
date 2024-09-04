// 564. Find the Closest Palindrome
// Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.
// The closest is defined as the absolute difference minimized between two integers.


// Solution: Greedy

// A couple of thoughts:
  // 1. A palindrome means the first half reflects the second half.
  // 2. Digits on the left create the most difference so it's optimal to only change the digits in the middle of the integer.
  // 3. To ensure the smallest difference, we only need to try increasing or decreasing the middle digit(s) by at most 1. Any more than that is unnecessary since it just needs to be different from the original number.
    // We may not need to change the middle digit(s) if the first half is not symmetric to the second half in the original number. 
  // 4. Again, since left digits are more significant, change the second half to match the first half. In this case we may not need to change the middle digit(s).

// Edge cases:
  // 1. If n has one digit, just subtract one.
  // 2. 10000 -> 9999. The closest larger number is 10001, so we go with the smaller one.
  // 3. 10001 -> 9999. The closest larger number is 10101, so we go with 9999 as it's closer.
  // 4. 9999 -> 10001. The closest smaller number is 9889, so increasing by 2 will always be closer.

// m = length of n
// Time Complexity: O(m) 60ms
// Space Complexity: O(m) 51.6MB
var nearestPalindromic = function(n) {
  let digitCount = Array(10).fill(0);
  for (let digit of n) {
    digitCount[Number(digit)]++;
  }
  if (n.length === 1) { // 3 -> 2
    return (n - 1).toString();
  }
  if (n[0] === '1' && digitCount[0] === n.length - 1) { // 10000 -> 9999
    return '9'.repeat(n.length - 1);
  }
  if (n[0] === '1' && n[n.length - 1] === '1' && digitCount[0] === n.length - 2) { // 10001 -> 9999
    return '9'.repeat(n.length - 1);
  }
  if (digitCount[9] === n.length) { // 9999 -> 10001
    return '1' + '0'.repeat(n.length - 1) + '1';
  }
  
  let midIndex = Math.floor((n.length - 1) / 2); // this index marks the end of the first half
  let firstHalf = n.slice(0, midIndex + 1);
  let decrementHalf = (BigInt(firstHalf) - 1n).toString();
  let decrement = decrementHalf + decrementHalf.slice(0, n.length % 2 === 0 ? midIndex + 1 : midIndex).split("").reverse().join("");
  let incrementHalf = (BigInt(firstHalf) + 1n).toString()
  let increment = incrementHalf + incrementHalf.slice(0, n.length % 2 === 0 ? midIndex + 1 : midIndex).split("").reverse().join("");
  let same = firstHalf + firstHalf.slice(0, n.length % 2 === 0 ? midIndex + 1 : midIndex).split("").reverse().join("");

  let candidates = [
    [decrement, getAbsDiff(decrement, n)],
    [increment, getAbsDiff(increment, n)],
    [same, getAbsDiff(same, n)],
  ];
  candidates.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]);
  for (let [palindrome, diff] of candidates) {
    if (diff === 0) continue;
    return palindrome;
  }
};

function getAbsDiff(str1, str2) {
  let diff = BigInt(str1) - BigInt(str2);
  return diff < 0n ? Number(-diff) : Number(diff);
}

// Two test cases
console.log(nearestPalindromic("123")) // "121"
console.log(nearestPalindromic("1")) // "0"