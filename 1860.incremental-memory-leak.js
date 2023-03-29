// 1860. Incremental Memory Leak
// You are given two integers memory1 and memory2 representing the available memory in bits on two memory sticks. There is currently a faulty program running that consumes an increasing amount of memory every second.
// At the ith second (starting from 1), i bits of memory are allocated to the stick with more available memory (or from the first memory stick if both have the same available memory). If neither stick has at least i bits of available memory, the program crashes.
// Return an array containing [crashTime, memory1crash, memory2crash], where crashTime is the time (in seconds) when the program crashed and memory1crash and memory2crash are the available bits of memory in the first and second sticks respectively.


// Solution: Simulation

// The time complexity is the amount where (1 + 2 + 3 + ... + n) <= memoy1 + memory2
// For the current limit 2^31, this amount is around 100,000.

var memLeak = function(memory1, memory2) {
  let consumption = 1;
  while (memory1 >= consumption || memory2 >= consumption) {
    if (memory1 >= memory2) {
      memory1 -= consumption;
    } else {
      memory2 -= consumption;
    }
    consumption++;
  }
  return [consumption, memory1, memory2];
};