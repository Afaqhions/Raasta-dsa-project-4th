import { getLocationsJson, getGraphJson } from "./graphData.js";
import { dijkstra, findAlternativePaths } from "./algorithms.js";
import { getTrafficUpdates, updateTraffic, getTrafficJson } from "./traffic.js";

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res, data, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

export default function apiPlugin() {
  return {
    name: "api-middleware",
    configureServer(server) {
      server.middlewares.use("/api", async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname;

        // Handle CORS preflight
        if (req.method === "OPTIONS") {
          res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          });
          return res.end();
        }

        // GET /api/locations
        if (req.method === "GET" && path === "/locations") {
          return sendJson(res, getLocationsJson());
        }

        // GET /api/graph
        if (req.method === "GET" && path === "/graph") {
          return sendJson(res, getGraphJson());
        }

        // GET /api/traffic
        if (req.method === "GET" && path === "/traffic") {
          return sendJson(res, getTrafficJson());
        }

        // POST /api/navigate
        if (req.method === "POST" && path === "/navigate") {
          const body = await parseBody(req);
          const { start, end, consider_traffic } = body;
          if (!start || !end) {
            return sendJson(res, { error: "Missing start or end" }, 400);
          }
          const trafficUpdates = getTrafficUpdates();
          const result = dijkstra(start, end, trafficUpdates, consider_traffic !== false);
          if (result.distance === -1) {
            return sendJson(res, { error: `No path found between ${start} and ${end}` });
          }
          return sendJson(res, {
            distance: result.distance,
            path: result.path,
            steps: result.path.length,
            estimated_time: result.distance * 2,
          });
        }

        // POST /api/alternatives
        if (req.method === "POST" && path === "/alternatives") {
          const body = await parseBody(req);
          const { start, end, k } = body;
          if (!start || !end) {
            return sendJson(res, { error: "Missing start or end" }, 400);
          }
          const trafficUpdates = getTrafficUpdates();
          const result = findAlternativePaths(start, end, k || 3, trafficUpdates);
          return sendJson(res, {
            paths: result.paths.map((p, i) => ({
              id: i + 1,
              distance: p.distance,
              path: p.path,
            })),
          });
        }

        // POST /api/traffic
        if (req.method === "POST" && path === "/traffic") {
          const body = await parseBody(req);
          const { road, density } = body;
          if (!road || density === undefined) {
            return sendJson(res, { error: "Missing road or density" }, 400);
          }
          updateTraffic(road, density);
          return sendJson(res, { status: "success", message: `Traffic updated for ${road}` });
        }

        next();
      });
    },
  };
}
