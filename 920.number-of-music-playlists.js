// 920. Number of Music Playlists
// Your music player contains n different songs. You want to listen to goal songs (not necessarily different) during your trip. To avoid boredom, you will create a playlist so that:
  // Every song is played at least once.
  // A song can only be played again only if k other songs have been played.
// Given n, goal, and k, return the number of possible playlists that you can create. Since the answer can be very large, return it modulo 109 + 7.


// Solution: DP

// Memoize each dp(songs, songTypesUsed), where dp(songs, songTypesUsed) = number of playlists with `songs` songs and n - songTypesUsed unused song types remaining.

// For each dp(songs, songTypesUsed), we can either:
  // 1. Use an existing song if songTypesUsed > k: dp(songs + 1, songTypesUsed) * (songTypesUsed - k)
    // We subtract k for the previous k songs that can't be repeated immediately, so there are (songTypesUsed - k) song types that we could use here.
  // 2. Add a new song if songTypesUsed < n: dp(songs + 1, songTypesUsed + 1) * (n - songTypesUsed)
    // There are (n - songTypesUsed) new song types remaining as possible candidates here.

// Time Complexity: O(n * goal) 65ms
// Space Complexity: O(n * goal) 44.2MB
var numMusicPlaylists = function(n, goal, k) {
  let memo = Array(goal).fill(0).map(() => Array(n + 1).fill(-1));
  let MOD = 10 ** 9 + 7;
  return dp(0, 0);
  
  function dp(songs, songTypesUsed) {
    if (songs === goal) return songTypesUsed === n ? 1 : 0;
    if (memo[songs][songTypesUsed] !== -1) return memo[songs][songTypesUsed];
    
    let ways = 0;
    if (songTypesUsed > k) { // play an existing song
      ways = (dp(songs + 1, songTypesUsed) * (songTypesUsed - k)) % MOD;
    }
    if (songTypesUsed < n) { // play new song if there are still new song types remaining
      ways = (ways + dp(songs + 1, songTypesUsed + 1) * (n - songTypesUsed)) % MOD;
    }
    return memo[songs][songTypesUsed] = ways;
  }
};

// Three test cases
console.log(numMusicPlaylists(3, 3, 1)) // 6
console.log(numMusicPlaylists(2, 3, 0)) // 6
console.log(numMusicPlaylists(2, 3, 1)) // 2