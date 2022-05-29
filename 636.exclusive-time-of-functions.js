// 636. Exclusive Time of Functions
// On a single-threaded CPU, we execute a program containing n functions. Each function has a unique ID between 0 and n-1.
// Function calls are stored in a call stack: when a function call starts, its ID is pushed onto the stack, and when a function call ends, its ID is popped off the stack. The function whose ID is at the top of the stack is the current function being executed. Each time a function starts or ends, we write a log with the ID, whether it started or ended, and the timestamp.
// You are given a list logs, where logs[i] represents the ith log message formatted as a string "{function_id}:{"start" | "end"}:{timestamp}". For example, "0:start:3" means a function call with function ID 0 started at the beginning of timestamp 3, and "1:end:2" means a function call with function ID 1 ended at the end of timestamp 2. Note that a function can be called multiple times, possibly recursively.
// A function's exclusive time is the sum of execution times for all function calls in the program. For example, if a function is called twice, one call executing for 2 time units and another call executing for 1 time unit, the exclusive time is 2 + 1 = 3.
// Return the exclusive time of each function in an array, where the value at the ith index represents the exclusive time for the function with ID i.


// Solution: Stack

// Use a stack to keep track of the latest ids of running function calls.
// Keep track of the previous time, which varies based on the function type (start or end).
// For each function call, add to the time of the previous function call in the stack.

// Time Complexity: O(n) 87ms
// Space Complexity: O(n) 46.1MB
var exclusiveTime = function(n, logs) {
  let res = Array(n).fill(0), stack = [], prevTime = 0;
  for (let i = 0; i < logs.length; i++) {
    let [id, type, time] = logs[i].split(":");
    id = Number(id), time = Number(time);
    
    if (type === 'start') {
      if (stack.length) {
        res[stack[stack.length - 1]] += time - prevTime;
      }
      stack.push(id);
      prevTime = time;
    } else {
      res[stack.pop()] += time - prevTime + 1;
      prevTime = time + 1;
    }
  }
  return res;
};

// Two test cases to run function on
console.log(exclusiveTime(2, ["0:start:0","1:start:2","1:end:5","0:end:6"])) // [3,4]
console.log(exclusiveTime(1, ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"])) // [8]