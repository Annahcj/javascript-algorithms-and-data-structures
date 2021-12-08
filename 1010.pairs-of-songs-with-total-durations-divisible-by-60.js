// 1010. Pairs of Songs With Total Durations Divisible by 60
// You are given a list of songs where the ith song has a duration of time[i] seconds.
// Return the number of pairs of songs for which their total duration in seconds is divisible by 60. Formally, we want the number of indices i, j such that i < j with (time[i] + time[j]) % 60 == 0.


// Solution: Frequency Map

// e.g: take these pairs 220 and 20.
// 220 % 60 = 40, and 20 % 60 = 20.
// 40 + 20 = 60. See the relation?

// here's another: 115 and 5
// 115 % 60 = 55, 5 % 60 = 5.
// 55 + 5 = 60.

// We need to store the frequency of the times % 60.
// Since they will always be less than 60, we can use an array 'mods' with a length of 60 filled with 0's.

// For each time,
// mod is t % 60
// get the number of songs with a duration of 60 - mod.
// increment the count in mods[mod] (we don't want to count pairs twice or count itself)

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 43.5MB
var numPairsDivisibleBy60 = function(time) {
  let mods = Array(60).fill(0);
  let ans = 0;
  for (var t of time) {
    let mod = t % 60;
    ans += mods[(60 - mod) % 60];
    mods[mod]++;
  } 
  return ans;
};

// Two test cases to run function on
console.log(numPairsDivisibleBy60([30,20,150,100,40])) // 3
console.log(numPairsDivisibleBy60([60,60,60])) // 3