// 1415. The k-th Lexicographical String of All Happy Strings of Length n
// A happy string is a string that:
  // consists only of letters of the set ['a', 'b', 'c'].
  // s[i] != s[i + 1] for all values of i from 1 to s.length - 1 (string is 1-indexed).
// For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings and strings "aa", "baa" and "ababbc" are not happy strings.
// Given two integers n and k, consider a list of all happy strings of length n sorted in lexicographical order.
// Return the kth string of this list or return an empty string if there are less than k happy strings of length n.


// Solution: Math / Combinatorics

// The formula to calculate the number of valid combinations for a given n: 2^(n-1) * 3
// Found this formula by writing out all the combinations and counting valid ones for n = 2, 3, 4.
  // n = 2: total combinations = 9, valid combinations = 6
  // n = 3: total combinations = 27, valid combinations = 12
  // n = 4: total combinations = 81, valid combinations = 24
// For each starting character (a, b, c), there are 2^(n-1) valid strings out of the 3^n / 3 total strings for that starting character.
// Multiply these combinations by 3 to get the total combinations for all three starting characters.

// Go from left-to-right and pick the correct character for each index i by narrowing down k:
  // There are three characters we can take, and for each one the number of strings is 2^(n-1) * 2 (if we pick a character, we have 2^(n-1) * 2 remaining combinations).
  // Using the above formula, we can check if k is in between the range for each character.
  // e.g. n = 5, k = 35. Let's choose the first character:
    // a -> 1 to 16
    // b -> 17 to 32
    // c -> 33 to 48
  // Here, we choose "c" since k is in between 33 and 48.
  // After choosing "c", subtract 17 from k, and k becomes 18.
  // Do the same for the rest of the characters.

// Time Complexity: O(n) 2ms
// Space Complexity: O(1) 54.04MB
function getHappyString(n, k) {
  if (k > 2 ** (n - 1) * 3) return "";
  let happy = "", prev = -1;
  for (let i = 0; i < n; i++) {
    const rem = n - i - 1;
    const validCombinations = 2 ** (rem - 1) * 2;
    let combinations = 0;
    for (let j = 0; j < 3; j++) {
      if (j === prev) continue; // can't be same as previous character
      if (k <= combinations + validCombinations) {
        happy += String.fromCharCode(j + 97);
        prev = j;
        break;
      }
      combinations += validCombinations;
    }
    k -= combinations; // narrow down k
  }
  return happy;
};

// Three test cases
console.log(getHappyString(1, 3)) // "c"
console.log(getHappyString(1, 4)) // ""
console.log(getHappyString(3, 9)) // "cab"