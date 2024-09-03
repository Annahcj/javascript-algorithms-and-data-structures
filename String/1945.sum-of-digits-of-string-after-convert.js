// 1945. Sum of Digits of String After Convert
// You are given a string s consisting of lowercase English letters, and an integer k.
// First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.
// For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:
  // Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
  // Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
  // Transform #2: 17 ➝ 1 + 7 ➝ 8
// Return the resulting integer after performing the operations described above.


// Solution 1: Simulation w/ Strings

// First convert s into character codes by using charCodeAt - 96.
// For k rounds, convert the number into the sum of its digits, and return the final number.

// Time Complexity: O(nk) 48ms
// Space Complexity: O(n) 50.7MB
var getLucky = function(s, k) {
  let n = s.length, num = '';
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 96;
    num += charcode;
  }
  for (let i = 0; i < k; i++) {
    let sum = 0;
    for (let char of num) {
      sum += Number(char);
    }
    num = sum.toString();
  }
  return Number(num);
};


// Solution 2: Simulation w/ Numbers Only

// First convert s into the sum of it's character codes, since k >= 1.
// We convert it directly into the sum rather than keeping the character codes as that will exceed the maximum integer value.
// The maximum possible sum of s is 1000, since s.length <= 100, and the maximum sum of one character is 19 (10 * 100 = 1000), which is well under the limits of the maximum integer value.
// From there, we perform the digit sum transformation another k - 1 times and return the final value.

// Time Complexity: O(nk) 51ms
// Space Complexity: O(n) 48.8MB
var getLucky = function(s, k) {
  let n = s.length, num = 0;
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 96;
    while (charcode > 0) {
      num += charcode % 10;
      charcode = Math.floor(charcode / 10);
    }
  }
  for (let i = 0; i < k - 1; i++) {
    let sum = 0;
    while (num > 0) {
      sum += (num % 10);
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
};

// Three test cases
console.log(getLucky("iiii", 1)) // 36
console.log(getLucky("leetcode", 2)) // 6
console.log(getLucky("zbax", 2)) // 8