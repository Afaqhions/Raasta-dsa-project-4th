import express from "express";
import cors from "cors";
import { getLocationsJson, getGraphJson } from "./utils/graphData.js";
import { dijkstra, findAlternativePaths } from "./utils/algorithms.js";
import { getTrafficUpdates, updateTraffic, getTrafficJson } from "./utils/traffic.js";

const app = express();
const PORT = 18080;

app.use(cors());
app.use(express.json());

// GET /api/locations
app.get("/api/locations", (_req, res) => {
  res.json(getLocationsJson());
});

// GET /api/graph
app.get("/api/graph", (_req, res) => {
  res.json(getGraphJson());
});

// GET /api/traffic
app.get("/api/traffic", (_req, res) => {
  res.json(getTrafficJson());
});

// POST /api/navigate
app.post("/api/navigate", (req, res) => {
  const { start, end, consider_traffic } = req.body;
  if (!start || !end) {
    return res.status(400).json({ error: "Missing start or end" });
  }

  const trafficUpdates = getTrafficUpdates();
  const result = dijkstra(start, end, trafficUpdates, consider_traffic !== false);

  if (result.distance === -1) {
    return res.json({ error: `No path found between ${start} and ${end}` });
  }

  res.json({
    distance: result.distance,
    path: result.path,
    steps: result.path.length,
    estimated_time: result.distance * 2
  });
});

// POST /api/alternatives
app.post("/api/alternatives", (req, res) => {
  const { start, end, k } = req.body;
  if (!start || !end) {
    return res.status(400).json({ error: "Missing start or end" });
  }

  const trafficUpdates = getTrafficUpdates();
  const result = findAlternativePaths(start, end, k || 3, trafficUpdates);

  res.json({
    paths: result.paths.map((p, i) => ({
      id: i + 1,
      distance: p.distance,
      path: p.path
    }))
  });
});

// POST /api/traffic
app.post("/api/traffic", (req, res) => {
  const { road, density } = req.body;
  if (!road || density === undefined) {
    return res.status(400).json({ error: "Missing road or density" });
  }

  updateTraffic(road, density);
  res.json({ status: "success", message: `Traffic updated for ${road}` });
});

app.listen(PORT, () => {
  console.log("\n================================================");
  console.log("   SMART CITY TRAFFIC NAVIGATION SYSTEM");
  console.log("================================================");
  console.log(`   Server running on port ${PORT}`);
  console.log("   API endpoints:");
  console.log("     GET  /api/locations - Get all locations");
  console.log("     GET  /api/graph - Get graph data");
  console.log("     POST /api/navigate - Find shortest path");
  console.log("     POST /api/alternatives - Find alternative paths");
  console.log("     POST /api/traffic - Update traffic conditions");
  console.log("     GET  /api/traffic - Get traffic conditions");
  console.log("================================================\n");
});
