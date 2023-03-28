// 2591. Distribute Money to Maximum Children
// You are given an integer money denoting the amount of money (in dollars) that you have and another integer children denoting the number of children that you must distribute the money to.
// You have to distribute the money according to the following rules:
  // All money must be distributed.
  // Everyone must receive at least 1 dollar.
  // Nobody receives 4 dollars.
// Return the maximum number of children who may receive exactly 8 dollars if you distribute the money according to the aforementioned rules. If there is no way to distribute the money, return -1.


// Solution: Math Logic

// When money < children, there is no way to distribute the money since each child must receive at least 1 dollar.

// First give each child 1 dollar.
// Then, count how many children can have another 7 dollars.
// Try to distribute 7 more dollars to as many children as possible, up to n - 1 children.
// Edge case 1: If the leftover amount is 3 dollars after distributing batches of 7 dollars to n - 1 children, then we have to take one less child so that the one remaining child does not receive 4 dollars.
// Edge case 2: If the leftover amount is 7 dollars, then we can have one more child receive 7 dollars.

// Time Complexity: O(1) 144ms
// Space Complexity: O(1) 46.7MB
var distMoney = function(money, children) {
  if (money < children) return -1;
  let toDistribute = money - children;
  let childrenWith8Dollars = Math.min(Math.floor(toDistribute / 7), children - 1);
  let leftover = toDistribute - childrenWith8Dollars * 7;
  if (leftover === 3 && childrenWith8Dollars === children - 1 && childrenWith8Dollars > 0) childrenWith8Dollars--;
  else if (leftover === 7) childrenWith8Dollars++;
  return childrenWith8Dollars;
};

// Two test cases
console.log(distMoney(20, 3)) // 1
console.log(distMoney(16, 2)) // 2