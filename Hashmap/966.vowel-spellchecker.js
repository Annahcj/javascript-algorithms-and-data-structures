// 966. Vowel Spellchecker
// Given a wordlist, we want to implement a spellchecker that converts a query word into a correct word.
// For a given query word, the spell checker handles two categories of spelling mistakes:
  // Capitalization: If the query matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the case in the wordlist.
    // Example: wordlist = ["yellow"], query = "YellOw": correct = "yellow"
    // Example: wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
    // Example: wordlist = ["yellow"], query = "yellow": correct = "yellow"
  // Vowel Errors: If after replacing the vowels ('a', 'e', 'i', 'o', 'u') of the query word with any vowel individually, it matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the match in the wordlist.
    // Example: wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
    // Example: wordlist = ["YellOw"], query = "yeellow": correct = "" (no match)
    // Example: wordlist = ["YellOw"], query = "yllw": correct = "" (no match)
// In addition, the spell checker operates under the following precedence rules:
  // When the query exactly matches a word in the wordlist (case-sensitive), you should return the same word back.
  // When the query matches a word up to capitlization, you should return the first such match in the wordlist.
  // When the query matches a word up to vowel errors, you should return the first such match in the wordlist.
  // If the query has no matches in the wordlist, you should return the empty string.
// Given some queries, return a list of words answer, where answer[i] is the correct word for query = queries[i].


// Solution: Preprocessing

// Preprocess the words in wordlist into a hashset and two hashmaps:
  // exactMatches = hashset of the words in wordlist
  // caseInsensitive = hashmap of the first occurance of each word in lowercase
  // vowels = hashmap of the first occurance of each word after mapping all vowels to * (e.g: 'YellOw' => 'y*ll*w')

// n = number of words, m = number of queries, k = maximum word length
// Time Complexity: O(nk + mk) 119ms
// Space Complexity: O(nk) 53.1MB 
var spellchecker = function(wordlist, queries) {
  let exactMatches = new Set(wordlist);
  let caseInsensitive = new Map();
  let vowels = new Map();
  for (let word of wordlist) {
    let lowercase = word.toLowerCase();
    let replaceVowels = lowercase.replaceAll(/a|e|i|o|u/gi, '*');
    if (!caseInsensitive.has(lowercase)) caseInsensitive.set(lowercase, word);
    if (!vowels.has(replaceVowels)) vowels.set(replaceVowels, word);
  }
  
  let ans = [];
  for (let query of queries) {
    let lowercase = query.toLowerCase();
    let replaceVowels = lowercase.replaceAll(/a|e|i|o|u/gi, '*');
    if (exactMatches.has(query)) {
      ans.push(query);
    } else if (caseInsensitive.has(lowercase)) {
      ans.push(caseInsensitive.get(lowercase));
    } else if (vowels.has(replaceVowels)) {
      ans.push(vowels.get(replaceVowels));
    } else {
      ans.push('');
    }
  }
  return ans;
};

// Two test cases
console.log(spellchecker(["KiTe","kite","hare","Hare"], ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"])) // ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
console.log(spellchecker(["yellow"], ["YellOw"])) // ["yellow"]