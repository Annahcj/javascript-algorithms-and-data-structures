// 2271. Maximum White Tiles Covered by a Carpet
// You are given a 2D integer array tiles where tiles[i] = [li, ri] represents that every tile j in the range li <= j <= ri is colored white.
// You are also given an integer carpetLen, the length of a single carpet that can be placed anywhere.
// Return the maximum number of white tiles that can be covered by the carpet.


// Solution: Sliding Window

// Maintain a sliding window where the there will be at most one tiles[j] with partial covering.
// Count the number of white tiles covered by the window.
// Since the last tiles[j] can be partially covered, be sure to subtract the extra covering we have counted in the tile with partial covering.

// Time Complexity: O(n log(n)) 294ms
// Space Complexity: O(log(n)) (space for sorting) 68.2MB
var maximumWhiteTiles = function(tiles, carpetLen) {
  tiles.sort((a, b) => a[0] - b[0]);
  let ans = 0, count = 0;
  for (let j = 0, i = 0; j < tiles.length; j++) {
    count += tiles[j][1] - tiles[j][0] + 1;
    while (i < j && tiles[i][0] + carpetLen - 1 < tiles[j][1]) {
      let extraCount = tiles[j][1] - Math.min(tiles[i][0] + carpetLen - 1, tiles[j][1]);
      ans = Math.max(ans, count - extraCount);
      count -= (tiles[i][1] - tiles[i][0] + 1);
      i++;
    }
    let extraCount = tiles[j][1] - Math.min(Math.max(tiles[i][0] + carpetLen - 1, tiles[j][0] - 1), tiles[j][1]);
    ans = Math.max(ans, count - extraCount);
  }
  return ans;
};

// Two test cases
console.log(maximumWhiteTiles([[1,5],[10,11],[12,18],[20,25],[30,32]], 10)) // 9
console.log(maximumWhiteTiles([[10,11],[1,1]], 2)) // 2