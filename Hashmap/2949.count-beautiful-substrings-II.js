// 2949. Count Beautiful Substrings II
// You are given a string s and a positive integer k.

// Let vowels and consonants be the number of vowels and consonants in a string.

// A string is beautiful if:
  // vowels == consonants.
  // (vowels * consonants) % k == 0, in other terms the multiplication of vowels and consonants is divisible by k.
// Return the number of non-empty beautiful substrings in the given string s.
// A substring is a contiguous sequence of characters in a string.
// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
// Consonant letters in English are every letter except vowels.


// Solution 1: Hashmap of Indices

// Maintain a hashmap of ending indices of substrings: {[vowels - consonants]: [index, index, ...], [vowels - consonants]: [index, ...], ...}.
// Keep track of the running count of vowels and consonants.
// When accessing map[vowels - consonants], these are the previous indices which have the same difference, which means the substrings in between have the same amount of vowels and consonants.
// Go through each index in map[vowels - consonants] and check whether the the second condition (vowels * consonants) % k === 0 is met.

// Time Complexity: O(n^2) 2859ms
// Space Complexity: O(n) 50.6MB
var beautifulSubstrings = function(s, k) {
  let n = s.length, map = {};
  let vowels = 0, consonants = 0, ans = 0;
  map[0] = [-1];
  for (let i = 0; i < n; i++) {
    vowels += isVowel(s[i]) ? 1 : 0;
    consonants += isVowel(s[i]) ? 0 : 1;
    let diff = vowels - consonants;
    let indices = map[diff] || [];
    for (let start of indices) {
      let substringLen = i - start, half = substringLen / 2;
      if (((half * half) % k) === 0) {
        ans++;
      }
    }
    indices.push(i);
    map[diff] = indices;
  }
  return ans;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
}


// Solution 2: Nested Hashmaps

// Iterate through s while keeping track of the counts of vowels and consonants so far.
// Maintain a nested hashmap:
  // Level 1: Difference of vowels and consonants (vowels - consonants).
  // Level 2: vowels % k (vowels * consonants % k is equal to (vowels % k) * (consonants % k) % k), because (a × b) % c = (a % c × b % c) % c.

// For each index i, 
  // 1. We only need to check the hashmap for map[vowels - consonants] because that will narrow it down to substrings with an equal amount of vowels and consonants.
  // 2. From there, we need to loop through each entry in map[vowels - consonants] and get the sum of map[vowels - consonants][prevVowels] where (vowels - prevVowels) * (vowels - prevVowels) % k === 0 (the number of consonants is the same as the number of vowels at this stage).

// n = length of s
// Time Complexity: O(nk) 1714ms
// Space Complexity: O(n) 97.4MB
var beautifulSubstrings = function(s, k) {
  let n = s.length, vowels = 0, consonants = 0;
  let map = {}, ans = 0;
  map[0] = {0: 1}; 
  for (let i = 0; i < n; i++) {
    vowels += isVowel(s[i]) ? 1 : 0;
    consonants += isVowel(s[i]) ? 0 : 1;
    let diff = vowels - consonants;
    let count = map[diff] ?? {};
    for (let prevVowels in count) {
      let substringVowels = vowels - prevVowels;
      if ((substringVowels * substringVowels) % k === 0) {
        ans += count[prevVowels];
      }
    }
    if (!map[diff]) map[diff] = {};
    map[diff][vowels % k] = (map[diff][vowels % k] || 0) + 1;
  }
  return ans;
};

// Three test cases
console.log(beautifulSubstrings("baeyh", 2)) // 2
console.log(beautifulSubstrings("abba", 1)) // 3
console.log(beautifulSubstrings("bcdf", 1)) // 0