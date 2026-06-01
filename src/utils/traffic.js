// In-memory traffic data store
const trafficUpdates = [];

function getTrafficUpdates() {
  return trafficUpdates;
}

function updateTraffic(road, density) {
  const existing = trafficUpdates.find(t => t.road === road);
  if (existing) {
    existing.density = density;
    existing.timestamp = new Date().toISOString();
  } else {
    trafficUpdates.push({
      road,
      density,
      speed_limit: 60,
      timestamp: new Date().toISOString(),
      is_accident: false
    });
  }
}

function getTrafficJson() {
  return {
    traffic: trafficUpdates.map(t => ({
      road: t.road,
      density: t.density,
      timestamp: t.timestamp
    }))
  };
}

export { getTrafficUpdates, updateTraffic, getTrafficJson };
