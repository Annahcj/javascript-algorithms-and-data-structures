// 249. Group Shifted Strings
// We can shift a string by shifting each of its letters to its successive letter.
  // For example, "abc" can be shifted to be "bcd".
// We can keep shifting the string to form a sequence.
  // For example, we can keep shifting "abc" to form the sequence: "abc" -> "bcd" -> ... -> "xyz".
// Given an array of strings strings, group all strings[i] that belong to the same shifting sequence. You may return the answer in any order.


// Solution: Hashmap & Find Difference Between Letters

// Find the differences between each letter in a string:
  // Compare each pair of adjacent letters: 
    // If the prev letter is smaller than the current letter, the difference is currCharCode - prevCharCode.
    // Otherwise, the difference is currCharCode + 26 - prevCharCode: like 'xa' diff is (97 + 26) - 120 = 3.
    // NOTE: this is not the same as prevCharCode - currCharCode: 'xa' = (120, 97) = 120 - 97 = 23. 23 != 3.
    // this is quite important because we are strictly calculating the difference going forward, not backwards.

// The diffKey for 'axy' would be '23,1'.
// Use a hashmap to group each string together by their diffKey.

// n = strings.length, k = length of strings[i]
// Time Complexity: O(nk) 117ms
// Space Complexity: O(nk) 40.6MB
var groupStrings = function(strings) {
  let map = new Map();
  for (var str of strings) {
    let diffKey = getDiffKey(str);
    if (!map.has(diffKey)) map.set(diffKey, []);
    map.get(diffKey).push(str);
  }

  let res = [];
  for (var group of map.values()) {
    res.push(group);
  }
  return res;

  function getDiffKey(str) {
    let res = [];
    for (var i = 1; i < str.length; i++) {
      let prevCC = str.charCodeAt(i - 1), currCC = str.charCodeAt(i);
      let diff = currCC - prevCC;
      if (prevCC > currCC) diff = currCC + 26 - prevCC;
      res.push(diff);
    }
    return res.join(",");
  }   
};

// Two test cases to run function on
console.log(groupStrings(["abc","bcd","acef","xyz","az","ba","a","z"])) // [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]
console.log(groupStrings(["a"])) // [["a"]]