// 1128. Number of Equivalent Domino Pairs
// Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.
// Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].


// Solution: Hashmap

// Go through dominoes from left to right, 
  // Store the running `${dominoes[i][0]},${dominoes[i][1]}` in a hashmap.
  // Count the number of matching `${dominoes[i][0]},${dominoes[i][1]}` or `${dominoes[i][1]},${dominoes[i][0]}` (if dominoes[i][0] !== dominoes[i][1]).

// Time Complexity: O(n) 25ms
// Space Complexity: O(n) 67MB
function numEquivDominoPairs(dominoes) {
  const map = {};
  let pairs = 0;
  for (let domino of dominoes) {
    pairs += (map[`${domino[0]},${domino[1]}`] || 0);
    if (domino[0] !== domino[1]) {
      pairs += (map[`${domino[1]},${domino[0]}`] || 0);
    }
    map[`${domino[0]},${domino[1]}`] = (map[`${domino[0]},${domino[1]}`] || 0) + 1;
  }
  return pairs;
};

// Two test cases
console.log(numEquivDominoPairs([[1,2],[2,1],[3,4],[5,6]])) // 1
console.log(numEquivDominoPairs([[1,2],[1,2],[1,1],[1,2],[2,2]])) // 3