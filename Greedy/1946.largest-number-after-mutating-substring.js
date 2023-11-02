// 1946. Largest Number After Mutating Substring
// You are given a string num, which represents a large integer. You are also given a 0-indexed integer array change of length 10 that maps each digit 0-9 to another digit. More formally, digit d maps to digit change[d].
// You may choose to mutate a single substring of num. To mutate a substring, replace each digit num[i] with the digit it maps to in change (i.e. replace num[i] with change[num[i]]).
// Return a string representing the largest possible integer after mutating (or choosing not to) a single substring of num.
// A substring is a contiguous sequence of characters within the string.


// Solution: Greedy 

// Digits on the left have more significance than digits on the right.
// It is only worth changing a digit if it becomes larger than before or equal.
// Since digits on the left are more significant, we try to replace digits as left as possible.

// Find the first digit (from the left) that will become bigger.
  // From there, continue expanding the substring while the new digits are larger than or equal to before.
  // We stop expanding the substring once a digit becomes smaller than before, since left digits are more significant than right digits.

// Time Complexity: O(n) 181ms
// Space Complexity: O(n) 50.5MB
var maximumNumber = function(num, change) {
  let n = num.length;
  for (let i = 0; i < n; i++) {
    if (change[Number(num[i])] > num[i]) {
      let j = i, newSubstr = "";
      while (j < n && change[Number(num[j])] >= num[j]) {
        newSubstr += change[Number(num[j])];
        j++;
      }
      return num.slice(0, i) + newSubstr + num.slice(j);
    }
  }
  return num;
};

// Three test cases
console.log(maximumNumber("132", [9,8,5,0,3,6,4,2,6,8])) // "832"
console.log(maximumNumber("021", [9,4,3,5,7,2,1,9,0,6])) // "934"
console.log(maximumNumber("5", [1,4,7,5,3,2,5,6,9,4])) // "5"