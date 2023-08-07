// 2810. Faulty Keyboard
// Your laptop keyboard is faulty, and whenever you type a character 'i' on it, it reverses the string that you have written. Typing other characters works as expected.
// You are given a 0-indexed string s, and you type each character of s using your faulty keyboard.
// Return the final string that will be present on your laptop screen.


// Solution: Simulation

// Use an array to keep track of the current characters.
// Each time we get "i", reverse the current array of characters.
// At the end, return array converted into a string.

// Time Complexity: O(n^2) 89ms
// Space Complexity: O(n) 47.3MB
var finalString = function(s) {
  let arr = [];
  for (let char of s) {
    if (char === 'i') arr = arr.reverse();
    else arr.push(char);
  }
  return arr.join("");
};

// Two test cases
console.log(finalString("string")) // "rtsng"
console.log(finalString("poiinter")) // "ponter"