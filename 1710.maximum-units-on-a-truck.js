// 1710. Maximum Units on a Truck
// You are assigned to put some amount of boxes onto one truck. You are given a 2D array boxTypes, where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]:
// numberOfBoxesi is the number of boxes of type i.
// numberOfUnitsPerBoxi is the number of units in each box of the type i.
// You are also given an integer truckSize, which is the maximum number of boxes that can be put on the truck. You can choose any boxes to put on the truck as long as the number of boxes does not exceed truckSize.
// Return the maximum total number of units that can be put on the truck.


// Solution: Sorting

// Our goal is to get the maximum units, so sort boxTypes in decreasing order by their number of units
// Now, loop through each [boxes, units] of boxTypes
  // define a variable take, the number of boxes we will be taking -> Math.min(boxes, truckSize - currBoxes) : 
    // if we don't have enough space left, then truckSize - currBoxes is all we can take. 
    // However if boxes is less than our remaining space, we can only take 'boxes' number of boxes
  // increment currUnits by units * take
  // increment currBoxes by take
// Return currUnits

// Time Complexity: O(n log(n)) 88ms
// Space Complexity: O(log(n)) 42.2MB (the in-built sort method) 
var maximumUnits = function(boxTypes, truckSize) {
  let currUnits = 0, currBoxes = 0;  
  boxTypes = boxTypes.sort((a, b) => b[1] - a[1]);
  for (var [boxes, units] of boxTypes) {
    let take = Math.min(boxes, truckSize - currBoxes);
    currUnits += units * take;
    currBoxes += take;
  }
  return currUnits;
};

// Two test cases to run function on
console.log(maximumUnits([[1,3],[2,2],[3,1]], 4)) // 8
console.log(maximumUnits([[5,10],[2,5],[4,7],[3,9]], 10)) // 91