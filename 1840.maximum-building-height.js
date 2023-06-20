// 1840. Maximum Building Height
// You want to build n new buildings in a city. The new buildings will be built in a line and are labeled from 1 to n.
// However, there are city restrictions on the heights of the new buildings:
  // The height of each building must be a non-negative integer.
  // The height of the first building must be 0.
  // The height difference between any two adjacent buildings cannot exceed 1.
// Additionally, there are city restrictions on the maximum height of specific buildings. These restrictions are given as a 2D integer array restrictions where restrictions[i] = [idi, maxHeighti] indicates that building idi must have a height less than or equal to maxHeighti.
// It is guaranteed that each building will appear at most once in restrictions, and building 1 will not be in restrictions.
// Return the maximum possible height of the tallest building.


// Solution: Math Logic

// First, go through the restrictions in two passes: left-to-right and right-to-left and keep track of the minimum possible max height from both sides in each restriction.
// The reason we can't just go from left-to-right is that buildings on the right may have a smaller maxHeight than it is possible going from the left.
// Therefore, we need to go in both directions and take the smaller height.

// For each pair of restrictions, calculate the max peak height using the difference between the building max heights and the distance.
  // 1. If one side is higher than the other, make the heights equal: we simulate extending the side with greater height to be equal to the lower height (e.g: 2,_,_,_,4 -> 2,_,_,_,_,_,2)
  // 2. Then, based on the new distance (height diff + distance between buildings), find the peak: min height + Math.floor(new distance / 2)

// m = restrictions.length
// Time Complexity: O(m log(m)) 356ms
// Space Complexity: O(m) 90.1MB
var maxBuilding = function(n, restrictions) {
  restrictions.sort((a, b) => a[0] - b[0]);
  restrictions.unshift([1, 0]);
  let restrictionsLeft = [[1, 0]];
  for (let i = 1; i < restrictions.length; i++) {
    let dist = restrictions[i][0] - restrictionsLeft[i - 1][0];
    restrictionsLeft.push([restrictions[i][0], Math.min(restrictionsLeft[i - 1][1] + dist, restrictions[i][1])]);
  }
  restrictions[restrictions.length - 1][1] = Math.min(restrictions[restrictions.length - 1][1], restrictionsLeft[restrictions.length - 1][1]);
  for (let i = restrictions.length - 2; i >= 0; i--) {
    let dist = restrictions[i + 1][0] - restrictions[i][0];
    restrictions[i][1] = Math.min(restrictions[i + 1][1] + dist, restrictions[i][1], restrictionsLeft[i][1]);
  }
  if (restrictions[restrictions.length - 1][0] < n) {
    let dist = n - restrictions[restrictions.length - 1][0];
    restrictions.push([n, restrictions[restrictions.length - 1][1] + dist]);
  }
  
  let ans = 0;
  for (let i = 1; i < restrictions.length; i++) {
    let [position, maxHeight] = restrictions[i];
    let [prevPosition, prevMaxHeight] = restrictions[i - 1];
    let dist = position - prevPosition;
    
    let minHeight = Math.min(prevMaxHeight, maxHeight);
    let newDist = (Math.max(prevMaxHeight, maxHeight) - minHeight) + dist;
    let peakHeight = minHeight + Math.floor(newDist / 2);
    ans = Math.max(ans, peakHeight);
  }
  return ans;
};

// Three test cases
console.log(maxBuilding(5, [[2,1],[4,1]])) // 2
console.log(maxBuilding(6, [])) // 5
console.log(maxBuilding(10, [[5,3],[2,5],[7,4],[10,3]])) // 5