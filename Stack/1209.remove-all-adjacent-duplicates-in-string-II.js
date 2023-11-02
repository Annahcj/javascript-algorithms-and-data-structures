// 1209. Remove All Adjacent Duplicates in String II
// You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them, causing the left and the right side of the deleted substring to concatenate together.
// We repeatedly make k duplicate removals on s until we no longer can.
// Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.



// Solution: Using a Stack

// Thoughts: 
// We loop through s, if last element of stack is not equal to current element, push [curr char, 1] to the stack, 
// If it is equal, increment the count of the last element of stack, then check whether the count is equal to k.
// If the count is equal to k, pop the last item off (removed)
// For e.g: In a string "dbbbdd", where k = 3. Initial stack is [['dummy', 1]]
// i = 0: s[i] = 'd', stack = [['dummy', 1], ['d', 1]], we push s[i] and 1 to the stack since stack[stack.length - 1][0] ('dummy') is not equal to 'd'.
// i = 1: s[i] = 'b', stack = [['dummy', 1], ['d', 1], ['b', 1]], we push s[i] and 1 to the stack.
// i = 2: s[i] = 'b', stack = [['dummy', 1], ['d', 1], ['b', 2]], we increment stack[stack.length - 1][1] by one since 'b' is equal to 'b';
// i = 3: s[i] = 'b', stack = [['dummy', 1], ['d', 1], ['b', 3]], then becomes [['dummy', 1], ['d', 1]], last item count is equal to k so we pop the last item off.
// i = 4: s[i] = 'd', stack = [['dummy', 1], ['d', 2]], we increment stack[stack.length - 1][1] by one
// i = 5: s[i] = 'd', stack = [['dummy', 1], ['d', 3]], then becomes [['dummy', 1]] since stack[stack.length - 1][1] is equal to k.

// Algorithm:
// Set stack to [['#', 0]] (with a dummy element)
// Loop through the string, 
  // If last element of stack is equal to current character of string, increment last element's count by one.
    // Check if last element's count is equal to k, if it is, pop it off the stack.
  // Else
    // Push [current character, 1] to stack
// When iteration is finished, loop through the stack
  // Add each character repeated stack[j][1] number of times to the result string.
// Return the result string.

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 47.7MB
var removeDuplicates = function(s, k) {
  let stack = [['#', 0]], res = '';
  for (let i = 0; i < s.length; i++) {
    let lastItem = stack[stack.length - 1];
    if (s[i] === lastItem[0]) {
      lastItem[1]++;
      if (lastItem[1] === k) stack.pop();
    } else {
      stack.push([s[i], 1]);
    }
  }
  for (let j = 1; j < stack.length; j++) {
    res += stack[j][0].repeat(stack[j][1]);
  }
  return res;
};

// Three test cases 
console.log(removeDuplicates("abcd", 2)) // "abcd"
console.log(removeDuplicates("deeedbbcccbdaa", 3)) // "aa"
console.log(removeDuplicates("pbbcggttciiippooaais", 2)) // "ps"