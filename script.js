const supabaseUrl = 'https://lkhhlpngexntgmzxafxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraGhscG5nZXhudGdtenhhZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTYwOTIsImV4cCI6MjA2OTEzMjA5Mn0.viDGnEjR2-eKdwglSF5oqToJI2YPuxIpbR4bVTJ88X0';

const client = supabase.createClient(supabaseUrl, supabaseKey);

async function loadCities() {
  const { data, error } = await client.from('Buses').select('From_city, To_city');

  if (error) {
    console.error(error);
    return;
  }

  const fromSet = new Set();
  const toSet = new Set();

  data.forEach(row => {
    fromSet.add(row.From_city);
    toSet.add(row.To_city);
  });

  const fromCitySelect = document.getElementById('fromCity');
  const toCitySelect = document.getElementById('toCity');

  fromSet.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.text = city;
    fromCitySelect.add(opt);
  });

  toSet.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.text = city;
    toCitySelect.add(opt);
  });
}

async function searchBuses() {
  const fromCity = document.getElementById('fromCity').value;
  const toCity = document.getElementById('toCity').value;

  const { data, error } = await client
    .from('Buses')
    .select('*')
    .eq('From_city', fromCity)
    .eq('To_city', toCity);

  if (error) {
    console.error(error);
    return;
  }

  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = '';

  data.forEach(bus => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bus.From_city}</td>
      <td>${bus.To_city}</td>
      <td>${bus.Time || '-'}</td>
      <td>${bus.Distance || '-'}</td>
      <td>${bus.Fare || '-'}</td>
      <td>${bus.Stops || '-'}</td>
      <td>${bus.Mobile || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById('searchBtn').addEventListener('click', searchBuses);

document.addEventListener('DOMContentLoaded', loadCities);

// Supabase client setup
var supabase = window.supabase = {
  createClient: function(url, key) {
    return supabaseJs.createClient(url, key);
  }
};

// Include supabase-js script
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm';
document.head.appendChild(script);
