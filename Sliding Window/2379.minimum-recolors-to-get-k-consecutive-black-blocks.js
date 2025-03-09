// 2379. Minimum Recolors to Get K Consecutive Black Blocks
// You are given a 0-indexed string blocks of length n, where blocks[i] is either 'W' or 'B', representing the color of the ith block. The characters 'W' and 'B' denote the colors white and black, respectively.
// You are also given an integer k, which is the desired number of consecutive black blocks.
// In one operation, you can recolor a white block such that it becomes a black block.
// Return the minimum number of operations needed such that there is at least one occurrence of k consecutive black blocks.


// Solution: Sliding Window

// Maintain a sliding window of size k.
// Count the number of white blocks within the window, and record the minimum white blocks across all windows.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 53MB
function minimumRecolors(blocks, k) {
  let whites = 0, minWhites = k;
  for (let i = 0; i < blocks.length; i++) {
    whites += blocks[i] === 'W' ? 1 : 0;
    if (i >= k) {
      whites -= blocks[i - k] === 'W' ? 1 : 0;
    }
    if (i >= k - 1) {
      minWhites = Math.min(minWhites, whites);
    }
  }
  return minWhites;
};

// Two test cases
console.log(minimumRecolors("WBBWWBBWBW", 7)) // 3
console.log(minimumRecolors("WBWBBBW", 2)) // 0