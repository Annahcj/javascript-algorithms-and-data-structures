// 443. String Compression
// Given an array of characters chars, compress it using the following algorithm:
// Begin with an empty string s. For each group of consecutive repeating characters in chars:
// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.
// After you are done modifying the input array, return the new length of the array.
// You must write an algorithm that uses only constant extra space.


// Solution: Update Arr in Place

// Logic:
// We keep an index, starting from 0, which we will keep appending the new 'compressed' strings.
// For e.g: ['a','a','b','b']
// idx = 0, i = 1, chars[i] = 'a': since chars[i] is equal to prev ('a'), we increase the freq count.
// idx = 0, i = 2, chars[i] = 'b': since chars[i] is not equal to prev ('a'), we replace chars[idx] with prev and increase idx.
// (chars is now ['a','a','b','b'])
// then, if count is bigger than 1 (if it is 1 we don't need to put the frequency), turn count into a string, loop through each digit, and put each digit into chars[idx] while incrementing idx.
// lastly, update prev to chars[i], and reset count to 1.
// (chars is now ['a','2','b','b'])
// idx = 2, i = 3, chars[i] = 'b': since chars[i] is equal to prev ('b'), we increase the freq count.
// idx = 2, i = 4, chars[i] = undefined: since chars[i] is not equal to prev ('b'), we replace chars[idx] with prev, turn count into a string, and put each digit into the arr.
// the end result of chars is ['a','2','b','2']

// Algorithm:
// Set idx to 0, prev to chars[0], count to 1.
// Loop through chars from 1 to end + 1 (pointer = i) (from 1 since we need to compare with previous)
  // If chars[i] is equal to prev, increment count by one.
  // Else
    // Replace chars[idx] with prev, increment idx.
    // If count is bigger than 1, turn count into a string.
      // Loop through each digit in count
        // Replace chars[idx] with digit
        // Increment idx.
  // Update prev to chars[i]
  // Reset count to 1.
// Return idx.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 40.6MB
  var compress = function(chars) {
    let idx = 0, prev = chars[0], count = 1;
    for (var i = 1; i <= chars.length; i++) {
      if (chars[i] === prev) {
        count++;
      } else  {
        chars[idx] = prev;
        idx++;
        if (count > 1) {
          count = count.toString();
          for (var digit of count) {
            chars[idx] = digit;
            idx++;
          }
        }
        prev = chars[i];
        count = 1;
      } 
    }  
    return idx;
  };
  
  // Four test cases to run function on
  console.log(compress(["a","a","b","b","c","c","c"])) // 6 -> ["a","2","b","2","c","3"]
  console.log(compress(["a"])) // 1 -> ["a"]
  console.log(compress(["a","b","b","b","b","b","b","b","b","b","b","b","b"])) // 4 -> ["a","b","1","2"]
  console.log(compress(["a","a","a","b","b","a","a"])) // 6 -> ["a","3","b","2","a","2"]