// 168. Excel Sheet Column Title
// Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
// For example:
  // A -> 1
  // B -> 2
  // C -> 3
  // ...
  // Z -> 26
  // AA -> 27
  // AB -> 28 
  // ...


// Solution: Math Logic

// columnNumber is constructed in this manner: (((charcode+1) * 26) + (charcode+1) * 26) + (charcode+1)
// To access the last character code, we can use (columnNumber - 1) % 26. 
// To remove the last character code, we can do Math.floor((columnNumber - 1) / 26).
// Process each character from back to front.

// Reasoning for (columnNumber - 1) % 26: When the columnNumber is constructed, it will always be a multiple of 26 apart from the last character code. So (columnNumber - 1) % 26 will extract the last character code out.

// Time Complexity: O(log(n)) 40ms
// Space Complexity: O(log(n)) 41.4MB
var convertToTitle = function(columnNumber) {
  let characters = [];
  while (columnNumber > 0) {
    let charcode = (columnNumber - 1) % 26;
    characters.push(String.fromCharCode(65 + charcode));
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }  
  return characters.reverse().join("");
};

// Three test cases
console.log(convertToTitle(1)) // "A"
console.log(convertToTitle(26)) // "AB"
console.log(convertToTitle(701)) // "ZY"