import { getGraph } from "./graphData.js";

const INF = 1e9;

// Min-heap priority queue implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  get size() {
    return this.heap.length;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].dist <= this.heap[i].dist) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _sinkDown(i) {
    const length = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < length && this.heap[left].dist < this.heap[smallest].dist) smallest = left;
      if (right < length && this.heap[right].dist < this.heap[smallest].dist) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

// Dijkstra's Algorithm
// Returns { path: string[], distance: number, steps: object[] }
function dijkstra(start, end, trafficUpdates, considerTraffic = true) {
  const graph = getGraph();
  const dist = {};
  const parent = {};
  const visited = {};

  // Initialize distances
  for (const node of Object.keys(graph)) {
    dist[node] = INF;
    visited[node] = false;
  }

  const pq = new MinHeap();
  dist[start] = 0;
  pq.push({ dist: 0, node: start });

  while (pq.size > 0) {
    const { node: current } = pq.pop();

    if (visited[current]) continue;
    visited[current] = true;

    if (current === end) break;

    for (const edge of graph[current]) {
      let weight = edge.weight;

      // Apply traffic multiplier if enabled
      if (considerTraffic && trafficUpdates) {
        const roadKey = `${current}-${edge.to}`;
        const trafficEntry = trafficUpdates.find(t => t.road === roadKey);
        if (trafficEntry) {
          weight = weight * (1 + trafficEntry.density / 50.0);
        }
      }

      if (dist[current] + weight < dist[edge.to]) {
        dist[edge.to] = dist[current] + weight;
        parent[edge.to] = current;
        pq.push({ dist: dist[edge.to], node: edge.to });
      }
    }
  }

  // No path found
  if (dist[end] === INF || dist[end] === undefined) {
    return { path: [], distance: -1 };
  }

  // Reconstruct path
  const path = [];
  for (let at = end; at != null; at = parent[at]) {
    path.push(at);
    if (at === start) break;
  }
  path.reverse();

  return { path, distance: dist[end] };
}

// Alternative path finding (K-th shortest path via edge blocking)
function findAlternativePaths(start, end, k = 3, trafficUpdates) {
  const graph = getGraph();
  const paths = [];
  const visitedPaths = new Set();

  for (let i = 0; i < k && paths.length < k; i++) {
    const result = dijkstra(start, end, trafficUpdates, true);

    if (result.path.length === 0 || result.distance === -1) break;

    const pathKey = result.path.join("|");

    if (!visitedPaths.has(pathKey)) {
      visitedPaths.add(pathKey);
      paths.push(result);
    }

    // Block first edge of current path for next iteration
    if (result.path.length >= 2) {
      const from = result.path[0];
      const to = result.path[1];
      const edgeIndex = graph[from].findIndex(e => e.to === to);

      if (edgeIndex !== -1) {
        const originalWeight = graph[from][edgeIndex].weight;
        graph[from][edgeIndex].weight = INF;

        const altResult = dijkstra(start, end, trafficUpdates, true);

        graph[from][edgeIndex].weight = originalWeight;

        if (altResult.path.length > 0 && altResult.distance !== -1) {
          const altKey = altResult.path.join("|");
          if (!visitedPaths.has(altKey)) {
            visitedPaths.add(altKey);
            paths.push(altResult);
          }
        }
      }
    }
  }

  return { paths };
}

export { dijkstra, findAlternativePaths };
