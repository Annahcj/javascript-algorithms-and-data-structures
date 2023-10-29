// 1396. Design Underground System
// An underground railway system is keeping track of customer travel times between different stations. They are using this data to calculate the average time it takes to travel from one station to another.
// Implement the UndergroundSystem class:
// void checkIn(int id, string stationName, int t)
// A customer with a card ID equal to id, checks in at the station stationName at time t.
// A customer can only be checked into one place at a time.
// void checkOut(int id, string stationName, int t)
// A customer with a card ID equal to id, checks out from the station stationName at time t.
// double getAverageTime(string startStation, string endStation)
// Returns the average time it takes to travel from startStation to endStation.
// The average time is computed from all the previous traveling times from startStation to endStation that happened directly, meaning a check in at startStation followed by a check out from endStation.
// The time it takes to travel from startStation to endStation may be different from the time it takes to travel from endStation to startStation.
// There will be at least one customer that has traveled from startStation to endStation before getAverageTime is called.


// Solution: Hashmap

// UndergroundSystem: keep stations and customers in seperate hash maps.
// checkIn: set customers[id] to stationName and the start time.
// checkOut: 
  // If customer has checked in before, 
    // Keep a total time and number of customers who have traveled from start station to end station in stations.
    // Delete the checkIn record for customer (delete customers[id])
// getAverageTime:
  // Stations has total time and number of customers for [startStation, endStation]
  // Return total time / number of customers.

// Runtime on LeetCode: 276ms
// Memory Usage on LeetCode: 55.3MB

// Time Complexity for checkIn, checkOut, getAverageTime: O(1)
// Space Complexity: O(nm) (stations + customers)
var UndergroundSystem = function() {
  this.stations = {};
  this.customers = {};
};

UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
  this.customers[id] = {station: stationName, time: t};
};

UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
  if (this.customers[id]) {
    let station = this.customers[id].station;
    let startTime = this.customers[id].time;
    if (!this.stations[[station, stationName]]) this.stations[[station, stationName]] = {total: 0, divisor: 0};
    this.stations[[station, stationName]].total += t - startTime;
    this.stations[[station, stationName]].divisor++;
    delete this.customers[id];
  }
};

UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
  let total = this.stations[[startStation, endStation]].total;
  let divisor = this.stations[[startStation, endStation]].divisor;
  return total / divisor;
};