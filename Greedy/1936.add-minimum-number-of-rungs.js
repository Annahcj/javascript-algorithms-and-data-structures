// 1936. Add Minimum Number of Rungs
// Return the minimum number of rungs that must be added to the ladder in order for you to climb to the last rung.


// Solution: Compare Adjacent Values

// Thoughts:
// At any point in rungs, we know that as long as rungs[i] is smaller than or equal to our last position + dist, we can go to rungs[i].
// If rungs[i] is out of reach (rungs[i] > maxRung), calculate the minumum number of rungs we need to bridge in between the rungs[i - 1] and rungs[i].

// Loop through rungs, keeping track of 'maxRung' (previous rung + dist) which will always be the furthest point we can reach from position i.
//   If rungs[i] is less than or equal to maxRung (reachable from previous position), set prev to rungs[i].
//   Else if rungs[i] is bigger than maxRung (not reachable), calculate minumum number of rungs that need to be added in order to 
//   reach rungs[i] from prev. Add the extra rungs to 'rungsAdded' count, set maxRung to rungs[i] + dist, and prev to rungs[i].
//   Keep updating maxRung to be prev + dist.
//   When target is reached, return rungsAdded.
  
// Time Complexity: O(n) 84ms 
// Space Complexity: O(1) 49MB 
var addRungs = function(rungs, dist) {
  let maxRung = dist, prev = 0, target = rungs[rungs.length - 1];
  let rungsAdded = 0;
  for (let i = 0; i < rungs.length; i++) {
    if (rungs[i] <= maxRung) {
      prev = rungs[i];
    } else if (rungs[i] > maxRung) {
      let rungsToAdd = Math.ceil((rungs[i] - prev) / dist) - 1;
      rungsAdded += rungsToAdd;
      maxRung = rungs[i] + dist;
      prev = rungs[i];
    } 
    maxRung = prev + dist;
    if (prev == target) return rungsAdded;
  }
};

// Seven test cases
console.log(addRungs([1,3,5,7,10], 2)) // 1
console.log(addRungs([1,4,5,10], 2)) // 3
console.log(addRungs([1,2,4,5,7,8,12], 2)) // 1
console.log(addRungs([1,3,5,10], 2)) // 2
console.log(addRungs([3,6,8,10], 3)) // 0
console.log(addRungs([3,4,6,7], 2)) // 1
console.log(addRungs([5], 10)) // 0