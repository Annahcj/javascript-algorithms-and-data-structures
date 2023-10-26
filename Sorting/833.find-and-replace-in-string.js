// 833. Find And Replace in String


// Solution: Sort Indices, Build String

// 1. The indices need to be in sorted order, so collect the [indices[i], i] and sort them.
// 2. Build the result string using two pointers.

// n = s.length, m = indices.length
// Time Complexity: O(n) 102ms
// Space Complexity: O(m) 43.3MB
var findReplaceString = function(s, indices, sources, targets) {
  let sorted = [];
  for (let i = 0; i < indices.length; i++) {
    sorted.push([indices[i], i]); // only the index information is needed, use i to reference to sources and targets after sorting.
  }
  sorted.sort((a, b) => a[0] - b[0]); 
  // sorted[i] = [index in s, index in indices/sources/targets]
  
  let res = "", i = 0, j = 0;
  while (i < s.length) {
    if (j < sorted.length && i === sorted[j][0]) { // when a replace index is reached
      let idx = sorted[j][1];
      let source = sources[idx], target = targets[idx];
      if (!isMatch(i, source)) {
        res += s[i++];
      } else {
        res += target; // add the replaced string
        i += source.length; // move i up past the old string
      }
      j++;
    } else {
      res += s[i++];
    }
  }
  return res;
  
  function isMatch(start, source) { // checks whether the source string matches the substring in s
    for (let i = 0; i < source.length; i++) {
      if (s[start + i] !== source[i]) return false;
    }
    return true;
  }
};

// A test case to run function on
console.log(findReplaceString("abcd", [0, 2], ["ab","ec"], ["eee","ffff"])) // "eeecd"