// Graph data structure for Lahore city navigation
// Each node has edges with: { to, weight, distance_km, traffic_density }

const graph = {};

function addEdge(from, to, weight, distance_km, traffic_density) {
  if (!graph[from]) graph[from] = [];
  graph[from].push({ to, weight, distance_km, traffic_density });
}

function initializeGraph() {
  // Clear existing graph
  Object.keys(graph).forEach(k => delete graph[k]);

  // Core City Areas
  addEdge("UET Lahore", "Ferozepur Road", 3, 2.5, 30);
  addEdge("UET Lahore", "Shalimar Gardens", 3, 3.2, 25);
  addEdge("UET Lahore", "Gulberg III", 4, 4.1, 20);
  addEdge("UET Lahore", "Minhaj-ul-Quran International", 5, 4.8, 15);
  addEdge("UET Lahore", "Baroon", 3, 3.0, 25);

  addEdge("University of Punjab", "UET Lahore", 4, 3.5, 20);
  addEdge("University of Punjab", "Shalimar Block", 2, 2.0, 35);
  addEdge("University of Punjab", "Kot Lakhpat", 3, 2.8, 25);
  addEdge("University of Punjab", "Wapda Town", 3, 3.2, 25);

  addEdge("Lahore Railway Station", "Anarkali Bazaar", 2, 1.8, 40);
  addEdge("Lahore Railway Station", "Badshahi Mosque", 3, 2.5, 30);
  addEdge("Lahore Railway Station", "Canal Bank", 3, 3.2, 25);
  addEdge("Lahore Railway Station", "Mall Road", 2, 2.4, 35);
  addEdge("Lahore Railway Station", "Ichra", 2, 2.0, 35);
  addEdge("Lahore Railway Station", "Mozang", 2, 2.2, 35);

  addEdge("Lahore Airport (Allama Iqbal)", "Lahore Cantt", 4, 4.0, 20);
  addEdge("Lahore Airport (Allama Iqbal)", "Canal Bank", 6, 5.5, 15);
  addEdge("Lahore Airport (Allama Iqbal)", "Badshahi Mosque", 7, 7.2, 10);
  addEdge("Lahore Airport (Allama Iqbal)", "Wapda Town", 5, 4.8, 15);

  addEdge("Mall Road", "Lahore Railway Station", 2, 2.4, 35);
  addEdge("Mall Road", "Anarkali Bazaar", 2, 1.5, 45);
  addEdge("Mall Road", "Canal Bank", 3, 2.8, 30);
  addEdge("Mall Road", "Ferozepur Road", 2, 1.8, 40);
  addEdge("Mall Road", "Lahore Cantt", 4, 3.5, 20);
  addEdge("Mall Road", "Ichra", 2, 2.0, 35);
  addEdge("Mall Road", "Samanabad", 2, 2.2, 35);

  addEdge("Anarkali Bazaar", "Lahore Railway Station", 2, 1.8, 40);
  addEdge("Anarkali Bazaar", "Mall Road", 2, 1.5, 45);
  addEdge("Anarkali Bazaar", "Badshahi Mosque", 2, 1.8, 40);
  addEdge("Anarkali Bazaar", "Gulberg III", 3, 2.5, 30);
  addEdge("Anarkali Bazaar", "Samanabad", 2, 1.5, 45);
  addEdge("Anarkali Bazaar", "Lahore Zoo", 1, 1.2, 50);

  addEdge("Minhaj-ul-Quran International", "UET Lahore", 5, 4.8, 15);
  addEdge("Minhaj-ul-Quran International", "Gulberg III", 2, 1.8, 40);
  addEdge("Minhaj-ul-Quran International", "Lahore Zoo", 4, 3.5, 20);
  addEdge("Minhaj-ul-Quran International", "Model Town", 4, 4.2, 18);
  addEdge("Minhaj-ul-Quran International", "Wapda Town", 3, 2.5, 30);
  addEdge("Minhaj-ul-Quran International", "Kot Lakhpat", 3, 3.0, 25);

  addEdge("Shalimar Gardens", "UET Lahore", 3, 3.2, 25);
  addEdge("Shalimar Gardens", "Lahore Cantt", 5, 4.5, 18);
  addEdge("Shalimar Gardens", "Canal Bank", 3, 2.5, 30);
  addEdge("Shalimar Gardens", "Baghbanpura", 2, 2.0, 35);
  addEdge("Shalimar Gardens", "Mozang", 4, 3.8, 20);
  addEdge("Shalimar Gardens", "Mughalpura", 3, 2.8, 25);

  addEdge("Badshahi Mosque", "Lahore Railway Station", 3, 2.5, 30);
  addEdge("Badshahi Mosque", "Anarkali Bazaar", 2, 1.8, 40);
  addEdge("Badshahi Mosque", "Lahore Airport (Allama Iqbal)", 7, 7.2, 10);
  addEdge("Badshahi Mosque", "Lahore Zoo", 4, 4.0, 18);
  addEdge("Badshahi Mosque", "Mozang", 2, 2.0, 35);

  addEdge("Lahore Zoo", "Minhaj-ul-Quran International", 4, 3.5, 20);
  addEdge("Lahore Zoo", "Badshahi Mosque", 4, 4.0, 18);
  addEdge("Lahore Zoo", "Gulberg III", 2, 2.2, 35);
  addEdge("Lahore Zoo", "Garden Town", 3, 2.5, 30);
  addEdge("Lahore Zoo", "Yousafabad", 2, 1.5, 45);

  addEdge("Canal Bank", "Lahore Railway Station", 3, 3.2, 25);
  addEdge("Canal Bank", "Mall Road", 3, 2.8, 30);
  addEdge("Canal Bank", "Lahore Airport (Allama Iqbal)", 6, 5.5, 15);
  addEdge("Canal Bank", "Shalimar Gardens", 3, 2.5, 30);
  addEdge("Canal Bank", "Lahore Cantt", 3, 3.2, 25);
  addEdge("Canal Bank", "Gulberg III", 3, 3.0, 25);

  addEdge("Ferozepur Road", "UET Lahore", 3, 2.5, 30);
  addEdge("Ferozepur Road", "Mall Road", 2, 1.8, 40);
  addEdge("Ferozepur Road", "Lahore Cantt", 3, 2.8, 30);
  addEdge("Ferozepur Road", "Gulberg III", 2, 1.5, 45);
  addEdge("Ferozepur Road", "Baroon", 1, 1.2, 50);
  addEdge("Ferozepur Road", "Wahdat Colony", 2, 2.0, 35);

  addEdge("Gulberg III", "UET Lahore", 4, 4.1, 20);
  addEdge("Gulberg III", "Ferozepur Road", 2, 1.5, 45);
  addEdge("Gulberg III", "Anarkali Bazaar", 3, 2.5, 30);
  addEdge("Gulberg III", "Minhaj-ul-Quran International", 2, 1.8, 40);
  addEdge("Gulberg III", "Lahore Zoo", 2, 2.2, 35);
  addEdge("Gulberg III", "Garden Town", 2, 1.8, 40);
  addEdge("Gulberg III", "Canal Bank", 3, 3.0, 25);

  addEdge("Lahore Cantt", "Lahore Airport (Allama Iqbal)", 4, 4.0, 20);
  addEdge("Lahore Cantt", "Mall Road", 4, 3.5, 20);
  addEdge("Lahore Cantt", "Shalimar Gardens", 5, 4.5, 18);
  addEdge("Lahore Cantt", "Canal Bank", 3, 3.2, 25);
  addEdge("Lahore Cantt", "Ferozepur Road", 3, 2.8, 30);
  addEdge("Lahore Cantt", "Mughalpura", 4, 3.5, 20);
  addEdge("Lahore Cantt", "Mozang", 3, 2.8, 30);

  addEdge("Model Town", "Minhaj-ul-Quran International", 4, 4.2, 18);
  addEdge("Model Town", "Garden Town", 3, 3.0, 25);
  addEdge("Model Town", "Wapda Town", 2, 2.2, 35);
  addEdge("Model Town", "Kot Lakhpat", 3, 2.5, 30);
  addEdge("Model Town", "Johar Town", 4, 3.5, 20);

  addEdge("Garden Town", "Minhaj-ul-Quran International", 3, 3.0, 25);
  addEdge("Garden Town", "Lahore Zoo", 3, 2.5, 30);
  addEdge("Garden Town", "Gulberg III", 2, 1.8, 40);
  addEdge("Garden Town", "Model Town", 3, 3.0, 25);
  addEdge("Garden Town", "Yousafabad", 2, 1.5, 45);
  addEdge("Garden Town", "Township", 2, 2.2, 35);

  addEdge("Shalimar Block", "University of Punjab", 2, 2.0, 35);
  addEdge("Shalimar Block", "Kot Lakhpat", 2, 1.5, 45);
  addEdge("Shalimar Block", "Wapda Town", 2, 2.2, 35);
  addEdge("Shalimar Block", "Baroon", 3, 2.5, 30);

  addEdge("Ichra", "Lahore Railway Station", 2, 2.0, 35);
  addEdge("Ichra", "Mall Road", 2, 2.0, 35);
  addEdge("Ichra", "Mozang", 2, 1.8, 40);
  addEdge("Ichra", "Samanabad", 2, 1.5, 45);

  addEdge("Nishtar Town", "Mall Road", 3, 2.5, 30);
  addEdge("Nishtar Town", "Samanabad", 2, 1.8, 40);
  addEdge("Nishtar Town", "Yousafabad", 1, 1.2, 50);
  addEdge("Nishtar Town", "Township", 2, 2.0, 35);

  addEdge("Township", "Garden Town", 2, 2.2, 35);
  addEdge("Township", "Nishtar Town", 2, 2.0, 35);
  addEdge("Township", "Yousafabad", 2, 1.5, 45);
  addEdge("Township", "Johar Town", 3, 2.5, 30);
  addEdge("Township", "Wapda Town", 3, 3.0, 25);

  addEdge("Wapda Town", "Minhaj-ul-Quran International", 3, 2.5, 30);
  addEdge("Wapda Town", "Shalimar Block", 2, 2.2, 35);
  addEdge("Wapda Town", "Model Town", 2, 2.2, 35);
  addEdge("Wapda Town", "Kot Lakhpat", 2, 1.8, 40);
  addEdge("Wapda Town", "Johar Town", 3, 2.5, 30);
  addEdge("Wapda Town", "Lahore Airport (Allama Iqbal)", 5, 4.8, 15);

  addEdge("Johar Town", "Model Town", 4, 3.5, 20);
  addEdge("Johar Town", "Township", 3, 2.5, 30);
  addEdge("Johar Town", "Wapda Town", 3, 2.5, 30);
  addEdge("Johar Town", "Kot Lakhpat", 3, 3.0, 25);

  addEdge("Mughalpura", "Shalimar Gardens", 3, 2.8, 25);
  addEdge("Mughalpura", "Lahore Cantt", 4, 3.5, 20);
  addEdge("Mughalpura", "Baghbanpura", 3, 2.5, 30);
  addEdge("Mughalpura", "Mozang", 3, 3.0, 25);

  addEdge("Mozang", "Lahore Railway Station", 2, 2.2, 35);
  addEdge("Mozang", "Badshahi Mosque", 2, 2.0, 35);
  addEdge("Mozang", "Shalimar Gardens", 4, 3.8, 20);
  addEdge("Mozang", "Lahore Cantt", 3, 2.8, 30);
  addEdge("Mozang", "Ichra", 2, 1.8, 40);
  addEdge("Mozang", "Mughalpura", 3, 3.0, 25);

  addEdge("Baghbanpura", "Shalimar Gardens", 2, 2.0, 35);
  addEdge("Baghbanpura", "Mughalpura", 3, 2.5, 30);
  addEdge("Baghbanpura", "Wahdat Colony", 2, 2.0, 35);
  addEdge("Baghbanpura", "Baroon", 3, 2.8, 25);

  addEdge("Wahdat Colony", "Ferozepur Road", 2, 2.0, 35);
  addEdge("Wahdat Colony", "Baghbanpura", 2, 2.0, 35);
  addEdge("Wahdat Colony", "Baroon", 2, 1.5, 45);
  addEdge("Wahdat Colony", "Mughalpura", 3, 2.8, 25);

  addEdge("Samanabad", "Mall Road", 2, 2.2, 35);
  addEdge("Samanabad", "Anarkali Bazaar", 2, 1.5, 45);
  addEdge("Samanabad", "Ichra", 2, 1.5, 45);
  addEdge("Samanabad", "Nishtar Town", 2, 1.8, 40);
  addEdge("Samanabad", "Yousafabad", 1, 1.2, 50);

  addEdge("Yousafabad", "Lahore Zoo", 2, 1.5, 45);
  addEdge("Yousafabad", "Garden Town", 2, 1.5, 45);
  addEdge("Yousafabad", "Nishtar Town", 1, 1.2, 50);
  addEdge("Yousafabad", "Township", 2, 1.5, 45);
  addEdge("Yousafabad", "Samanabad", 1, 1.2, 50);

  addEdge("Kot Lakhpat", "University of Punjab", 3, 2.8, 25);
  addEdge("Kot Lakhpat", "Shalimar Block", 2, 1.5, 45);
  addEdge("Kot Lakhpat", "Minhaj-ul-Quran International", 3, 3.0, 25);
  addEdge("Kot Lakhpat", "Model Town", 3, 2.5, 30);
  addEdge("Kot Lakhpat", "Wapda Town", 2, 1.8, 40);
  addEdge("Kot Lakhpat", "Johar Town", 3, 3.0, 25);

  addEdge("Baroon", "UET Lahore", 3, 3.0, 25);
  addEdge("Baroon", "Ferozepur Road", 1, 1.2, 50);
  addEdge("Baroon", "Shalimar Block", 3, 2.5, 30);
  addEdge("Baroon", "Baghbanpura", 3, 2.8, 25);
  addEdge("Baroon", "Wahdat Colony", 2, 1.5, 45);
}

