// 244. Shortest Word Distance II
// Design a data structure that will be initialized with a string array, and then it should answer queries of the shortest distance between two different strings from the array.


// Runtime on LeetCode: 96ms
// Memory Usage on LeetCode: 46.5MB

// Solution: Hashmap for Indexes and Two Pointer Approach

// WordDistance: 
// Create a map to store indexes of words
// Loop through each word in wordsDict
  // If map doesn't contain word, set map[word] to an array with index inside
  // Otherwise, push the index of the word into map[word]

// shortest: 
// (use two pointer approach to loop over the two index arrays and find the shortest distance)
// Set minDiff (shortest distance) to Infinity initially.
// Set two pointers, i and j to 0.
// Loop while i is smaller than length of word1's index array AND j is smaller than length of word2's index array
  // Calculate the difference between the two indexes (Math.abs(i1 - i2))
  // If difference is smaller than minDiff, update minDiff to difference.
  // If i1 is smaller than i2, increment i.
  // Otherwise, increment j.
// When loop is finished, return minDiff.

// Time Complexity:
// WordDistance: O(n) (creating map to store indexes of each word in wordsDict)
// shortest: O(n + m) (size of arr of indexes of word1 + size of arr of indexes of word2)

// Space Complexity:
// WordDistance: O(n) (each index of word in wordsDict)
// shortest: O(1)

  var WordDistance = function(wordsDict) {
    this.wordsMap = {};
    for (var i = 0; i < wordsDict.length; i++) {
      let word = wordsDict[i];
      if (!this.wordsMap[word]) {
        this.wordsMap[word] = [i];
      } else {
        this.wordsMap[word].push(i);
      }
    }
  };
  
  WordDistance.prototype.shortest = function(word1, word2) {
    let idxs1 = this.wordsMap[word1], idxs2 = this.wordsMap[word2];
    let i = 0, j = 0;
    let minDiff = Infinity;
    while (i < idxs1.length && j < idxs2.length) {
      let i1 = idxs1[i], i2 = idxs2[j];
      let diff = Math.abs(i1 - i2);
      if (diff < minDiff) minDiff = diff;
      if (i1 < i2) i++;
      else j++;
    }
    return minDiff;
  };
  
  // A few test cases to run function on
  let wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
  console.log(wordDistance.shortest("coding", "practice")); // return 3
  console.log(wordDistance.shortest("makes", "coding"));    // return 1