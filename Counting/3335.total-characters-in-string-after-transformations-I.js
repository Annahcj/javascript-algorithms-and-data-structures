// 3335. Total Characters in String After Transformations I
// You are given a string s and an integer t, representing the number of transformations to perform. In one transformation, every character in s is replaced according to the following rules:
  // If the character is 'z', replace it with the string "ab".
  // Otherwise, replace it with the next character in the alphabet. For example, 'a' is replaced with 'b', 'b' is replaced with 'c', and so on.
// Return the length of the resulting string after exactly t transformations.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Counting

// Count the occurances of every character in s.
// For t rounds, update the count of occurances based on each transformation.
  // count[a] += prevCount[z]
  // count[b] += prevCount[z]
  // count[char] += prevCount[char - 1], where char is b to z

// n = length of s
// Time Complexity: O(n + 26t) 335ms
// Space Complexity: O(1) 57.9MB
function lengthAfterTransformations(s, t) {
  let n = s.length, count = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  const MOD = 1000000007;
  for (let i = 0; i < t; i++) {
    const A = 0, B = 1, Z = 25;
    let newCount = Array(26).fill(0);
    newCount[A] = count[Z];
    newCount[B] = count[Z];
    for (let j = 1; j <= 25; j++) {
      newCount[j] = (newCount[j] + count[j - 1]) % MOD;
    }
    count = newCount;
  }
  return count.reduce((sum, c) => (sum + c) % MOD, 0);
};

// Two test cases
console.log(lengthAfterTransformations("abcyy", 2)) // 7
console.log(lengthAfterTransformations("azbk", 1)) // 5