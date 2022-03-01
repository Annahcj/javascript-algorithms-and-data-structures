// 881. Boats to Save People
// You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.
// Return the minimum number of boats to carry every given person.


// Solution: Greedy Approach w/ Sorting

// 1. Sort people
// 2. Count the minimum number of boats

// Logic:
  // Pair the heaviest person with the lightest person.
  // If their total weight exceeds the limit, the heaviest person MUST take a boat by themselves.
  // Otherwise, they can share a boat.

// Time Complexity: O(n log(n)) 277ms
// Space Complexity: O(log(n)) (space for sorting) 50.3MB
var numRescueBoats = function(people, limit) {
  people.sort((a, b) => a - b);
  let i = 0, j = people.length - 1;
  let ans = 0;
  while (i <= j) {
    let weight = i === j ? people[i] : people[i] + people[j];
    if (weight > limit) j--;
    else i++, j--;
    ans++;
  }
  return ans;
};

// Three test cases to run function on
console.log(numRescueBoats([1,2], 3)) // 1
console.log(numRescueBoats([3,2,2,1], 3)) // 3
console.log(numRescueBoats([3,5,3,4], 5)) // 4