// 3044. Most Frequent Prime
// You are given a m x n 0-indexed 2D matrix mat. From every cell, you can create numbers in the following way:
  // There could be at most 8 paths from the cells namely: east, south-east, south, south-west, west, north-west, north, and north-east.
  // Select a path from them and append digits in this path to the number being formed by traveling in this direction.
  // Note that numbers are generated at every step, for example, if the digits along the path are 1, 9, 1, then there will be three numbers generated along the way: 1, 19, 191.
// Return the most frequent prime number greater than 10 out of all the numbers created by traversing the matrix or -1 if no such prime number exists. If there are multiple prime numbers with the highest frequency, then return the largest among them.
// Note: It is invalid to change the direction during the move.


// Solution: Hashmap & Prime Numbers

// For each cell in the matrix, 
  // Go through each of the 8 directions and keep going in one direction until we go out of bounds.
  // Build up the number and check whether it's a prime number.
  // Add to the count of prime numbers in a hashmap.

// At the end, go through the counts in the hashmap and return the number with the maximum count.

// m = number of rows, n = number of columns, k = number created from the matrix
// Time Complexity: O(8mn * max(m, n) * sqrt(k)) 110ms
// Space Complexity: O(8mn * max(m, n)) 57.5MB
var mostFrequentPrime = function(mat) {
  let m = mat.length, n = mat[0].length;
  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  let count = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let [x, y] of directions) {
        let row = i, col = j;
        let num = mat[row][col];
        while (true) {
          row += x, col += y;
          if (row < 0 || row >= m || col < 0 || col >= n) break;
          num = num * 10 + mat[row][col];
          if (num > 10 && isPrime(num)) {
            count[num] = (count[num] || 0) + 1;
          } 
        }
      }
    }
  }
  let maxCount = 0, ans = -1;
  for (let prime in count) {
    let freq = count[prime];
    if (freq > maxCount) {
      maxCount = freq;
      ans = Number(prime);
    } else if (freq === maxCount) {
      ans = Math.max(ans, Number(prime)); 
    }
  }
  return ans;
};

function isPrime(num) {
  let sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Three test cases
console.log(mostFrequentPrime([[1,1],[9,9],[1,1]])) // 19
console.log(mostFrequentPrime([[7]])) // -1
console.log(mostFrequentPrime([[9,7,8],[4,6,5],[2,8,6]])) // 97