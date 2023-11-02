// 2162. Minimum Cost to Set Cooking Time
// A generic microwave supports cooking times for:
  // at least 1 second.
  // at most 99 minutes and 99 seconds.
// To set the cooking time, you push at most four digits. The microwave normalizes what you push as four digits by prepending zeroes. It interprets the first two digits as the minutes and the last two digits as the seconds. It then adds them up as the cooking time. For example,
  // You push 9 5 4 (three digits). It is normalized as 0954 and interpreted as 9 minutes and 54 seconds.
  // You push 0 0 0 8 (four digits). It is interpreted as 0 minutes and 8 seconds.
  // You push 8 0 9 0. It is interpreted as 80 minutes and 90 seconds.
  // You push 8 1 3 0. It is interpreted as 81 minutes and 30 seconds.
// You are given integers startAt, moveCost, pushCost, and targetSeconds. Initially, your finger is on the digit startAt. Moving the finger above any specific digit costs moveCost units of fatigue. Pushing the digit below the finger once costs pushCost units of fatigue.
// There can be multiple ways to set the microwave to cook for targetSeconds seconds but you are interested in the way with the minimum cost.
// Return the minimum cost to set targetSeconds seconds of cooking time.


// Solution: Try Minute Combinations

// The seconds can range from 0 - 99.
// For this reason, the minutes can only vary by 1.
// The maximum minutes is Math.floor(targetSeconds / 60).
  // The only other possibility is max minutes - 1.
  // Proof: In the case of 99 seconds (the maximum number of seconds) it can be either 1:39 or 0:99.
  
// Try both minute possibilities.
// From the minutes we can work out the amount of seconds left.
  // To get the remaining seconds: targetSeconds - (minutes * 60)
  // If minutes or seconds exceeds 99, it is invalid.
// Record the minimum cost from all the combinations.

// Time Complexity: O(1) 63ms
// Space Complexity: O(1) 42.2MB
var minCostSetTime = function(startAt, moveCost, pushCost, targetSeconds) {
  let maxMins = Math.floor(targetSeconds / 60);
  return Math.min(getCost(maxMins), getCost(maxMins - 1));
  
  function getTimeString(minutes) {
    let seconds = targetSeconds - minutes * 60;
    if (minutes > 99 || seconds > 99) return "";
    let totalSeconds = minutes * 100 + seconds;
    let timeString = totalSeconds.toString();
    return timeString;
  }
  
  function getCost(minutes) {
    let timeString = getTimeString(minutes);
    if (timeString === "") return Infinity;
    let prev = startAt.toString(), cost = 0;
    for (let digit of timeString) {
      if (digit !== prev) {
        cost += moveCost;
        prev = digit;
      }
      cost += pushCost;
    }
    return cost;
  }
};

// Two test cases
console.log(minCostSetTime(1, 2, 1, 600)) // 6
console.log(minCostSetTime(0, 1, 2, 76)) // 6