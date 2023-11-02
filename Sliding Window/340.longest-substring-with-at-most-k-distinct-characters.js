// 340. Longest Substring with At Most K Distinct Characters 
// Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.


// Solution: Sliding Window w/ Hashmap

// Use a hashmap count to record the frequencies of each letter
// Set the left pointer to 0, and the max to 0 (the answer)
// Loop through from 0 to s.length (pointer = right)
  // if count[s[right]] is equal to 0 or null (new character in the substring), decrement k by one
  // increment count of s[right] by one
  // while k is smaller than 0
    // decrement the count of s[left] by one
    // if count of s[left] is equal to 0, increment k by one
    // increment left by one
  // update max if right - left + 1 is bigger than max
// Return max

// Time Complexity: O(n) 84ms
// Space Complexity: O(k) 40.1MB
var lengthOfLongestSubstringKDistinct = function(s, k) {
  let count = {}, left = 0;
  let max = 0;
  for (var right = 0; right < s.length; right++) {
    if (!count[s[right]]) k--;
    count[s[right]] = (count[s[right]] || 0) + 1;
    while (k < 0) {
      count[s[left]]--;
      if (count[s[left]] === 0) k++;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
};

// Two test cases to run function on
console.log(lengthOfLongestSubstringKDistinct("eceba", 2)) // 3
console.log(lengthOfLongestSubstringKDistinct("aa", 1)) // 2