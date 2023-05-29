// 1603. Design Parking System
// Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.
// Implement the ParkingSystem class:
  // ParkingSystem(int big, int medium, int small) Initializes object of the ParkingSystem class. The number of slots for each parking space are given as part of the constructor.
  // bool addCar(int carType) Checks whether there is a parking space of carType for the car that wants to get into the parking lot. carType can be of three kinds: big, medium, or small, which are represented by 1, 2, and 3 respectively. A car can only park in a parking space of its carType. If there is no space available, return false, else park the car in that size space and return true.


// Solution: 

// Keep track of the count of each car park type in an object, so that we can reference it dynamically.
// Decrease the count for the appropriate carType each time addCar is called.

// n = number of calls to addCar
// Time Complexity: O(n) 118ms
// Space Complexity: O(1) 50.2MB
var ParkingSystem = function(big, medium, small) {
  this.count = {
    1: big,
    2: medium,
    3: small
  };
};

ParkingSystem.prototype.addCar = function(carType) {
  if (this.count[carType] === 0) return false;
  this.count[carType]--;
  return true;
};