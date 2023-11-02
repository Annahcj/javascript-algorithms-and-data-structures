// 128. Longest Consecutive Sequence
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.


// Solution: Use a Set

// First, store all numbers in a set. 
// Keep track of the maxStreak (maximum streak)
// Loop through each num of nums **
// (basically, we check whether number is a start of a consecutive sequence, if it is, then keep checking for num + 1 in the set)
  // If map contains num - 1 (if it does, it means it's not the start of a sequence)
    // Set streak to 1
    // Loop while map contains num + 1  *
      // increment num by one
      // increment streak by one'
    // *
    // Update maxStreak if streak is bigger 
// **
// Return maxStreak.

// Time Complexity: O(n) 436ms
// Space Complexity: O(n) 47.1MB
  var longestConsecutive = function(nums) {
    let map = new Set(nums);
    let maxStreak = 0;
    for (var num of nums) {
      if (!map.has(num - 1)) {
        let streak = 1;
        while (map.has(num + 1)) {
          num++;
          streak++;
        }
        maxStreak = Math.max(maxStreak, streak);
      }
    } 
    return maxStreak; 
  };
  console.log(longestConsecutive([100,4,200,1,3,2])) // 4
  console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])) // 9