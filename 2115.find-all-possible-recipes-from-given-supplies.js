// 2115. Find All Possible Recipes from Given Supplies
// You have information about n different recipes. You are given a string array recipes and a 2D string array ingredients. The ith recipe has the name recipes[i], and you can create it if you have all the needed ingredients from ingredients[i]. Ingredients to a recipe may need to be created from other recipes, i.e., ingredients[i] may contain a string that is in recipes.
// You are also given a string array supplies containing all the ingredients that you initially have, and you have an infinite supply of all of them.
// Return a list of all the recipes that you can create. You may return the answer in any order.
// Note that two recipes may contain each other in their ingredients.


// Solution: Topological Sort

// 1. Map recipes to their indices.
// 2. Process the ingredients of each recipe,
  // Count the indegrees for each recipe
  // Add connected recipes to the graph
  // Skip over invalid recipes
// 3. Get recipes with indegree of 0
// 4. Process recipes based on topological order

// n = length of recipes, m = length of indegredients[i][j], k = length of supplies
// Time Complexity: O(nm + k) 132ms
// Space Complexity: O(nm + k) 56.4MB
var findAllRecipes = function(recipes, ingredients, supplies) {
  let n = recipes.length;
  let sup = new Set(supplies), recipesMap = new Map();
  for (let i = 0; i < n; i++) {
    recipesMap.set(recipes[i], i); // map recipes to their indices
  }
  
  let indegrees = Array(n).fill(0), graph = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    let connected = [], hasSupplies = true;
    for (let j = 0; j < ingredients[i].length; j++) {
      let ingredient = ingredients[i][j];
      if (recipesMap.has(ingredient)) { // a recipe ingredient
        connected.push(recipesMap.get(ingredient));
      } else if (!sup.has(ingredient)) { // not a valid ingredient
        hasSupplies = false;
        break;
      }
    }
    if (!hasSupplies) {
      indegrees[i] = -1; // invalid, not enough base ingredients
      continue;
    }
    indegrees[i] += connected.length;
    for (let pre of connected) {
      graph[pre].push(i);
    }
  }

  // get recipes with indegree of 0
  let queue = [], res = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) queue.push(i); // find ingredients with only base ingredients
  }
  
  // process based on topological order
  while (queue.length) {
    let i = queue.shift();
    res.push(recipes[i]);
    for (let nei of graph[i]) {
      indegrees[nei]--;
      if (indegrees[nei] === 0) queue.push(nei);
    }
  }
  return res;
};

// Two test cases to run function on
console.log(findAllRecipes(["bread"], [["yeast","flour"]], ["yeast","flour","corn"])) // ["bread"]
console.log(findAllRecipes(["bread","sandwich"], [["yeast","flour"],["bread","meat"]], ["yeast","flour","meat"])) // ["bread","sandwich"]