// 451. Sort Characters By Frequency
// Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.
// Return the sorted string. If there are multiple answers, return any of them.


// Solution 1: Hashmap w/ Sorting

// 1. Use a hashmap to store the frequencies of each letter in s.
// 2. take the pairs of [key, frequency] from the hashmap into an array.
// 3. sort the array in descending order by frequency.
// 4. Build up final string from the array (repeat arr[i].key by arr[i].freq times)

// n = number of characters
// Time Complexity: O(n log(n)) 80ms
// Space Complexity: O(n) 41.4MB
var frequencySort = function(s) {
  let freq = {};
  for (var char of s) freq[char] = (freq[char] || 0) + 1;
  let ans = '', arr = [];
  for (var key in freq) {
    arr.push({key, freq: freq[key]});
  }  
  arr.sort((a, b) => b.freq - a.freq);
  for (var i = 0; i < arr.length; i++) {
    ans += arr[i].key.repeat(arr[i].freq);
  }
  return ans;
};

// Solution 2: Bucket Sort w/ Hashmap

// We store an array of characters at each index, hence the name 'bucket' sort  -> the index is the frequency of each character

// 1. Store frequency of each character in s in a hashmap 
// 2. Get the maximum frequency (highest frequency out of all characters)
  // we need this so that we can set the size of our array (bucket sort array)
// 3. loop through each key in freq map,
  // push key (character) into the arr at index of the frequency
// 4. loop through the arr from back to front (pointer = i)
  // loop through each char in arr[i]
    // append char.repeat(i) to ans
// Return ans.

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 43.2MB
var frequencySort = function(s) {
  let freq = {}, maxFreq = 0;
  for (var char of s) freq[char] = (freq[char] || 0) + 1;
  for (var key in freq) maxFreq = Math.max(maxFreq, freq[key]);
  let arr = Array(maxFreq + 1), ans = '';
  for (var key in freq) {
    if (!arr[freq[key]]) arr[freq[key]] = [];
    arr[freq[key]].push(key);
  }
  for (var i = maxFreq; i > 0; i--) {
    for (var char of (arr[i] || [])) ans += char.repeat(i);
  }
  return ans;
};

// Three test cases to run function on
console.log(frequencySort("tree")) // "eert"
console.log(frequencySort("cccaaa")) // "aaaccc"
console.log(frequencySort("Aabb")) // "bbAa"