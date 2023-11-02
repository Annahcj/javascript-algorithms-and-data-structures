// 1203. Sort Items by Groups Respecting Dependencies
// There are n items each belonging to zero or one of m groups where group[i] is the group that the i-th item belongs to and it's equal to -1 if the i-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.
// Return a sorted list of the items such that:
  // The items that belong to the same group are next to each other in the sorted list.
  // There are some relations between these items where beforeItems[i] is a list containing all the items that should come before the i-th item in the sorted array (to the left of the i-th item).
// Return any solution if there is more than one solution and return an empty list if there is no solution.


// Solution: Two Topological Sorts

// If a node from groupA must come before a node from groupB, that means all nodes from groupA must come before all nodes in groupB, because items within a group must be next to each other.
// Deal with each group separately.
// We first need to get the order of the groups, then we need the order of items within each group.

// 1. Normalise groups. We want to make the group indexes incrementally different from 0 to n-1. (2,3,7) -> (0,1,2)
// 2. Assign a new group to every node that doesn't belong to a group.
// 3. Create a graph for the groups (each item will be group[item], and we only keep the unique groups for each node's beforeItems)
// 4. Get the topological sort order for the groups. If there is a cycle, return [].
// 5. Get the topological sort order for the items. 
  // This will contain the relative order that we need for each group of nodes. 
  // The nodes within a group will not be next to each other, but we can use this to get the order within a group.
// 6. Get the ordering of nodes for each group from the items sort order.
// 7. Get the final ordering - groups in group order, and items within each group in the correct order.

// n = number of nodes, m = number of groups, k = number of edges
// Time Complexity: O(n + m + k) 865ms
// Space Complexity: O(n + m + k) 86.5MB
var sortItems = function(n, m, group, beforeItems) {
  // 1. Normalise group indexes
  let uniqueGroups = new Set();
  for (let i = 0; i < n; i++) {
    if (group[i] !== -1) {
      uniqueGroups.add(group[i]);
    }
  }
  let sortedGroups = [...uniqueGroups].sort((a, b) => a - b);
  let newGroupIndexes = sortedGroups.reduce((memo, group, index) => {
    memo[group] = index;
    return memo;
  }, {});
  for (let i = 0; i < n; i++) {
    if (group[i] !== -1) {
      group[i] = newGroupIndexes[group[i]];
    }
  }

  // 2. Assign a new group to every node that doesn't belong to a group
  let groupIndex = uniqueGroups.size;
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) {
      group[i] = groupIndex++; 
    }
  }
  
  // 3. Create a graph for the groups
  let numGroups = groupIndex;
  let groupsGraph = Array(numGroups).fill(0).map(() => []);
  for (let i = 0; i < n; i++) { 
    let currentEdges = groupsGraph[group[i]] || [];
    let groups = beforeItems[i].map((item) => group[item]);
    let groupsSet = new Set([...groups, ...currentEdges]);
    groupsSet.delete(group[i]);
    groupsGraph[group[i]] = [...groupsSet];
  }

  // 4. Get the topological sort order for the groups.
  let groupsOrder = topologicalSort(groupsGraph);
  if (!groupsOrder) return []; // groups ordering is impossible because there is a cycle
  
  // 5. Get the topological sort order for the items.
  let itemsOrder = topologicalSort(beforeItems);
  if (!itemsOrder) return []; // items ordering is impossible
  
  // 6. Get the ordering of nodes for each group.
  let orderedItemsInGroups = Array(numGroups).fill(0).map(() => []); // orderedItemsInGroups[i] = the list of ordered items in group i
  for (let item of itemsOrder) {
    orderedItemsInGroups[group[item]].push(item);
  }
  
  // 7. Get the final ordering - groups in group order, and items within each group in the correct order.
  let finalOrder = [];
  for (let group of groupsOrder) {
    finalOrder.push(...orderedItemsInGroups[group]);
  }
  return finalOrder;
};

// Topological sort:

// 1. Count indegrees for each node
// 2. Create a reversed graph
// 3. Put nodes with indegree with 0 into a queue
// 4. Perform topological sort with the queue
function topologicalSort(graph) {
  let n = graph.length, indegrees = Array(n).fill(0);
  let queue = [], reversed = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    indegrees[i] += graph[i].length;
    if (indegrees[i] === 0) queue.push(i);
    for (let node of graph[i]) {
      reversed[node].push(i);
    }
  }

  let order = [];
  while (queue.length) {
    let node = queue.shift();
    order.push(node);
    n--;
    for (let nei of reversed[node]) {
      if (--indegrees[nei] === 0) {
        queue.push(nei);
      }
    }
  }
  return n === 0 ? order : null;
}

// Three test cases
console.log(sortItems(5, 5, [2,0,-1,3,0], [[2,1,3],[2,4],[],[],[]])) // [3,2,4,1,0]
console.log(sortItems(8, 2, [-1,-1,1,0,0,1,0,-1], [[],[6],[5],[6],[3,6],[],[],[]])) // [6,3,4,1,5,2,0,7]
console.log(sortItems(8, 2, [-1,-1,1,0,0,1,0,-1], [[],[6],[5],[6],[3],[],[4],[]])) // []