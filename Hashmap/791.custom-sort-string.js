// 791. Custom Sort String
// order and str are strings composed of lowercase letters. In order, no letter occurs more than once.
// order was sorted in some custom order previously. We want to permute the characters of str so that they match the order that order was sorted. More specifically, if x occurs before y in order, then x should occur before y in the returned string.
// Return any permutation of str (as a string) that satisfies this property.


// Solution: Map Order and Count Occurances

// Traverse order and map each letter into 'map'
// Traverse str and add occurance of each character in 'map', if it's not in map, then add to unsorted string.
// Loop through each key in map (since they will be in the order it was put in), and add each char the number of times it occurs in str to ans.
// Return ans (sorted string) + rest (unsorting string).

// Time Complexity: O(order.length + str.length) 64ms
// Space Complexity: O(order.length) 39.3MB
var customSortString = function(order, str) {
  let map = {}, rest = '', ans = '';
  for (var i = 0; i < order.length; i++) map[order[i]] = 1;
  for (var j = 0; j < str.length; j++) {
    if (map[str[j]]) map[str[j]]++;
    else rest += str[j];
  }
  for (var char in map) {
    ans += char.repeat(map[char] - 1);
  }
  return ans + rest;
};

// Three test cases 
console.log(customSortString("cba", "abcd")) // "cbad"
console.log(customSortString("acb", "ccaabb")) // "aaccbb"
console.log(customSortString("zyxwvutsrqponmlkjihgfedcba", "abcdefghijklmnopqrstuvwxyz")) // "zyxwvutsrqponmlkjihgfedcba"