// 853. Car Fleet
// There are n cars going to the same destination along a one-lane road. The destination is target miles away.
// You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).
// A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same speed.
// The distance between these two cars is ignored (i.e., they are assumed to have the same position).
// A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.
// If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.
// Return the number of car fleets that will arrive at the destination.


// Solution: Sorting

// Organize each car and its speed into an array 'cars'
// (target - position[i]) / speed[i] -> the time it takes for car to reach target
// (for e.g: if a car at position 5 has a time (to reach target) of 7, and another car at position 10 has a time of 1, it is impossible for car 5 to ever catch up with car 10)
// (however, if car at position 8 has a time of 1, and another car at position 10 also has a time of 1, that means they can perfectly meet at the end, and therefore can form a car fleet)

// Sort the cars in asc order by their position
// fleets = 0, curr = 0 
// Loop through cars from back to front (pointer = i)
  // if cars[i][1] (time to get to target) is bigger than curr (time to start a new fleet)
    // increment fleets by one
    // update curr to cars[i][1]
// Return fleets

// Time Complexity: O(n log(n)) 452ms
// Space Complexity: O(n) 73.5MB
var carFleet = function(target, position, speed) {
  let cars = [], n = position.length;
  for (var i = 0; i < n; i++) {
    cars.push([position[i], (target - position[i]) / speed[i]]);
  }  
  cars = cars.sort((a, b) => a[0] - b[0]);
  let fleets = 0, curr = 0;
  for (i = n - 1; i >= 0; i--) {
    if (cars[i][1] > curr) {
      fleets++;
      curr = cars[i][1];
    }
  }
  return fleets;
};

// Two test cases to run function on 
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])) // 3
console.log(carFleet(10, [3], [3])) // 1