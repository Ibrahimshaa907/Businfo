
const API_URL = "https://lkhhlpngexntgmzxafxn.supabase.co/rest/v1/Buses";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraGhscG5nZXhudGdtenhhZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTYwOTIsImV4cCI6MjA2OTEzMjA5Mn0.viDGnEjR2-eKdwglSF5oqToJI2YPuxIpbR4bVTJ88X0";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

const busList = document.getElementById("bus-list");
const searchInput = document.getElementById("search");

async function fetchBuses() {
  const res = await fetch(API_URL, { headers });
  const buses = await res.json();
  displayBuses(buses);
}

function displayBuses(buses) {
  const query = searchInput.value.toLowerCase();
  busList.innerHTML = "";
  buses
    .filter(bus =>
      bus.From_city.toLowerCase().includes(query) ||
      bus.To_city.toLowerCase().includes(query) ||
      bus.Company.toLowerCase().includes(query) ||
      bus.Stops.toLowerCase().includes(query)
    )
    .forEach(bus => {
      const div = document.createElement("div");
      div.className = "bus-item";
      div.innerHTML = `
        <strong>${bus.From_city} → ${bus.To_city}</strong><br>
        🕒 ${bus.Time} | 🛣️ ${bus.Distance} KM | 🚌 ${bus.Company}<br>
        💰 Rs.${bus.Fare} | 📱 ${bus.Mobile} | 🛑 Stops: ${bus.Stops}
      `;
      busList.appendChild(div);
    });
}

searchInput.addEventListener("input", fetchBuses);
fetchBuses();

function setLanguage(lang) {
  const title = document.getElementById("title");
  if (lang === "ur") {
    title.textContent = "بس تلاش کریں";
    searchInput.placeholder = "شہر، کمپنی یا اسٹاپ تلاش کریں...";
  } else {
    title.textContent = "Find a Bus";
    searchInput.placeholder = "Search by city, company or stop...";
  }
}
