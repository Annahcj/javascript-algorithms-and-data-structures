// 860. Lemonade Change
// At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.
// Note that you do not have any change in hand at first.
// Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.


// Solution: Counting

// Use a hashmap to keep track of the occurances of each note (5, 10, 20).
// When we get 10, check whether there is at least one occurance of 5.
// When we get 20, check whether there is:
  // 1. At least one occurance of 5 and 10. It's optimal to use 10's when we can because they can't be used for any bills other than 20.
  // 2. Otherwise, fallback to taking 3 occurances of 5.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 59.9MB
function lemonadeChange(bills) {
  let count = {};
  for (let bill of bills) {
    if (bill === 10) {
      if (!count[5]) return false;
      count[5]--;
    } else if (bill === 20) {
      if (count[10] >= 1 && count[5] >= 1) {
        count[5]--, count[10]--;
      } else if (count[5] >= 3) {
        count[5] -= 3;
      } else {
        return false;
      }
    }
    count[bill] = (count[bill] || 0) + 1;
  }
  return true;
};

// Two test cases
console.log(lemonadeChange([5,5,5,10,20])) // true
console.log(lemonadeChange([5,5,10,10,20])) // false