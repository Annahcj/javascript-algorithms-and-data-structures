// 2651. Calculate Delayed Arrival Time
// You are given a positive integer arrivalTime denoting the arrival time of a train in hours, and another positive integer delayedTime denoting the amount of delay in hours.
// Return the time when the train will arrive at the station.
// Note that the time in this problem is in 24-hours format.

 
// Solution: Modulo 24

// Return the total time modulo 24.

// Time Complexity: O(1) 66ms
// Space Complexity: O(1) 42.4MB
var findDelayedArrivalTime = function(arrivalTime, delayedTime) {
  return (arrivalTime + delayedTime) % 24;  
};