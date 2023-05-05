// 649. Dota2 Senate
// In the world of Dota2, there are two parties: the Radiant and the Dire.
// The Dota2 senate consists of senators coming from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:
  // Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
  // Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.
// Given a string senate representing each senator's party belonging. The character 'R' and 'D' represent the Radiant party and the Dire party. Then if there are n senators, the size of the given string will be n.
// The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.
// Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be "Radiant" or "Dire".


// Solution: Two Queues

// It is optimal to ban the right of the opposing senator who is closest, since the closer they are, the faster they can take away our rights.
// Use two queues to keep track of the indexes of senates (in asc order) from each party (one for Radiant and one for Dire).
// Take the first indexes from the Radiant queue and the Dire queue. The smaller one can ban the first senate from the opposing party.

// Note: The queue (datastructures-js/queue) in use is in the LeetCode JS environment.

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 46.7MB
var predictPartyVictory = function(senate) {
  let rQueue = new Queue(), dQueue = new Queue(), n = senate.length;
  for (let i = 0; i < n; i++) {
    if (senate[i] === 'R') rQueue.enqueue(i);
    else dQueue.enqueue(i);
  }
  while (!rQueue.isEmpty() && !dQueue.isEmpty()) {
    let rIndex = rQueue.dequeue();
    let dIndex = dQueue.dequeue();
    if (rIndex < dIndex) rQueue.enqueue(rIndex + n);
    else dQueue.enqueue(dIndex + n);
  }
  return rQueue.isEmpty() ? 'Dire' : 'Radiant';
};