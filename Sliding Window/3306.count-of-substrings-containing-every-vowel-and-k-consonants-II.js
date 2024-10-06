// 3306. Count of Substrings Containing Every Vowel and K Consonants II
// You are given a string word and a non-negative integer k.
// Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.


// Solution: Sliding Window

// Maintain a minimum lengthed sliding window with every vowel and k consonants.
// Keep track of:
  // 1. The occurances of each vowel in the window.
  // 2. The number of distinct vowels in the window.
  // 3. The count of consonants in the window.
  // 4. The rightmost index of a consonant to the left of the window.

// If all vowels and exactly k consonants are present in the window, add (left index - rightmost consonant index left of the window) substrings to the answer.

// Time Complexity: O(n) 362ms
// Space Complexity: O(1) 65.2MB
var countOfSubstrings = function(word, k) {
  let n = word.length, vowels = {};
  let distinctVowels = 0, consonants = 0;
  let lastConsonant = -1, substrings = 0;
  for (let j = 0, i = 0; j < n; j++) {
    if (isVowel(word[j])) {
      vowels[word[j]] = (vowels[word[j]] || 0) + 1; 
      if (vowels[word[j]] === 1) distinctVowels++;
    } else {
      consonants++;
    }
    
    while (consonants > k || (distinctVowels === 5 && consonants >= k)) {
      if (isVowel(word[i])) {
        if (vowels[word[i]] === 1) {
          break; // window must have all 5 vowels
        }
        vowels[word[i]]--;
      } else {
        if (consonants === k) break; // window must have exactly k consonants
        lastConsonant = i;
        consonants--;
      }
      i++;
    }
    if (consonants === k && distinctVowels === 5) {
      substrings += (i - lastConsonant);
    }
  }
  return substrings;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

// Three test cases
console.log(countOfSubstrings("aeioqq", 1)) // 0
console.log(countOfSubstrings("aeiou", 0)) // 1
console.log(countOfSubstrings("ieaouqqieaouqq", 1)) // 3