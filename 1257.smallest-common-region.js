// 1257. Smallest Common Region
// You are given some lists of regions where the first region of each list includes all other regions in that list.
// Naturally, if a region x contains another region y then x is bigger than y. Also, by definition, a region x contains itself.
// Given two regions: region1 and region2, return the smallest region that contains both of them.
// If you are given regions r1, r2, and r3 such that r1 includes r3, it is guaranteed there is no r2 such that r2 includes r3.
// It is guaranteed the smallest region exists.


// Solution: Find the First Common Region

// Note: Each region can have at most one parent region.
// The problem boils down to finding the first common region.

// Use a hashmap to keep track of the 'parent' of each region.
// Traverse the path from region1 to the root and record the regions in a hashset.
// Traverse the path from region2 to the root until we come across a region that exists in the hashset.

// n = total number of regions
// Time Complexity: O(n) 98msms
// Space Complexity: O(n) 52.2MB
var findSmallestRegion = function(regions, region1, region2) {
  let parent = {};
  for (let region of regions) {
    for (let i = 1; i < region.length; i++) {
      parent[region[i]] = region[0];
    }
  }
  
  let seen = new Set();
  while (region1) {
    seen.add(region1);
    region1 = parent[region1];
  }
  
  while (region2) {
    if (seen.has(region2)) return region2;
    region2 = parent[region2];
  }
};

// Two test cases to run function on
console.log(findSmallestRegion([["Earth","North America","South America"],["North America","United States","Canada"],["United States","New York","Boston"],["Canada","Ontario","Quebec"],["South America","Brazil"]], "Quebec", "New York")) // "North America"
console.log(findSmallestRegion([["Earth", "North America", "South America"],["North America", "United States", "Canada"],["United States", "New York", "Boston"],["Canada", "Ontario", "Quebec"],["South America", "Brazil"]], "Canada", "South America")) // "Earth"