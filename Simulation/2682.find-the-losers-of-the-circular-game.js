// 2682. Find the Losers of the Circular Game
// There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.
// The rules of the game are as follows:
// 1st friend receives the ball.
  // After that, 1st friend passes it to the friend who is k steps away from them in the clockwise direction.
  // After that, the friend who receives the ball should pass it to the friend who is 2 * k steps away from them in the clockwise direction.
  // After that, the friend who receives the ball should pass it to the friend who is 3 * k steps away from them in the clockwise direction, and so on and so forth.
// In other words, on the ith turn, the friend holding the ball should pass it to the friend who is i * k steps away from them in the clockwise direction.
// The game is finished when some friend receives the ball for the second time.
// The losers of the game are friends who did not receive the ball in the entire game.
// Given the number of friends, n, and an integer k, return the array answer, which contains the losers of the game in the ascending order.


// Solution: Simulation 

// Keep track of friends that we have already visited before in an array of length n.
// Pass the ball until we revisit a friend.
// Return the friends where visited[i] = false.

var circularGameLosers = function(n, k) {
  let visited = Array(n).fill(false), friend = 0, turn = 1;
  visited[0] = true;
  while (true) {
    let next = (friend + (turn * k)) % n;
    if (visited[next]) break;
    visited[next] = true;
    friend = next;
    turn++;
  }
  let losers = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) losers.push(i + 1);
  }
  return losers;
};

// Two test cases
console.log(circularGameLosers(5, 2)) // [4,5]
console.log(circularGameLosers(4, 4)) // [2,3,4]