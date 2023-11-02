// 690. Employee Importance
// You have a data structure of employee information, including the employee's unique ID, importance value, and direct subordinates' IDs.
// You are given an array of employees employees where:
  // employees[i].id is the ID of the ith employee.
  // employees[i].importance is the importance value of the ith employee.
  // employees[i].subordinates is a list of the IDs of the direct subordinates of the ith employee.
// Given an integer id that represents an employee's ID, return the total importance value of this employee and all their direct and indirect subordinates.


// Solution: Map by ID & DFS

// Create a hashmap of employees where the keys are the employee IDs -> { id: employee, id: employee, ... }
// Recursively DFS starting from id to all of its connections.

// Time Complexity: O(n) 129ms
// Space Complexity: O(n) 46.4MB
var GetImportance = function(employees, id) {
  let map = {};
  for (let employee of employees) {
    map[employee.id] = {
      importance: employee.importance,
      subordinates: employee.subordinates
    }
  }
  return dfs(id);
  
  function dfs(id) {
    let ans = map[id].importance;
    for (let childId of map[id].subordinates) {
      ans += dfs(childId);
    }
    return ans;
  }
};