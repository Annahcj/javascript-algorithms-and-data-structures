// 2836. Maximize Value of Function in a Ball Passing Game
// You are given an integer array receiver of length n and an integer k. n players are playing a ball-passing game.
// You choose the starting player, i. The game proceeds as follows: player i passes the ball to player receiver[i], who then passes it to receiver[receiver[i]], and so on, for k passes in total. The game's score is the sum of the indices of the players who touched the ball, including repetitions, i.e. i + receiver[i] + receiver[receiver[i]] + ... + receiver(k)[i].
// Return the maximum possible score.
// Notes:
  // receiver may contain duplicates.
  // receiver[i] may be equal to i.


// Solution: Binary Lifting

// For every power of 2, map the parent node 2^i levels up.
// Keep track of the total sum in between the current node and each parent node.
  // parent[d][i] = parent of node i, d levels up.
  // sum[d][i] = sum of nodes from i to parent d levels up (not including parent).

// Break down k into powers of 2, use the binary lifting matrix to jump up 2^i levels at a time.

// n = length of receiver
// Time Complexity: O(n log(k)) 336ms
// Space Complexity: O(n log(k)) 201MB
function getMaxFunctionValue(receiver, k) {
  const ones = [];
  k = BigInt(k + 1);
  let i = 0;
  while (k > 0) {
    if (k & 1n) {
      ones.push(i);
    }
    i++;
    k >>= 1n;
  }
  const maxDepth = ones[ones.length - 1];
  const p = Array(maxDepth + 1), sum = Array(maxDepth + 1);
  const n = receiver.length;
  for (let i = 0; i <= maxDepth; i++) {
    p[i] = Array(n);
    sum[i] = Array(n);
  }
  for (let i = 0; i < n; i++) {
    p[0][i] = receiver[i];
    sum[0][i] = i;
  }
  for (let d = 1; d <= maxDepth; d++) {
    for (let i = 0; i < n; i++) {
      const halfParent = p[d - 1][i];
      const parent = p[d - 1][halfParent];
      p[d][i] = parent;
      sum[d][i] = sum[d - 1][i] + sum[d - 1][halfParent];
    }
  }
  let maxScore = 0;
  for (let start = 0; start < n; start++) {
    let node = start, score = 0;
    for (let i of ones) {
      score += sum[i][node];
      node = p[i][node];
    }
    maxScore = Math.max(maxScore, score);
  }
  return maxScore;
};

// Two test cases
console.log(getMaxFunctionValue([2,0,1], 4)) // 6
console.log(getMaxFunctionValue([1,1,1,2,3], 3)) // 10