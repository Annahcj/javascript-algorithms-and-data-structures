// 1152. Analyze User Website Visit Pattern
// You are given two string arrays username and website and an integer array timestamp. All the given arrays are of the same length and the tuple [username[i], website[i], timestamp[i]] indicates that the user username[i] visited the website website[i] at time timestamp[i].
// A pattern is a list of three websites (not necessarily distinct).
// For example, ["home", "away", "love"], ["leetcode", "love", "leetcode"], and ["luffy", "luffy", "luffy"] are all patterns.
// The score of a pattern is the number of users that visited all the websites in the pattern in the same order they appeared in the pattern.
// For example, if the pattern is ["home", "away", "love"], the score is the number of users x such that x visited "home" then visited "away" and visited "love" after that.
// Similarly, if the pattern is ["leetcode", "love", "leetcode"], the score is the number of users x such that x visited "leetcode" then visited "love" and visited "leetcode" one more time after that.
// Also, if the pattern is ["luffy", "luffy", "luffy"], the score is the number of users x such that x visited "luffy" three different times at different timestamps.
// Return the pattern with the largest score. If there is more than one pattern with the same largest score, return the lexicographically smallest such pattern.


// Solution: Hashmap w/ Set & Sorting

// 1. Group by users -> user: [[timestamp, website]]
// 2. Sort groups by timestamp 
// 3. Generate triplets & count frequencies of triplets -> use hashset to make sure we are only adding unique triplets for each user
// 4. Return lexographically smallest triplet with highest user visit count.

// Time Complexity: O(n^3 * log(n)) 104ms
// Space Complexity: O(n^3) 46MB
var mostVisitedPattern = function(username, timestamp, website) {
  let tuples = {};
  let n = username.length;
  for (var i = 0; i < n; i++) {
    if (!tuples[username[i]]) tuples[username[i]] = [];
    tuples[username[i]].push([timestamp[i], website[i]]);
  }
  let freq = {}, maxFreq = 0;
  for (var user in tuples) {
    tuples[user].sort((a, b) => a[0] - b[0]);
    triplets(tuples[user]);
  }

  let res;
  for (var key in freq) {
    if (freq[key] === maxFreq && (!res || key < res)) res = key;
  }
  return res.split(",");

  function triplets(arr) {
    let patterns = new Set();
    let n = arr.length;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        for (var h = j + 1; h < n; h++) {
          let key = `${arr[i][1]},${arr[j][1]},${arr[h][1]}`;
          if (!patterns.has(key)) freq[key] = (freq[key] || 0) + 1;
          patterns.add(key);
          maxFreq = Math.max(maxFreq, freq[key]);
        }
      }
    }
  }
};

// Two test cases to run function on
console.log(mostVisitedPattern(["joe","joe","joe","james","james","james","james","mary","mary","mary"], [1,2,3,4,5,6,7,8,9,10], ["home","about","career","home","cart","maps","home","home","about","career"])) // ["home","about","career"]
console.log(mostVisitedPattern(["ua","ua","ua","ub","ub","ub"], [1,2,3,4,5,6], ["a","b","a","a","b","c"])) // ["a","b","a"]