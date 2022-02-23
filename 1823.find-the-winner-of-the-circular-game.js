// 1823. Find the Winner of the Circular Game
// There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.
// The rules of the game are as follows:
  // Start at the 1st friend.
  // Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
  // The last friend you counted leaves the circle and loses the game.
  // If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
  // Else, the last friend in the circle wins the game.
  // Given the number of friends, n, and an integer k, return the winner of the game.


// Solution: Simulation

// create a friends array of length n. fill each friends[i] with i.
// since k <= 500, we can afford to actually take the friend out of the array each time.

// Time Complexity: O(n^2) 124ms
// Space Complexity: O(n) 48.2MB
var findTheWinner = function(n, k) {
  let friends = Array(n);
  for (let i = 0; i < n; i++) friends[i] = i + 1;
  
  let idx = 0;
  for (let i = 0; i < n - 1; i++) {
    let len = friends.length, toRemove = (idx + k - 1) % len; 
    friends = [...friends.slice(0, toRemove), ...friends.slice(toRemove + 1)]; // remove friend 
    idx = toRemove % (len - 1); // toRemove will be the next position after the removal
  }
  return friends[0];
};

// Two test cases to run function on
console.log(findTheWinner(5, 2)) // 3
console.log(findTheWinner(6, 5)) // 1