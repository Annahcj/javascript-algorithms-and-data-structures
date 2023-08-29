// 943. Find the Shortest Superstring
// Given an array of strings words, return the smallest string that contains each string in words as a substring. If there are multiple valid strings of the smallest length, return any of them.
// You may assume that no string in words is a substring of another string in words.


// Solution: Bellman–Held–Karp Algorithm

// Precompute cost, where cost[i][j] = the length of words[j] to append to words[i] (gets shorter the more overlap between the suffix of words[i] and prefix of words[j]).
// Populate each dp[mask][prev], where 
  // mask = bitmask representing which words we have used
  // prev = index of the last word in the sequence
// Populate prev, where prev[mask][i] = the previous node in the sequence with the minimum cost for this state

// 1. Precompute the cost of appending each words[j] to words[i].
// 2. Go through each bitmask from 1 to 2^n.
  // Go through each pair of nodes (i, j), where words[j] comes before words[i].
  // dp[mask][i] = Math.min(dp[mask][i], dp[prevMask][j] + cost[j][i]).
// 3. Get the minimum cost when using all nodes (dp[fullMask][i], for each node i).
// 4. Get the whole sequence of nodes based on the last node with the minimum cost.
// 5. Build the final string based on the sequence of nodes.

// Q: What happens in a case where a word is a substring in a combination of words? e.g: "ABC" + "DEF" and new word is "BCDE".
// A: This will be covered in the case where we combine "ABC" and "BCDE" first, then append "DEF".

// Time Complexity: O(2^n * n^2) 145ms
// Space Complexity: O(2^n * n) 53MB
var shortestSuperstring = function(words) {
  let n = words.length, cost = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cost[i][j] = costToAppend(words[i], words[j]);
    }
  }
  let dp = Array(1 << n).fill(0).map(() => Array(n).fill(Infinity));
  let prev = Array(1 << n).fill(0).map(() => Array(n).fill(-1));
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (mask === (1 << i)) dp[mask][i] = words[i].length; // this is the only node in the sequence, take the whole word since there is no previous node
      if (!maskContains(mask, i)) continue;
      let maskWithoutNode = removeFromMask(mask, i);
      for (let j = 0; j < n; j++) {
        if (i === j || !maskContains(maskWithoutNode, j)) continue;
        if (dp[maskWithoutNode][j] + cost[j][i] < dp[mask][i]) {
          dp[mask][i] = dp[maskWithoutNode][j] + cost[j][i];
          prev[mask][i] = j; 
        }
      }
    }
  }
  // get the minimum cost using all the nodes
  let minCost = Infinity, lastNode = -1, fullMask = (1 << n) - 1;
  for (let i = 0; i < n; i++) {
    if (dp[fullMask][i] < minCost) {
      minCost = dp[fullMask][i];
      lastNode = i;
    }
  }
  // backtrack the whole sequence based on the last node
  let sequence = [lastNode], currMask = fullMask;
  for (let i = 0; i < n - 1; i++) {
    let prevNode = prev[currMask][lastNode];
    sequence.push(prevNode);
    currMask = removeFromMask(currMask, lastNode);
    lastNode = prevNode;
  }
  sequence.reverse();
  // build the final string based on the sequence of nodes
  let res = words[sequence[0]];
  for (let i = 1; i < n; i++) {
    let prevNode = sequence[i - 1];
    let lengthToAppend = cost[prevNode][sequence[i]];
    let strToAppend = words[sequence[i]].slice(words[sequence[i]].length - lengthToAppend);
    res += strToAppend;
  }
  return res;
};
  
function costToAppend(a, b) {
  for (let i = 0; i < a.length; i++) {
    let suffixA = a.slice(i), prefixB = b.slice(0, a.length - i);
    if (suffixA === prefixB) {
      let overlap = a.length - i;
      return b.length - overlap;
    }
  }
  return b.length;
}

function removeFromMask(mask, i) {
  return mask ^ (1 << i);
}
  
function maskContains(mask, i) {
  return (mask >> i) & 1;
}

// Three test cases
console.log(shortestSuperstring(["alex","loves","leetcode"])) // "leetcodelovesalex"
console.log(shortestSuperstring(["catg","ctaagt","gcta","ttca","atgcatc"])) // "gctaagttcatgcatc"
console.log(shortestSuperstring(["abc","def","bcde"])) // "abcdef"