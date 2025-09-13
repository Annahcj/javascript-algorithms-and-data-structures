// 3541. Find Most Frequent Vowel and Consonant
// You are given a string s consisting of lowercase English letters ('a' to 'z').
// Your task is to:
  // Find the vowel (one of 'a', 'e', 'i', 'o', or 'u') with the maximum frequency.
  // Find the consonant (all other letters excluding vowels) with the maximum frequency.
// Return the sum of the two frequencies.
// Note: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.
// The frequency of a letter x is the number of times it occurs in the string.


// Solution: Counting w/ Hashmap

// Use a hashmap to keep track of the count of each character.
// Store the maximum count of a vowel and consonant and return the sum at the end.

// n = length of s
// Time Complexity: O(n) 7ms
// Space Complexity: O(1) 57MB
function maxFreqSum(s) {
  const count = {};
  let maxVowelFreq = 0, maxConsonantFreq = 0;
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
    if (isVowel(char)) {
      maxVowelFreq = Math.max(maxVowelFreq, count[char]);
    } else {
      maxConsonantFreq = Math.max(maxConsonantFreq, count[char]);
    }
  }
  return maxVowelFreq + maxConsonantFreq;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

// Two test cases
console.log(maxFreqSum("successes")) // 6
console.log(maxFreqSum("aeiaeia")) // 3