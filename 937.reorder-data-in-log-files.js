// 937. Reorder Data in Log Files
// You are given an array of logs. Each log is a space-delimited string of words, where the first word is the identifier.
// There are two types of logs:
// Letter-logs: All words (except the identifier) consist of lowercase English letters.
// Digit-logs: All words (except the identifier) consist of digits.
// Reorder these logs so that:
// The letter-logs come before all digit-logs.
// The letter-logs are sorted lexicographically by their contents. If their contents are the same, then sort them lexicographically by their identifiers.
// The digit-logs maintain their relative ordering.
// Return the final order of the logs.


// Solution: 

// Create a function 'main' which returns the string after the identifier
// Filter each log and place them in their correct arrays
  // 1. if string after identifier is a letter, place it in letterLogs
  // 2. if string after identifier is a number, place it in digitLogs
// return [sorted letterLogs based on comparator, digitLogs]

// n = number of logs, m = length of each log
// Time Complexity: O(nm + n log(n)) 76ms
// Space Complexity: O(n + log(n)) 43.4MB -> O(n) for storing logs, O(log(n)) for sorting
var reorderLogFiles = function(logs) {
  const main = log => log.slice(log.indexOf(' ') + 1);
  let letterLogs = [];
  let digitLogs = [];
  for (var log of logs) {
    if (isNaN(main(log)[0])) letterLogs.push(log);
    else digitLogs.push(log);
  }
  const comparator = (a, b) => {
    let mainA = main(a), mainB = main(b);
    let mainCompare = mainA.localeCompare(mainB);
    // if main strings are not equal
    if (mainCompare !== 0) return mainCompare;
    // otherwise return based on identifier
    return a.localeCompare(b);
  }
  return [...letterLogs.sort(comparator), ...digitLogs];
};

// Two test cases to run function on
console.log(reorderLogFiles(["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"])) // ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
console.log(reorderLogFiles(["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"])) // ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]