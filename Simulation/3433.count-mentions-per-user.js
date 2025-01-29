// 3433. Count Mentions Per User
// You are given an integer numberOfUsers representing the total number of users and an array events of size n x 3.
// Each events[i] can be either of the following two types:
// 1. Message Event: ["MESSAGE", "timestamp[i]", "mentions_string[i]"]
  // This event indicates that a set of users was mentioned in a message at timestamp[i].
  // The mentions_string[i] string can contain one of the following tokens:
    // id<number>: where <number> is an integer in range [0,numberOfUsers - 1]. There can be multiple ids separated by a single whitespace and may contain duplicates. This can mention even the offline users.
    // ALL: mentions all users.
    // HERE: mentions all online users.
// 2. Offline Event: ["OFFLINE", "timestamp[i]", "id[i]"]
  // This event indicates that the user id[i] had become offline at timestampi for 60 time units. The user will automatically be online again at time timestamp[i] + 60.
// Return an array mentions where mentions[i] represents the number of mentions the user with id i has across all MESSAGE events.
// All users are initially online, and if a user goes offline or comes back online, their status change is processed before handling any message event that occurs at the same timestamp.
// Note that a user can be mentioned multiple times in a single message event, and each mention should be counted separately.


// Solution: Simulation

// First, sort events by timestamp in asc order.
// Use an array to keep track of the next online timestamp for each user.
// When an offline event occurs, set the next online timestamp to be offline timestamp + 60.

// Message event:
  // ALL: Keep a global counter that we can add back to the final array at the very end. Since all users need to increase by 1, we save time by not adding one by one.
  // HERE: Increment the count for every online user (onlineTimestamp[i] <= current timestamp)
  // ids: Increment the count for every user in the string.

// Time Complexity: O(n^2) 17ms
// Space Complexity: O(n) 61.26MB
function countMentions(n, events) {
  events.sort((a, b) => a[1] === b[1] ? b[0].localeCompare(a[0]) : Number(a[1]) - Number(b[1]));
  const onlineTimestamp = Array(n).fill(0);
  const mentionsCount = Array(n).fill(0);
  let globalMentions = 0;
  for (let i = 0; i < events.length; i++) {
    const type = events[i][0];
    const timestamp = Number(events[i][1]);
    if (type === "MESSAGE") {
      const mentions = events[i][2];
      switch (mentions) {
        case "ALL":
          globalMentions++;
          break;
        case "HERE":
          for (let j = 0; j < n; j++) {
            mentionsCount[j] += onlineTimestamp[j] <= timestamp ? 1 : 0;
          }
          break;
        default:
          const ids = mentions.split(" ");
          for (let id of ids) {
            mentionsCount[Number(id.slice(2))]++;
          }
      }
    } else {
      const id = Number(events[i][2]);
      onlineTimestamp[id] = timestamp + 60;
    }
  }
  if (globalMentions > 0) {
    for (let j = 0; j < n; j++) {
      mentionsCount[j] += globalMentions;
    }
  }
  return mentionsCount;
};

// Three test cases
console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]])) // [2,2]
console.log(countMentions(2, [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]])) // [2,2]
console.log(countMentions(2, [["OFFLINE","10","0"],["MESSAGE","12","HERE"]])) // [0,1]