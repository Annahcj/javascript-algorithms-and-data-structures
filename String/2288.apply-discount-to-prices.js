// 2288. Apply Discount to Prices
// A sentence is a string of single-space separated words where each word can contain digits, lowercase letters, and the dollar sign '$'. A word represents a price if it is a non-negative real number preceded by a dollar sign.
  // For example, "$100", "$23", and "$6.75" represent prices while "100", "$", and "2$3" do not.
// You are given a string sentence representing a sentence and an integer discount. For each word representing a price, apply a discount of discount% on the price and update the word in the sentence. All updated prices should be represented with exactly two decimal places.
// Return a string representing the modified sentence.
 

// Solution: 

// Split the sentence by spaces.
// Process each word and check whether it is a price.
  // Check if the first character is '$' and the rest of the string is a number.
  // Then, get the discounted price. 

// Time Complexity: O(n) 224ms
// Space Complexity: O(n) 56.8MB
var discountPrices = function(sentence, discount) {
  let words = sentence.split(" "), res = [];
  for (let word of words) {
    let price = word.slice(1), isPrice = !isNaN(price);
    if (isPrice && price.length && word[0] === '$') {
      price = Number(price);
      let discounted = (price * ((100 - discount) / 100)).toFixed(2);
      res.push('$' + discounted);
    } else {
      res.push(word);
    }
  }
  return res.join(" ");
};

// Three test cases
console.log(discountPrices("there are $1 $2 and 5$ candies in the shop", 50)) // "there are $0.50 $1.00 and 5$ candies in the shop"
console.log(discountPrices("1 2 $3 4 $5 $6 7 8$ $9.54 $10$", 100)) // "1 2 $0.00 4 $0.00 $0.00 7 8$ $0.00 $10$"
console.log(discountPrices("ka3caz4837h6ada4 r1 $602", 9)) // "ka3caz4837h6ada4 r1 $547.82"