// 2187. Minimum Time to Complete Trips
// You are given an array time where time[i] denotes the time taken by the ith bus to complete one trip.
// Each bus can make multiple trips successively; that is, the next trip can start immediately after completing the current trip. Also, each bus operates independently; that is, the trips of one bus do not influence the trips of any other bus.
// You are also given an integer totalTrips, which denotes the number of trips all buses should make in total. Return the minimum time required for all buses to complete at least totalTrips trips.


// Solution: Binary Search

// Upper bound set to 10^7 * 10^7, since time[i], totalTrips <= 10^7.
// Binary search for the minimum time where each bus can complete at least 'time' number of trips.

// Time Complexity: O(n log(10^14))
// Space Complexity: O(1)
var minimumTime = function(time, totalTrips) {
  let low = 1, high = 100000000000000 + 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;

  function isEnough(minTime) {
    // for each bus, Math.floor(minTime / time[i])
    let trips = 0;
    for (let i = 0; i < time.length; i++) {
      trips += Math.floor(minTime / time[i]);
    }
    return trips >= totalTrips;
  }
};

// Two test cases to run function on
console.log(minimumTime([1,2,3], 5)) // 3
console.log(minimumTime([2], 1)) // 2