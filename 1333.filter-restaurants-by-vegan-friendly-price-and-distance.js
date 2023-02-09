// 1333. Filter Restaurants by Vegan-Friendly, Price and Distance
// Given the array restaurants where  restaurants[i] = [id[i], rating[i], veganFriendly[i], price[i], distance[i]]. You have to filter the restaurants using three filters.
// The veganFriendly filter will be either true (meaning you should only include restaurants with veganFriendlyi set to true) or false (meaning you can include any restaurant). In addition, you have the filters maxPrice and maxDistance which are the maximum value for price and distance of restaurants you should consider respectively.
// Return the array of restaurant IDs after filtering, ordered by rating from highest to lowest. For restaurants with the same rating, order them by id from highest to lowest. For simplicity veganFriendly[i] and veganFriendly take value 1 when it is true, and 0 when it is false.

 
// Solution: Filter and Sort

// 1. Filter the restaurant indexes based on the three rules.
// 2. Sort the restaurant indexes by rating, then id.
// 3. Map each restaurant index to restaurant id. 

// Time Complexity: O(n log(n)) 80ms
// Space Complexity: O(n) 47.7MB
var filterRestaurants = function(restaurants, veganFriendly, maxPrice, maxDistance) {
  let restaurantIndexes = [], n = restaurants.length;
  for (let i = 0; i < n; i++) {
    let [_id, _rating, veganFriendlyI, price, distance] = restaurants[i];
    if (veganFriendly && !veganFriendlyI) continue;
    if (distance > maxDistance || price > maxPrice) continue;
    restaurantIndexes.push(i);
  }
  return restaurantIndexes.sort((a, b) => restaurants[a][1] !== restaurants[b][1] ? restaurants[b][1] - restaurants[a][1] : restaurants[b][0] - restaurants[a][0]).map((index) => restaurants[index][0]);
};

// Two test cases
console.log(filterRestaurants([[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 1, 50, 10)) // [3,1,5]
console.log(filterRestaurants([[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 0, 50, 10)) // [4,3,2,1,5]