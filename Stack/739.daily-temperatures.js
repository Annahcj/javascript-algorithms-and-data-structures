// 739. Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.


// Solution: Stack

// Push index of temperature in stack,
// later, when a larger temperature is found, 
// keep popping off past temperatures until either the stack becomes empty or the last item in the stack is not smaller than current temperature.
// for each temperature in the stack, update the distance in res to be current index - past index.

// for e.g: [73,74,75,71,69,72,76,73]
// res = [0,0,0,0,0,0,0,0]

// i = 0, stack = []: stack is empty, push i into stack.

// i = 1, stack = [0]: 
  // j = stack.pop (0)
  // res[j] = i - j (1 - 0 = 1) [1,0,0,0,0,0,0,0]
  // push i into stack

// i = 2, stack = [1]: 
  // j = stack.pop (1)
  // res[j] = i - j (2 - 1 = 1) [1,1,0,0,0,0,0,0]
  // push i into stack

// i = 3, stack = [2]: last temp in stack is not smaller than current temperature, so just push i into stack.

// i = 4, stack = [2,3]: last temp in stack is not smaller than current temp, so just push i into stack.

// i = 5, stack = [2,3,4]: 
  // j = stack.pop (4)
  // res[j] = i - j (5 - 4 = 1) [1,1,0,0,1,0,0,0]
  // j = stack.pop (3)
  // res[j] = i - j (5 - 3 = 2) [1,1,0,2,1,0,0,0]
  // push i into stack.

// i = 6, stack = [2,5]: 
  // j = stack.pop (5)
  // res[j] = i - j (6 - 5 = 1) [1,1,0,2,1,1,0,0]
  // j = stack.pop (2)
  // res[j] = i - j (6 - 2 = 4) [1,1,4,2,1,1,0,0]
  // push i into stack

// i = 7, stack = [6]: last temp in stack is not smaller than current temp, so just push i into stack

// And we're done! res = [1,1,4,2,1,1,0,0]


// Algorithm:
// Set stack to [], res to an array with the length of temperatures, filled with 0's.
// Loop through temperatures (pointer = i)
  // Loop while stack is not empty AND temperatures[last item in stack] is smaller than temperatures[i]
    // Let j equal stack.pop
    // Set res[j] to i - j
  // Push i into stack
// Return res.

// Time Complexity: O(n) 244ms
// Space Complexity: O(n) 61.2MB
  var dailyTemperatures = function(temperatures) {
    let stack = [], res = new Array(temperatures.length).fill(0);  
    for (var i = 0; i < temperatures.length; i++) {
      while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
        let j = stack.pop();
        res[j] = i - j;
      }
      stack.push(i);
    }
    return res;
  };
  
  // Three test cases to run function on
  console.log(dailyTemperatures([73,74,75,71,69,72,76,73])) // [1,1,4,2,1,1,0,0]
  console.log(dailyTemperatures([30,40,50,60])) // [1,1,1,0]
  console.log(dailyTemperatures([30,60,90])) // [1,1,0]