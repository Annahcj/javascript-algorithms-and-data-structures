// 2678. Number of Senior Citizens
// You are given a 0-indexed array of strings details. Each element of details provides information about a given passenger compressed into a string of length 15. The system is such that:
  // The first ten characters consist of the phone number of passengers.
  // The next character denotes the gender of the person.
  // The following two characters are used to indicate the age of the person.
  // The last two characters determine the seat allotted to that person.
// Return the number of passengers who are strictly more than 60 years old.


// Solution: 

// Go through each passenger detail and convert detail[11] and detail[12] into a number.
// Count the number of passengers with age > 60.

// n = length of details
// Time Complexity: O(n) 53ms
// Space Complexity: O(1) 42.7MB
var countSeniors = function(details) {
  return details.reduce((sum, detail) => {
    const age = Number(detail[11]) * 10 + Number(detail[12]);
    return sum + (age > 60 ? 1 : 0);
  }, 0);
};

// Two test cases
console.log(countSeniors(["7868190130M7522","5303914400F9211","9273338290F4010"])) // 2
console.log(countSeniors(["1313579440F2036","2921522980M5644"])) // 0