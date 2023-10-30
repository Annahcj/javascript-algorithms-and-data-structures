// 2075. Decode the Slanted Ciphertext


// Solution: Simulation 

// Number of columns = encodedText.length / rows.
// Starting from each position i (where i < cols),
  // We can simulate moving diagonally through the grid by: pos += cols + 1
// After we get the final text, trim off any whitespace at the end.

// Time Complexity: O(n) 479ms
// Space Complexity: O(n) 94.8MB
var decodeCiphertext = function(encodedText, rows) {
  let n = encodedText.length, cols = n / rows, res = "";
  for (let i = 0; i < cols; i++) {
    let pos = i;
    while (pos < n) {
      res += encodedText[pos];
      pos += cols + 1;
    }
  }
  return res.trimEnd();
};

// Three test cases
console.log(decodeCiphertext("ch   ie   pr", 3)) // "cipher"
console.log(decodeCiphertext("iveo    eed   l te   olc", 4)) // "i love leetcode"
console.log(decodeCiphertext("coding", 1)) // "coding"