// Location coordinates
const locationCoordinates = [
  { name: "UET Lahore", lat: 31.5785, lng: 74.4022 },
  { name: "University of Punjab", lat: 31.5680, lng: 74.4650 },
  { name: "Lahore Railway Station", lat: 31.5712, lng: 74.3042 },
  { name: "Lahore Airport (Allama Iqbal)", lat: 31.5214, lng: 74.4031 },
  { name: "Mall Road", lat: 31.5636, lng: 74.3142 },
  { name: "Anarkali Bazaar", lat: 31.5654, lng: 74.3331 },
  { name: "Minhaj-ul-Quran International", lat: 31.5385, lng: 74.4032 },
  { name: "Shalimar Gardens", lat: 31.5882, lng: 74.3642 },
  { name: "Badshahi Mosque", lat: 31.5883, lng: 74.3104 },
  { name: "Lahore Zoo", lat: 31.5402, lng: 74.3331 },
  { name: "Canal Bank", lat: 31.5736, lng: 74.3592 },
  { name: "Ferozepur Road", lat: 31.5682, lng: 74.3782 },
  { name: "Gulberg III", lat: 31.5454, lng: 74.3952 },
  { name: "Lahore Cantt", lat: 31.5876, lng: 74.3492 },
  { name: "Model Town", lat: 31.5185, lng: 74.4122 },
  { name: "Garden Town", lat: 31.5298, lng: 74.3832 },
  { name: "Shalimar Block", lat: 31.5500, lng: 74.4400 },
  { name: "Ichra", lat: 31.5570, lng: 74.3080 },
  { name: "Nishtar Town", lat: 31.5350, lng: 74.3200 },
  { name: "Township", lat: 31.5100, lng: 74.3500 },
  { name: "Wapda Town", lat: 31.5200, lng: 74.3900 },
  { name: "Johar Town", lat: 31.4950, lng: 74.3700 },
  { name: "Mughalpura", lat: 31.5900, lng: 74.3700 },
  { name: "Mozang", lat: 31.5800, lng: 74.3250 },
  { name: "Baghbanpura", lat: 31.5950, lng: 74.3800 },
  { name: "Wahdat Colony", lat: 31.5850, lng: 74.3850 },
  { name: "Samanabad", lat: 31.5550, lng: 74.3400 },
  { name: "Yousafabad", lat: 31.5400, lng: 74.3500 },
  { name: "Kot Lakhpat", lat: 31.5300, lng: 74.4200 },
  { name: "Baroon", lat: 31.5600, lng: 74.3950 }
];

function getLocationsJson() {
  return { locations: locationCoordinates };
}

function getGraphJson() {
  return { graph };
}

function getGraph() {
  return graph;
}

// Initialize on load
initializeGraph();

export { graph, getGraph, getLocationsJson, getGraphJson, initializeGraph };
