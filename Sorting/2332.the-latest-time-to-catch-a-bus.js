// 2332. The Latest Time to Catch a Bus
// You are given a 0-indexed integer array buses of length n, where buses[i] represents the departure time of the ith bus. You are also given a 0-indexed integer array passengers of length m, where passengers[j] represents the arrival time of the jth passenger. All bus departure times are unique. All passenger arrival times are unique.
// You are given an integer capacity, which represents the maximum number of passengers that can get on each bus.
// When a passenger arrives, they will wait in line for the next available bus. You can get on a bus that departs at x minutes if you arrive at y minutes where y <= x, and the bus is not full. Passengers with the earliest arrival times get on the bus first.
// More formally when a bus arrives, either:
  // If capacity or fewer passengers are waiting for a bus, they will all get on the bus, or
  // The capacity passengers with the earliest arrival times will get on the bus.
// Return the latest time you may arrive at the bus station to catch a bus. You cannot arrive at the same time as another passenger.
// Note: The arrays buses and passengers are not necessarily sorted.


// Solution: Greedy w/ Sorting 

// Sort buses and passengers in asc order.
// Keep track of two pointers: i = index in buses, j = index in passengers.
// Keep track of the capacity of the current bus.
// When the capacity exceeds the maximum capacity OR the bus leaves (buses[i] > passengers[j]), then we increment i.
  // If the bus leaves before reaching maximum capacity, then we can arrive at buses[i] time to catch the ith bus.
  // Otherwise, we can try to arrive 1 minute before each passenger catches a bus.

// Note: We use a set to keep track of passenger times. This is used to make sure we don't choose an existing arrival time of a passenger.

// n = number of buses, m = number of passengers
// Time Complexity: O(n log(n) + m log(m)) 241ms
// Space Complexity: O(m + log(n) + log(m)) 64.4MB
var latestTimeCatchTheBus = function(buses, passengers, capacity) {
  buses.sort((a, b) => a - b);
  passengers.sort((a, b) => a - b);
  let passengerTimes = new Set(passengers);
  let time = 0, currCapacity = 0;
  let i = 0, j = 0;
  while (j < passengers.length && i < buses.length) {
    if (buses[i] < passengers[j]) { // bus is not full
      // arrive at the bus's departure time
      if (!passengerTimes.has(buses[i])) {
        time = buses[i]; 
      } 
      i++;
      currCapacity = 0;
    } else {
      currCapacity++;
      // arrive 1 minute before passenger j
      if (j === 0 || passengers[j] - passengers[j - 1] > 1) {
        time = passengers[j] - 1;
      }
      if (currCapacity === capacity) {
        i++;
        currCapacity = 0;
      }
      j++;
    }
  }

  // if the last bus is not full, we can arrive at the departure time of the last bus 
  if (passengerTimes.has(buses[buses.length - 1])) return time;
  if (i < buses.length - 1 || (i === buses.length - 1 && currCapacity < capacity)) {
    return buses[buses.length - 1];
  }
  return time;
};

// Two test cases
console.log(latestTimeCatchTheBus([10,20], [2,17,18,19], 2)) // 16
console.log(latestTimeCatchTheBus([20,30,10], [19,13,26,4,25,11,21], 2)) // 20