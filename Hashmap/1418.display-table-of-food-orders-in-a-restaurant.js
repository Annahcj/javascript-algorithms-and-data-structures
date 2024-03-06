// 1418. Display Table of Food Orders in a Restaurant
// Given the array orders, which represents the orders that customers have done in a restaurant. More specifically orders[i]=[customerName[i],tableNumber[i],foodItem[i]] where customerName[i] is the name of the customer, tableNumber[i] is the table customer sit at, and foodItem[i] is the item customer orders.
// Return the restaurant's “display table”. The “display table” is a table whose row entries denote how many of each food item each table ordered. The first column is the table number and the remaining columns correspond to each food item in alphabetical order. The first row should be a header whose first column is “Table”, followed by the names of the food items. Note that the customer names are not part of the table. Additionally, the rows should be sorted in numerically increasing order.


// Solution: Hashmap

// Hashmap of hashmaps.
// For each tableNumber, use a hashmap to store counts for each foodItem.
// Use a hashset to get all the unique foodItems and convert it to an array.

// At the end, go through each table number in the hashmap (JS objects have numerical keys in asc order)
  // Go through each foodItem in the array and populate the counts based on the hashmap.
  // If the hashmap doesn't have that foodItem, have a count of 0.

// k = total unique food items, n = number of tables, m = number of orders per table
// Time Complexity: O(nmk + k log(k)) 176ms
// Space Complexity: O(nmk) 70.8MB
var displayTable = function(orders) {
  let countsPerTable = {}, foodItems = new Set();
  for (let [_customerName, tableNumber, foodItem] of orders) {
    if (!countsPerTable[tableNumber]) countsPerTable[tableNumber] = {};
    countsPerTable[tableNumber][foodItem] = (countsPerTable[tableNumber][foodItem] || 0) + 1;
    foodItems.add(foodItem);
  }
  let sortedFoodItems = [...foodItems].sort();
  let rows = [['Table', ...sortedFoodItems]];
  for (let tableNumber in countsPerTable) {
    let counts = countsPerTable[tableNumber];
    let row = [tableNumber];
    for (let foodItem of sortedFoodItems) {
      row.push((counts[foodItem] || 0).toString());
    }
    rows.push(row);
  }
  return rows;
};

// Three test cases
console.log(displayTable([["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]])) // [["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]] 
console.log(displayTable([["James","12","Fried Chicken"],["Ratesh","12","Fried Chicken"],["Amadeus","12","Fried Chicken"],["Adam","1","Canadian Waffles"],["Brianna","1","Canadian Waffles"]])) // [["Table","Canadian Waffles","Fried Chicken"],["1","2","0"],["12","0","3"]] 
console.log(displayTable([["Laura","2","Bean Burrito"],["Jhon","2","Beef Burrito"],["Melissa","2","Soda"]])) // [["Table","Bean Burrito","Beef Burrito","Soda"],["2","1","1","1"]]