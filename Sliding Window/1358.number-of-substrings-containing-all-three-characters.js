// 1358. Number of Substrings Containing All Three Characters
// Given a string s consisting only of characters a, b and c.
// Return the number of substrings containing at least one occurrence of all these characters a, b and c.


// Solution: Sliding Window

// Create an array count to keep the frequency of each character, initially set it to [0, 0, 0]
// Set left pointer to 0, and ans to 0.
// Loop through from 0 to s.length (pointer = right)
  // increment the count for s[right] by one
  // while the count of a, b, and c are all bigger than 0
    // decrement the count of s[left] by one
    // increment left by one
// Increment ans by left

// Logic:
// For e.g: [a,a,a,b,c,a]
// at idx 4, we would have count = {a: 3, b: 1, c: 1}, ans = 0
// now we have at least one of each character in between pointers left and right.
// we need to see how many combinations of these we can make ->
// increment left and decrease count of s[left] until we are missing one letter

// since the indexes are 0-based, we can add left to ans.
// left will now be 3, pointing at b. [a,a,a,_b_,c,a]
// now, we can increment ans by left.

// at idx 5 (a), count = {a: 1, b: 1: c: 1}, ans = 3
// since we have at least one of each character, increment left and decrease count of s[left] until we are missing one letter
// left will now be 4, pointing at c. [a,a,a,b,_c_,a]
// now, we can increment ans by left again.
// (incrementing ans by left works because we know that we can have 'left' new substrings that will contain at least one of each character)
// (even if left hasn't moved forward at all, we know that we now have 'left' more new substrings of length 1 to right + 1)

// we have reached the end of the array and our answer is 7. 

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 41.3MB
var numberOfSubstrings = function(s) {
  let ans = 0, left = 0, count = [0, 0, 0];
  for (let right = 0; right < s.length; right++) {
    count[s.charCodeAt(right) - 97]++;
    while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
      count[s.charCodeAt(left) - 97]--;
      left++;
    }
    ans += left;
  }  
  return ans;
};

// Three test cases
console.log(numberOfSubstrings("aaabca")) // 10
console.log(numberOfSubstrings("abcabc")) // 10
console.log(numberOfSubstrings("aaacb")) // 3
console.log(numberOfSubstrings("abc")) // 1