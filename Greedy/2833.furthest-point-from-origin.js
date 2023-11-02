// 2833. Furthest Point From Origin
// You are given a string moves of length n consisting only of characters 'L', 'R', and '_'. The string represents your movement on a number line starting from the origin 0.
// In the ith move, you can choose one of the following directions:
  // move to the left if moves[i] = 'L' or moves[i] = '_'
  // move to the right if moves[i] = 'R' or moves[i] = '_'
// Return the distance from the origin of the furthest point you can get to after n moves.


// Solution: Greedy  

// Get the position after using only 'L's and 'R's from moves.
// Count the total number of underscores.
// At the end, use the underscores all in one direction after we have the final position. 
// Return the maximum distance from the origin after making the underscores either all 'L' or all 'R'.

// n = length of moves
// Time Complexity: O(n) 62ms
// Space Complexity: O(1) 44.4MB
var furthestDistanceFromOrigin = function(moves) {
  let underscores = 0, position = 0;
  for (let move of moves) {
    if (move === '_') underscores++;
    else position += move === 'L' ? -1 : 1;
  }
  return Math.abs(position) + underscores;
};

// Three test cases
console.log(furthestDistanceFromOrigin("L_RL__R")) // 3
console.log(furthestDistanceFromOrigin("_R__LL_")) // 5
console.log(furthestDistanceFromOrigin("_______")) // 7