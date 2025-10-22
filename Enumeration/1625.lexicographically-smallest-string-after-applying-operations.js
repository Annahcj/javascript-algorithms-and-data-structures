// 1625. Lexicographically Smallest String After Applying Operations
// You are given a string s of even length consisting of digits from 0 to 9, and two integers a and b.
// You can apply either of the following two operations any number of times and in any order on s:
  // Add a to all odd indices of s (0-indexed). Digits post 9 are cycled back to 0. For example, if s = "3456" and a = 5, s becomes "3951".
  // Rotate s to the right by b positions. For example, if s = "3456" and b = 1, s becomes "6345".
// Return the lexicographically smallest string you can obtain by applying the above operations any number of times on s.
// A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b. For example, "0158" is lexicographically smaller than "0190" because the first position they differ is at the third letter, and '5' comes before '9'.


// Solution:

// Transformations for every possible value.
// Observe that there are no more than 10 iterations:
  // 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> loop
  // 0 -> 2 -> 4 -> 6 -> 8 -> 0 -> loop
  // 0 -> 3 -> 6 -> 9 -> 2 -> 5 -> 8 -> loop
  // 0 -> 4 -> 8 -> 2 -> 6 -> 0 -> loop
  // 0 -> 5 -> 0 -> loop
  // 0 -> 6 -> 2 -> 8 -> 4 -> loop
  // 0 -> 7 -> 4 -> 1 -> 8 -> 5 -> 2 -> 9 -> 6 -> 3 -> loop
  // 0 -> 8 -> 6 -> 4 -> 2 -> 0 -> loop
  // 0 -> 9 -> 8 -> 7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> loop

// Rotating the string to the right by b positions switches the numbers at odd indices if b is odd.
// If b is odd, that means we can perform the other operation on both sets of indices (the originallly odd, as well as the originally even indices).
// Try every combination of adding a to odd and even indices if b is odd.
// Then, for each combination, try every combination of rotations (becomes a loop after we see the elements in the same positions again).

// Time Complexity: O(1000n) 67ms
// Space Complexity: O(n) 66MB
function findLexSmallestString(s, a, b) {
  const n = s.length;
  const temp = s.split("").map((num, i) => ([Number(num), i]));
  let smallest = s;
  while (true) {
    for (let i = 1; i < n; i += 2) { // O(n * 10 + 100n)
      temp[i][0] = (temp[i][0] + a) % 10;
    }
    if (b % 2 === 1) {
      while (true) {
        while (true) {
          temp.push(...temp.splice(0, b));
          if (isSmaller(temp, smallest)) {
            smallest = temp.map(([num]) => num).join("");
          }
          if (temp[0][1] === 0) break; // loop
        }
        for (let j = 0; j < n; j += 2) {
          temp[j][0] = (temp[j][0] + a) % 10;
        }
        if (temp[0][0] == s[0]) break; // loop
      }
    } else {
      // combination of rotations to make the smallest string
      while (true) {
        temp.push(...temp.splice(0, b));
        if (isSmaller(temp, smallest)) {
          smallest = temp.map(([num]) => num).join("");
        }
        if (temp[0][1] === 0) break; // loop
      }
    }
    if (temp[1][0] == s[1]) break; // loop
  }
  return smallest;
};

function isSmaller(arr, smallest) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] < smallest[i]) return true;
    if (arr[i][0] > smallest[i]) return false;
  }
  return false;
}

// Three test cases
console.log(findLexSmallestString("5525", 9, 2)) // "2050"
console.log(findLexSmallestString("74", 5, 1)) // "24"
console.log(findLexSmallestString("0011", 4, 2)) // "0011"