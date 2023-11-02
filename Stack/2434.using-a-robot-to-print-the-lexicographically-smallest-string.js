// 2434. Using a Robot to Print the Lexicographically Smallest String
// You are given a string s and a robot that currently holds an empty string t. Apply one of the following operations until s and t are both empty:
  // Remove the first character of a string s and give it to the robot. The robot will append this character to the string t.
  // Remove the last character of a string t and give it to the robot. The robot will write this character on paper.
// Return the lexicographically smallest string that can be written on the paper.


// Solution: Counting & Stack

// Maintain a stack to simulate the string t.
// For each operation, take the smallest character out of the two options:
  // 1. An upcoming smaller character in s
  // 2. The top of the stack

// To keep track of the smallest character in s, 
  // Keep a count of occurances for each character (a-z).
  // Decrease the count as we take characters from s.
  // Update the current minimum character (move up while count[char] === 0)

// When we take the minimum character in s, keep moving numbers from s to the stack until we reach the minimum character.

// Time Complexity: O(n) 181ms
// Space Complexity: O(n) 61.6MB
var robotWithString = function(s) {
  let n = s.length, count = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  let res = "", stack = [];
  let i = 0, minCharcode = 0;
  while (i < n || stack.length) {
    while (minCharcode < 26 && count[minCharcode] === 0) {
      minCharcode++; // update the minimum charcode
    }
    while (i < n && (!stack.length || stack[stack.length - 1] > minCharcode)) { // move characters from s to the stack until we reach the minimum character
      let charcode = s.charCodeAt(i) - 97;
      i++;
      stack.push(charcode);
      count[charcode]--;
    }
    res += String.fromCharCode(stack.pop() + 97);
  }
  return res;
};

// Three test cases
console.log(robotWithString("zza")) // "azz"
console.log(robotWithString("bac")) // "abc"
console.log(robotWithString("bdda")) // "addb"