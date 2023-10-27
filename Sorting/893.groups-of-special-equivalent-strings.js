// 893. Groups of Special-Equivalent Strings
// You are given an array of strings of the same length words.
// In one move, you can swap any two even indexed characters or any two odd indexed characters of a string words[i].
// Two strings words[i] and words[j] are special-equivalent if after any number of moves, words[i] == words[j].
  // For example, words[i] = "zzxy" and words[j] = "xyzz" are special-equivalent because we may make the moves "zzxy" -> "xzzy" -> "xyzz".
// A group of special-equivalent strings from words is a non-empty subset of words such that:
  // Every pair of strings in the group are special equivalent, and
  // The group is the largest size possible (i.e., there is not a string words[i] not in the group such that words[i] is special-equivalent to every string in the group).
// Return the number of groups of special-equivalent strings from words.


// Solution: Sorting & Set

// Being able to swap any two even or odd-indexed characters means that they can be sorted in any order.
// For each word, sort the even-indexed characters and odd-indexes characters (just append the sorted even-indexed to the odd, since we only care whether they are equivalent)
// Group by the sorted word and count the number of groups.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm) 76ms
// Space Complexity: O(nm) 47.1MB
var numSpecialEquivGroups = function(words) {
  let groups = new Set();
  for (let word of words) {
    let odd = [], even = [];
    for (let i = 0; i < word.length; i++) {
      if (i % 2 === 0) even.push(word[i]);
      else odd.push(word[i]);
    }
    odd.sort(), even.sort();
    groups.add(odd.join("") + even.join(""));
  }
  return groups.size;
};

// Two test cases
console.log(numSpecialEquivGroups(["abcd","cdab","cbad","xyzz","zzxy","zzyx"])) // 3
console.log(numSpecialEquivGroups(["abc","acb","bac","bca","cab","cba"])) // 3