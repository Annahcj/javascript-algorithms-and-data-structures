// 1701. Average Waiting Time
// There is a restaurant with a single chef. You are given an array customers, where customers[i] = [arrivali, timei]:
  // arrival[i] is the arrival time of the ith customer. The arrival times are sorted in non-decreasing order.
  // time[i] is the time needed to prepare the order of the ith customer.
// When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. The chef does not prepare food for more than one customer at a time. The chef prepares food for customers in the order they were given in the input.
// Return the average waiting time of all customers. Solutions within 10-5 from the actual answer are considered accepted.


// Solution: 

// Keep track of the following:
  // time: the current time
  // totalWaitingTime: the total waiting time (time to wait for chef to finish preparing each order)

// If the current time is greater than the customer's arrival time, that means the customer has to wait (current time - arrival time) number of minutes for the chef to pick up their order.
// Then, we also have to add on the time it takes to prepare each order.

// n = length of customers
// Time Complexity: O(n) 257ms
// Space Complexity: O(1) 74.2MB
var averageWaitingTime = function(customers) {
  let totalWaitingTime = 0, time = 0;
  for (let [arrivalTime, timeToPrepare] of customers) {
    if (time > arrivalTime) {
      totalWaitingTime += time - arrivalTime;
    }
    totalWaitingTime += timeToPrepare;
    time = Math.max(time, arrivalTime) + timeToPrepare;
  }
  return totalWaitingTime / customers.length;
};

// Two test cases
console.log(averageWaitingTime([[1,2],[2,5],[4,3]])) // 5.00000
console.log(averageWaitingTime([[5,2],[5,4],[10,3],[20,1]])) // 3.25000