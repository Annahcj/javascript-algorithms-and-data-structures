// 412. Fizz Buzz
// Given an integer n, return a string array answer (1-indexed) where:
// answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
// answer[i] == "Fizz" if i is divisible by 3.
// answer[i] == "Buzz" if i is divisible by 5.
// answer[i] == i if non of the above conditions are true.


// Solution 1: Naive Approach

// res = result array
// Loop through from 1 to n (pointer = i)
  // If i is divisible by 3 AND is divisible by 5, push 'FizzBuzz' into res
  // Otherwise if i is divisible by 3, push 'Fizz' into res
  // Otherwise if i is divisible by 5, push 'Buzz' into res
  // Otherwise, push i into res (after turning it into a string)
// Return res.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 41.1MB
  var fizzBuzz = function(n) {
    let res = [];
    for (var i = 1; i <= n; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        res.push('FizzBuzz');
      } else if (i % 3 === 0) {
        res.push('Fizz');
      } else if (i % 5 === 0) {
        res.push('Buzz');
      } else {
        res.push(i.toString());
      }
    }  
    return res;
  };
  
  
  // Solution 2: String Concatenation
  
  // If the number of conditions increases, the lines of conditions would grow at an alarming rate. 
  // If we add one more condition, for e.g: divisible by 7 -> 'Jazz', then the number of conditions would become eight.
  // So, instead of checking for every combination, we only check the divisibility of each number, like 3, 5, 7.
  // Instead of pushing directly to the result array, we append them to a temporary string.
  // If i is divisible by 3, add 'Fizz' to the temp string.
  // If i is divisible by 5, add 'Buzz' to the temp string.
  // That way, if i is divisible by both 3 and 5, our temp string would be 'FizzBuzz'. 
  // Then, just push it into res, or push i if the string is empty.
  
  // Time Complexity: O(n) 125ms
  // Space Complexity: O(1) 40.4MB
  var fizzBuzz = function(n) {
    let res = [];
    for (var i = 1; i <= n; i++) {
      let str = '';
      if (i % 3 === 0) {
        str += 'Fizz';
      } 
      if (i % 5 === 0) {
        str += 'Buzz';
      } 
      res.push(str.length ? str : i.toString());
    }  
    return res;
  };
  
  
  // Solution 3: Hash Map
  
  // This approach may not be the most time efficient, but the length of the code will definitely shorten when there are more divisors.
  // Put the divisors with the format { divisor: string } in a hashmap.
  
  // Algorithm:
  // Loop through from 1 to n (pointer = i)
    // Like approach 2, keep a temporary string.
    // Loop through each divisor in divisors
      // If i is divisible by divisor, append divisors[divisor] to the temporary string  
    // Push the temporary string into res, or i if the string is empty.
  // Return res 
  
  // Time Complexity: O(n) (divisors are still constant) 116ms
  // Space Complexity: O(1) 41.1MB
  var fizzBuzz = function(n) {
    let divisors = {
      3: 'Fizz',
      5: 'Buzz'
    }
    let res = [];
    for (var i = 1; i <= n; i++) {
      let str = '';
      for (var div in divisors) {
        if (i % div === 0) {
          str += divisors[div];
        }
      }
      res.push(str.length ? str : i.toString());
    }  
    return res;
  };
  
  // Three test cases to run function on
  console.log(fizzBuzz(3)) // ["1","2","Fizz"]
  console.log(fizzBuzz(5)) // ["1","2","Fizz","4","Buzz"]
  console.log(fizzBuzz(15)) // ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]