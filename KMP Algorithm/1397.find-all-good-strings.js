// 1397. Find All Good Strings
// Given the strings s1 and s2 of size n and the string evil, return the number of good strings.
// A good string has size n, it is alphabetically greater than or equal to s1, it is alphabetically smaller than or equal to s2, and it does not contain the string evil as a substring. Since the answer can be a huge number, return this modulo 10^9 + 7.


// Solution: Digit DP & KMP

// Use digit DP to find the total number of strings in between s1 and s2 that do not contain the evil substring.
// Use KMP to check if the current string contains the evil substring.
// Keep track of:
  // i = current length of the string
  // largerThanS1 = boolean indicating if the string is larger than, or equal to s1.
  // smallerThanS2 = boolean indicating if the string is smaller than, or equal to s2.
  // evilIndex = the index of the current match with the evil substring.
// For every dp(i, largerThanS1, smallerThanS2, evilIndex),
  // Try to append every character as the next character and update the states and evil index.
  // If the next character does not match the next evil character, rollback the evil index based on the LPS array until next char === evil[evilIndex].

// State machine:
  // e.g. s1 = "aaa", s2 = "dda", i = 1
  // 1. largerThanS1 = true, smallerThanS2 = true, e.g. "b"
    // If largerThanS1 is true and smallerThanS2 is true, return (largerThanS1 = true, smallerThanS2 = true), 
    // because the earliest characters have already determined that it is in-between s1 and s2, nothing appended will change that.
  // 2. largerThanS1 = true, smallerThanS2 = false, e.g. "d"
    // If char > s2[i], return (-1, -1) impossible.
    // If char === s2[i], return (largerThanS1 = true, smallerThanS2 = false).
    // If char < s2[i], return (largerThanS1 = true, smallerThanS2 = true).
  // 3. largerThanS1 = false, smallerThanS2 = true, e.g. "a"
    // If char > s1[i], return (largerThanS1 = true, smallerThanS2 = true).
    // If char === s1[i], (largerThanS1 = false, smallerThanS2 = true).
    // If char < s1[i], return (-1, -1) impossible.
  // e.g. s1 = "aaa", s2 = "ada", i = 1
  // 4. largerThanS1 = false, smallerThanS2 = false, e.g. "a"
    // If char < s1[i], return (-1, -1) impossible.
    // If char > s2[i], return (-1, -1) impossible.
    // return (largerThanS1 = char > s1[i], smallerThanS2 = char < s2[i]).

// m = length of evil
// Time Complexity: O(nm * 26) 95ms
// Space Complexity: O(nm) 68.2MB
function findGoodStrings(n, s1, s2, evil) {
  const memo = Array(n).fill(0).map(() => Array(2).fill(0).map(() => Array(2).fill(0).map(() => Array(evil.length).fill(-1))));
  const MOD = 1000000007, evilLPS = getLPS(evil);
  return dp(0, 0, 0, 0);

  function dp(i, largerThanS1, smallerThanS2, evilIndex) {
    if (evilIndex === evil.length) return 0;
    if (i === n) return 1;
    if (memo[i][largerThanS1][smallerThanS2][evilIndex] !== -1) return memo[i][largerThanS1][smallerThanS2][evilIndex];
    
    let count = 0;
    for (let j = 0; j < 26; j++) {
      const char = String.fromCharCode(97 + j);
      const [nextLargerThanS1, nextSmallerThanS2] = getNextState(i, char, largerThanS1, smallerThanS2);
      if (nextLargerThanS1 === -1) continue;
      let nextEvilIndex = evilIndex;
      while (nextEvilIndex > 0 && char !== evil[nextEvilIndex]) {
        nextEvilIndex = evilLPS[nextEvilIndex - 1];
      }
      count = (count + dp(i + 1, nextLargerThanS1, nextSmallerThanS2, char === evil[nextEvilIndex] ? nextEvilIndex + 1 : nextEvilIndex)) % MOD;
    }
    return memo[i][largerThanS1][smallerThanS2][evilIndex] = count;
  }

  function getNextState(i, newChar, largerThanS1, smallerThanS2) {
    if (largerThanS1 && smallerThanS2) {
      return [1, 1];
    }
    if (largerThanS1 && !smallerThanS2) {
      if (newChar > s2[i]) return [-1, -1];
      if (newChar === s2[i]) return [1, 0];
      return [1, 1];
    }
    if (!largerThanS1 && smallerThanS2) {
      if (newChar < s1[i]) return [-1, -1];
      if (newChar === s1[i]) return [0, 1];
      return [1, 1];
    }
    if (newChar < s1[i] || newChar > s2[i]) return [-1, -1];
    return [newChar > s1[i] ? 1 : 0, newChar < s2[i] ? 1 : 0];
  }
};

function getLPS(str) {
  let n = str.length, lps = Array(n).fill(0);
  let i = 0, j = 1;
  while (j < n) {
    if (str[i] === str[j]) {
      lps[j++] = ++i;
    } else if (i > 0) {
      i = lps[i - 1];
    } else j++;
  }
  return lps;
}

// Two test cases
console.log(findGoodStrings(2, "aa", "da", "b")) // 51
console.log(findGoodStrings(8, "leetcode", "leetgoes", "leet")) // 0