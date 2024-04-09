// 2073. Time Needed to Buy Tickets
// There are n people in a line queuing to buy tickets, where the 0th person is at the front of the line and the (n - 1)th person is at the back of the line.
// You are given a 0-indexed integer array tickets of length n where the number of tickets that the ith person would like to buy is tickets[i].
// Each person takes exactly 1 second to buy a ticket. A person can only buy 1 ticket at a time and has to go back to the end of the line (which happens instantaneously) in order to buy more tickets. If a person does not have any tickets left to buy, the person will leave the line.
// Return the time taken for the person at position k (0-indexed) to finish buying tickets.


// Solution: Counting

// The number of circular rounds we need for person k = tickets[k].

// For tickets[k] rounds, all tickets in front of index k will be repeated tickets[k] times, unless they are less than tickets[k] and drop out earlier.
// Get the sum of min(tickets[i], tickets[k]), where i < k.

// For tickets[k] - 1 rounds, all tickets behind the index k will be repeated tickets[k] - 1 times, unless they are less than tickets[k] and drop out earlier.
// Get the sum of min(tickets[i], tickets[k] - 1), where i > k.

// Time Complexity: O(n) 59ms
// Space Complexity: O(1) 48.7MB
var timeRequiredToBuy = function(tickets, k) {
  let n = tickets.length, front = 0, behind = 0;
  for (let i = 0; i < n; i++) {
    if (i < k) {
      front += Math.min(tickets[i], tickets[k]);
    } else if (i > k) {
      behind += Math.min(tickets[i], tickets[k] - 1);
    }
  }
  return front + behind + tickets[k];
};

// Two test cases
console.log(timeRequiredToBuy([2,3,2], 2)) // 6
console.log(timeRequiredToBuy([5,1,1,1], 0)) // 8