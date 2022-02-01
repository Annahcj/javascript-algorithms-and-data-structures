// 1044. Longest Duplicate Substring
// Given a string s, consider all duplicated substrings: (contiguous) substrings of s that occur 2 or more times. The occurrences may overlap.
// Return any duplicated substring that has the longest possible length. If s does not have a duplicated substring, the answer is "".


// Solution: Binary Search & Robin-Karp Algorithm

// Why binary search works: 
  // If a repeated substring of length k is found, that means there are repeated substrings of length k - 1 to 1.
  // Equally, if no repeated substring of length k is found, that means there are no repeated substrings of length k or greater.

// Robin-Karp Rolling Hash Algorithm:
  // The Robin-Karp Algorithm runs in O(n) time, and is basically like a sliding window hash function.
  // Choosing the right base and modulo is important, since it can change the probablity of a collision.
  // Since there is always a chance of a collision, one must compare the strings letter to letter for certainty.
  // Instead of storing the entire strings, just store the starting index for each string corresponding to its hash.

// Why + mod in [hash = (hash - lastCode * powerK % mod + mod) % mod]: The hash value may go into negative, so we add mod.

// Time Complexity: O(n log(n)) 940ms
// Space Complexity: O(n) 133.7MB
var longestDupSubstring = function(s) {
  // binary search for longest possible length where (containsDup returns true)
  let low = 0, high = s.length - 1;
  let ans = "";
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    let dup = containsDup(mid);
    if (dup) {
      low = mid;
      ans = dup;
    } else high = mid - 1;
  }
  return ans;
  
  function containsDup(k) {
    let unique = new Map(), mod = 10 ** 9 + 7;
    let powerK = 1, hash = 0;
    for (var i = 0; i < k; i++) {
      powerK = (powerK * 26) % mod; // build up powerK and mod incrementally so it doesn't go past mod
    }
    for (i = 0; i < s.length; i++) {
      let charCode = s.charCodeAt(i) - 96;
      hash = (hash * 26 + charCode) % mod; // add ith char to hash
      if (i >= k) {
        let lastCode = s.charCodeAt(i - k) - 96;
        hash = (hash - lastCode * powerK % mod + mod) % mod; // shift off i - kth char
      }
      if (i >= k - 1) { // if string has length k or more, we can check for duplicates and add the hash to the set.
        if (unique.has(hash)) {
          let str = s.slice(i - k + 1, i + 1);
          if (containsStr(unique.get(hash), str)) return str;
        } else unique.set(hash, []);
          unique.get(hash).push(i - k + 1);
      }
    }
    return false;
  }

  function containsStr(arr, str) { // check whether the array contains the string
    let k = str.length;
    for (var i of arr) {
      let substr = s.slice(i, i + k);
      if (substr === str) return true;
    }
    return false;
  }
};

// Two test cases to run function on
console.log(longestDupSubstring("zxcvdqkfawuytt")) // t
console.log(longestDupSubstring("banana")) // ana