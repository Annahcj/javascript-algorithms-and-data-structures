// 2156. Find Substring With Given Hash Value
// The hash of a 0-indexed string s of length k, given integers p and m, is computed using the following function:
  // hash(s, p, m) = (val(s[0]) * p0 + val(s[1]) * p1 + ... + val(s[k-1]) * pk-1) mod m.
// Where val(s[i]) represents the index of s[i] in the alphabet from val('a') = 1 to val('z') = 26.
// You are given a string s and the integers power, modulo, k, and hashValue. Return sub, the first substring of s of length k such that hash(sub, power, modulo) == hashValue.
// The test cases will be generated such that an answer always exists.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Robin-Karp Algorithm w/ Rolling Hash Function

// BigInt must be used to prevent integer overflow. 

// add a character: hash * power + val
// remove a character: hash - lastVal * powerK

// The hashing formula given is actually a reverse of the usual Robin-Karp hashing formula.
// The usual hashing formula is: (val(s[0]) * p^k-1 + val(s[1]) * p^k-2 + ... + val(s[k-1]) * p^0)
// Hence, we can work right-to-left and use the Robin-Karp algorithm to compute the hashes.

// Time Complexity: O(n) 326ms
// Space Complexity: O(1) 49.4MB
var subStrHash = function(s, power, modulo, k, hashValue) {
  power = BigInt(power), modulo = BigInt(modulo);
  let hash = 0n, powerK = 1n, res = 0, n = s.length;
  for (var i = n - 1; i >= 0; i--) {
    let val = BigInt(s.charCodeAt(i) - 96);
    hash = (hash * power + val) % modulo; // add the ith character to hash
    if (i + k >= n) {
      powerK = (powerK * power) % modulo;
    } else {
      let lastVal = BigInt(s.charCodeAt(i + k) - 96);
      hash = (hash - lastVal * powerK % modulo + modulo) % modulo; // slide off the last character (i + k) from hash
    }
    if (hash == hashValue) res = i;
  }
  return s.slice(res, res + k);
};

// A test case to run function on
console.log(subStrHash("leetcode", 7, 20, 2, 0)) // "ee"