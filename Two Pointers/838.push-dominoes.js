// 838. Push Dominoes
// There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.
// After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.
// When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.
// For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.
// You are given a string dominoes representing the initial state where:
  // dominoes[i] = 'L', if the ith domino has been pushed to the left,
  // dominoes[i] = 'R', if the ith domino has been pushed to the right, and
  // dominoes[i] = '.', if the ith domino has not been pushed.
// Return a string representing the final state.


// Solution: Two Pointers

// Use two pointers to find the index of the first 'L' or 'R' to the left and right of each '.'
  // If there are no 'L' or 'R' on the left or right, put -Infinity and Infinity respectively.

// Then, for every '.', there are four different cases to account for:
  // #1: No 'L' or 'R' on either side. Stay as '.'
  // #2: No force affecting on either side -> leftside has no 'R' and rightside has no 'L'. Stay as '.'
  // #3: One side has 'L' or 'R' closer than the other side. Follow the closer value.
  // #4: Distances on both sides are equal
    // If they are both pointing in the same direction, follow that direction.
    // Otherwise, stay as '.'.

// Time Complexity: O(n) 169ms
// Space Complexity: O(n) 71.7MB
var pushDominoes = function(dominoes) {
  let n = dominoes.length, left = Array(n), right = Array(n);
  for (let j = 0, i = -Infinity; j < n; j++) {
    if (dominoes[j] === 'L' || dominoes[j] === 'R') i = j;
    else left[j] = i;
  }
  for (let j = n - 1, i = Infinity; j >= 0; j--) {
    if (dominoes[j] === 'L' || dominoes[j] === 'R') i = j;
    else right[j] = i;
  }
  
  let res = Array(n);
  for (let i = 0; i < n; i++) {
    if (dominoes[i] === '.') {
      res[i] = getDirection(i);
    } else res[i] = dominoes[i];
  }
  return res.join("");
  
  function getDirection(index) {
    let leftIndex = left[index], rightIndex = right[index];
    let leftDist = index - leftIndex, rightDist = rightIndex - index;
    if (dominoes[leftIndex] === '.' && dominoes[rightIndex] === Infinity) return '.';
    if (dominoes[leftIndex] !== 'R' && dominoes[rightIndex] !== 'L') return '.'; // unaffected
    if (leftDist < rightDist || rightDist < leftDist) return leftDist < rightDist ? dominoes[leftIndex] : dominoes[rightIndex]; // follow closest
    return dominoes[leftIndex] === dominoes[rightIndex] ? dominoes[leftIndex] : '.'; // equal distance on both sides
  }
};

// Two test cases to run function on
console.log(pushDominoes("RR.L")) // "RR.L"
console.log(pushDominoes(".L.R...LR..L..")) // "LL.RR.LLRRLL.."