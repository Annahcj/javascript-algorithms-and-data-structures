// 3223. Minimum Length of String After Operations
// You are given a string s.
// You can perform the following process on s any number of times:
  // Choose an index i in the string such that there is at least one character to the left of index i that is equal to s[i], and at least one character to the right that is also equal to s[i].
  // Delete the closest character to the left of index i that is equal to s[i].
  // Delete the closest character to the right of index i that is equal to s[i].
// Return the minimum length of the final string s that you can achieve.


// Solution: Counting w/ Hashmap

// Keep track of the occurances of each character and remove two every time the count of occurances reaches 3.
// Count the number of deleted characters and return the count of remaining characters.

// Time Complexity: O(n) 275ms
// Space Complexity: O(n) 60.2MB
function minimumLength(s) {
  let countMap = {}, deleted = 0;
  for (let char of s) {
    countMap[char] = (countMap[char] || 0) + 1;
    if (countMap[char] === 3) {
      countMap[char] = 1;
      deleted += 2;
    }
  }
  return s.length - deleted;
};

// Two test cases
console.log(minimumLength("abaacbcbb")) // 5
console.log(minimumLength("aa")) // 2