// 3168. Minimum Number of Chairs in a Waiting Room
// You are given a string s. Simulate events at each second i:
  // If s[i] == 'E', a person enters the waiting room and takes one of the chairs in it.
  // If s[i] == 'L', a person leaves the waiting room, freeing up a chair.
// Return the minimum number of chairs needed so that a chair is available for every person who enters the waiting room given that it is initially empty.


// Solution: Counting

// Keep a running count of people needing a chair.
// Record the maximum state of this running count- this is the minimum number of chairs we need.

// Time Complexity: O(n) 64ms
// Space Complexity: O(1) 51.3MB
var minimumChairs = function(s) {
  let chairs = 0, ans = 0;
  for (let char of s) {
    if (char === 'E') {
      chairs++;
    } else {
      chairs--;
    }
    ans = Math.max(ans, chairs);
  }  
  return ans;
};

// Three test cases
console.log(minimumChairs("EEEEEEE")) // 7
console.log(minimumChairs("ELELEEL")) // 2
console.log(minimumChairs("ELEELEELLL")) // 3