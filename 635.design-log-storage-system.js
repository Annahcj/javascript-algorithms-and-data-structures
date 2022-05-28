// 635. Design Log Storage System
// You are given several logs, where each log contains a unique ID and timestamp. Timestamp is a string that has the following format: Year:Month:Day:Hour:Minute:Second, for example, 2017:01:01:23:59:59. All domains are zero-padded decimal numbers.
// Implement the LogSystem class:
  // LogSystem() Initializes the LogSystem object.
  // void put(int id, string timestamp) Stores the given log (id, timestamp) in your storage system.
  // int[] retrieve(string start, string end, string granularity) Returns the IDs of the logs whose timestamps are within the range from start to end inclusive. start and end all have the same format as timestamp, and granularity means how precise the range should be (i.e. to the exact Day, Minute, etc.). For example, start = "2017:01:01:23:59:59", end = "2017:01:02:23:59:59", and granularity = "Day" means that we need to find the logs within the inclusive range from Jan. 1st 2017 to Jan. 2nd 2017, and the Hour, Minute, and Second for each log entry can be ignored.


// Solution: Brute Force

// Keep each [id, timestamp] in an array.
// For the retrieval, 
  // loop through each log and slice each string according to the granularity.
  // only keep the log if it is between the start and end timestamps.

// Time Complexity: 84ms
  // put: O(1)
  // retrieve: O(n)
// Space Complexity: O(n) 48.2MB
var LogSystem = function() {
  this.logs = [];  
};

LogSystem.prototype.put = function(id, timestamp) {
  this.logs.push([id, timestamp]);  
};

LogSystem.prototype.retrieve = function(start, end, granularity) {
  let startTime = this.getTime(start, granularity);
  let endTime = this.getTime(end, granularity);
  let res = [];
  for (let [id, timestamp] of this.logs) {
    let time = this.getTime(timestamp, granularity);
    if (time >= startTime && time <= endTime) res.push(id);
  }
  return res;
};

LogSystem.prototype.getTime = function(timestamp, granularity) {
  let key = {
    Year: 4,
    Month: 7,
    Day: 10,
    Hour: 13,
    Minute: 16,
    Second: 19
  }
  return timestamp.slice(0, key[granularity]);
}

// A few test cases
let logSystem = new LogSystem();
logSystem.put(1, "2017:01:01:23:59:59");
logSystem.put(2, "2017:01:01:22:59:59");
logSystem.put(3, "2016:01:01:00:00:00");
console.log(logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year")) // [1,2,3]
console.log(logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour")) // [1,2]