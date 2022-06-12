// 2303. Calculate Amount Paid in Taxes
// You are given a 0-indexed 2D integer array brackets where brackets[i] = [upperi, percenti] means that the ith tax bracket has an upper bound of upperi and is taxed at a rate of percenti. The brackets are sorted by upper bound (i.e. upperi-1 < upperi for 0 < i < brackets.length).
// Tax is calculated as follows:
  // The first upper0 dollars earned are taxed at a rate of percent0.
  // The next upper1 - upper0 dollars earned are taxed at a rate of percent1.
  // The next upper2 - upper1 dollars earned are taxed at a rate of percent2.
  // And so on.
// You are given an integer income representing the amount of money you earned. Return the amount of money that you have to pay in taxes. Answers within 10^-5 of the actual answer will be accepted.


// Solution: Compare Adjacent

// To avoid dealing with edge cases, add [0,0] to the beginning of brackets.
// Compare each adjacent brackets, taking the tax from the amount of income from the difference of the two adjacent upper bounds.

// Time Complexity: O(n) 102ms
// Space Complexity: O(1) 44.9MB
var calculateTax = function(brackets, income) {
  brackets.unshift([0, 0]);
  let ans = 0;
  for (let i = 1; i < brackets.length; i++) {
    let [upper_bound, percent] = brackets[i];
    let amount = Math.min(upper_bound, income) - brackets[i - 1][0];
    ans += amount * (percent / 100);
    if (upper_bound >= income) break;
  }  
  return ans;
};

// Two test cases to run function on
console.log(calculateTax([[3,50],[7,10],[12,25]], 10)) // 2.65
console.log(calculateTax([[1,0],[4,25],[5,50]], 2)) // 0.25