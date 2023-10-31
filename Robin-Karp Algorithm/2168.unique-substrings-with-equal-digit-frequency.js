// 2168. Unique Substrings With Equal Digit Frequency
// Given a digit string s, return the number of unique substrings of s where every digit appears the same number of times.


// Solution: Robin Karp - Rolling Hash

// Generate a hash for each substring and store each unique hash in a set.
// Note: Although this code currently passes all test cases, collisions may occur and cause a wrong answer.

// Time Complexity: O(nm) 198ms
// Space Complexity: O(nm) 43.7MB
var equalDigitFrequency = function(s) {
  let n = s.length, unique = new Set();
  let pow = 26, mod = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    let count = Array(10).fill(0), hash = 0;
    for (let j = i; j < n; j++) {
      let digit = Number(s[j]);
      count[digit]++;
      hash = (hash * pow + digit + 1) % mod;
      if (isValid(count)) {
        unique.add(hash);
      }
    }
  }
  return unique.size;
  
  function isValid(count) {
    let freq = -1;
    for (let i = 0; i < 10; i++) {
      if (count[i] === 0) continue;
      if (freq !== -1 && count[i] !== freq) return false;
      freq = count[i];
    }
    return true;
  }
};

// Two test cases
console.log(equalDigitFrequency("1212")) // 5
console.log(equalDigitFrequency("12321")) // 9