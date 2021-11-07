// 2062. Count Vowel Substrings of a String
// A substring is a contiguous (non-empty) sequence of characters within a string.
// A vowel substring is a substring that only consists of vowels ('a', 'e', 'i', 'o', and 'u') and has all five vowels present in it.
// Given a string word, return the number of vowel substrings in word.


// Solution: Brute Force

// Since the constraints are light, this problem can be solved with brute force.
// Loop through word (pointer = i)
  // pointer j equals i
  // loop while word[j] is a vowel
    // if substring from i to j contains all 5 vowels, increment answer by one.
    // increment j by one.
// Return answer.

// Time Complexity: O(n^2) 280ms
// Space Complexity: O(1) 45.5MB 
var countVowelSubstrings = function(word) {
  let ans = 0;
  function isVowel(char) {
    if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') return true;
  }
  // use hashset to record existance of each vowel
  function containsVowels(word, start, end) {
    let vowels = new Set();
    for (var i = start; i <= end; i++) {
      vowels.add(word[i]); 
    }
    if (vowels.has('a') && vowels.has('e') && vowels.has('i') && vowels.has('o') && vowels.has('u')) return true;
    return false;
  }
  for (var i = 0; i < word.length; i++) {
    let j = i;
    while (isVowel(word[j])) {
      if (containsVowels(word, i, j)) ans++;
      j++;
    }
  }  
  return ans;
};

// Two test cases to run function on
console.log(countVowelSubstrings("cuaieuouac")) // 7
console.log(countVowelSubstrings("bbaeixoubb")) // 0