// 809. Expressive Words
// Sometimes people repeat letters to represent extra feeling. For example:
// "hello" -> "heeellooo"
// "hi" -> "hiiii"
// In these strings like "heeellooo", we have groups of adjacent letters that are all the same: "h", "eee", "ll", "ooo".

// You are given a string s and an array of query strings words. A query word is stretchy if it can be made to be equal to s by any number of applications of the following extension operation: choose a group consisting of characters c, and add some number of characters c to the group so that the size of the group is three or more.

// For example, starting with "hello", we could do an extension on the group "o" to get "hellooo", but we cannot get "helloo" since the group "oo" has a size less than three. Also, we could do another extension like "ll" -> "lllll" to get "helllllooo". If s = "helllllooo", then the query word "hello" would be stretchy because of these two extension operations: query = "hello" -> "hellooo" -> "helllllooo" = s.
// Return the number of query strings that are stretchy.


// Solution: Use Array to store Character Count

// Loop through s, store character counts in an array 'charArr'.
// e.g: 'aabbaaa' -> [['a', 2], ['b', 2], ['a', 3]]

// Create an 'isStretchy' function which takes in a word and checks whether it is able to be stretched to s.
  // Set two pointers, i to 1 (for word, loop from 1 since we need to compare adjacent chars), and j to 0 (for charArr)
  // Set charCount to 1 (for first char)
  // If first char of word is already not equal to first char of charArr, return false.
  // Otherwise, loop through word from index 1 to end *
    // If word[i] is part of consecutive sequence (same as previous character), increment charCount by one.
    // Else 
      // Increment j by one (we move on to next character group in charArr)
      // If charArr[j] is undefined OR word[i] is not equal to charArr[j][0] (char of new char group) OR charCount is not correct OR word has less chars than s
        // Return false.
      // Reset charCount to 1
    // Increment i by one.
  // *
  // (check for last character group, for e.g: if word is 'aaaa', we will never get to check the answer because the chars are all the same)
  // If charCount is not equal to charArr[j][1]  AND charCount is smaller than 3, OR charCount is bigger than charArr[j][1] (not an extension, but less characters)
    // Return false.
  // Otherwise, return true.

// Loop through each word in words
  // If isStretchy(word) return true, increment count by one.
// Return count.

// n = total characters of every word
// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 40.1MB
  var expressiveWords = function(s, words) {
    let count = 0;
    let charArr = [[s[0], 1]], idx = 0;
    for (var h = 1; h < s.length; h++) {
      if (s[h] !== s[h - 1]) {
        idx++;
        charArr[idx] = [s[h], 0];
      }
      charArr[idx][1]++;
    }
    for (var word of words) {
      count += isStretchy(word) ? 1 : 0;
    }
    return count;  
  
    function isStretchy(word) {
      let i = 1, j = 0;
      let charCount = 1;
      if (word[0] !== charArr[0][0]) return false;
      while (i < word.length) {
        if (word[i] === word[i - 1]) charCount++;
        else {
          j++;
          if (!charArr[j] || word[i] !== charArr[j][0] || (charCount !== charArr[j - 1][1] && charArr[j - 1][1] < 3) || charCount > charArr[j - 1][1]) {
            return false;
          }
          charCount = 1;
        }
        i++;
      }
      if ((charCount !== charArr[j][1] && charArr[j][1] < 3) || charCount > charArr[j][1]) {
        return false;
      }
      if (j < charArr.length - 1) return false;
      return true;
    }
  };
  
  // Five test cases to run function on
  console.log(expressiveWords("heeellooo", ["heeelloooworld"])) // 0
  console.log(expressiveWords("aaabbbaaa", ["a"])) // 0
  console.log(expressiveWords("aaa", ["aaaa"])) // 0
  console.log(expressiveWords("heeellooo", ["hello", "hi", "helo"])) // 1
  console.log(expressiveWords("zzzzzyyyyy", ["zzyy","zy","zyy"])) // 3