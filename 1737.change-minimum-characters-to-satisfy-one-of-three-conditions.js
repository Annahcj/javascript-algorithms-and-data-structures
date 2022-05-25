// 1737. Change Minimum Characters to Satisfy One of Three Conditions
// You are given two strings a and b that consist of lowercase letters. In one operation, you can change any character in a or b to any lowercase letter.
// Your goal is to satisfy one of the following three conditions:
  // Every letter in a is strictly less than every letter in b in the alphabet.
  // Every letter in b is strictly less than every letter in a in the alphabet.
  // Both a and b consist of only one distinct letter.
// Return the minimum number of operations needed to achieve your goal.


// Solution: Count Frequency & Prefix Sum

// 1. 
  // Count the frequency of each character in a -> freqA.
  // Count the frequency of each character in b -> freqB.
// 2. Loop from 0 to 25 (letters a - y), 
  // condition 1: make all characters in "a" smaller than or equal to i, and all characters in "b" larger than i.
  // condition 2: make all characters in "b" smaller than or equal to i, and all characters in "a" larger than i.
  // condition 3: make all characters in "a" and "b" equal to i.
  // record the minimum number of moves out of all the conditions.

// left = number of characters in "a" smaller than or equal to i
// right = number of characters in "b" smaller than or equal to i
// aLessThanB = a.length - left + right 
  // a.length - left = numbers of changes to make all characters in "a" smaller than or equal to i
  // right = number of letters that need to be changed to make all characters in "b" larger than i
// bLessThanA is the same as aLessThanB, but with "a" and "b" swapped.

// m = a.length, n = b.length
// Time Complexity: O(m + n) 119ms
// Space Complexity: O(1) 47.1MB
var minCharacters = function(a, b) {
  let freqA = Array(26).fill(0), freqB = Array(26).fill(0);
  for (let char of a) freqA[char.charCodeAt() - 97]++;
  for (let char of b) freqB[char.charCodeAt() - 97]++;
  
  let left = 0, right = 0, ans = a.length + b.length - freqA[25] - freqB[25]; // change all letters to z
  for (let i = 0; i < 25; i++) { // up to z, not including
    left += freqA[i];
    right += freqB[i];
    
    let aLessThanB = a.length - left + right; 
    let bLessThanA = b.length - right + left;
    let changeToSame = a.length + b.length - freqA[i] - freqB[i];
    ans = Math.min(ans, aLessThanB, bLessThanA, changeToSame);
  }
  return ans;
};

// Two test cases to run function on
console.log(minCharacters("aba", "caa")) // 2
console.log(minCharacters("dabadd", "cda")) // 3