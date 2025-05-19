// Particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    size: { value: 3 },
    color: { value: "#ffffff" },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
});

const resultDiv = document.getElementById("weather-result");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function cekCuacaEkstrim(kondisi) {
  const ekstrimList = [
    "Thunderstorm",
    "Tornado",
    "Squall",
    "Ash",
    "Sand",
    "Dust",
    "Extreme",
    "Heavy Rain",
    "Heavy Snow",
  ];
  for (let ek of ekstrimList) {
    if (kondisi.toLowerCase().includes(ek.toLowerCase())) {
      return true;
    }
  }
  return false;
}

function renderWeather(data, lokasi) {
  if (data.cod && data.cod !== 200) {
    resultDiv.innerHTML = `<p>Kota tidak ditemukan atau error cuy 😵</p>`;
    shareButtons.style.display = 'none'; // sembunyiin tombol share kalau error
    return;
  }

  const suhu = data.main.temp;
  const kondisi = data.weather[0].description.toLowerCase();

  let rekomendasi = "";
  if (kondisi.includes("hujan")) {
    rekomendasi = "Bawa payung dan jangan lupa jaket ya ☔";
  } else if (kondisi.includes("cerah")) {
    rekomendasi = "Cuaca cerah, asik buat jalan-jalan atau olahraga di luar 🌞";
  } else if (kondisi.includes("berawan") || kondisi.includes("mendung")) {
    rekomendasi = "Cuaca agak mendung, siap-siap ya!";
  } else if (kondisi.includes("petir")) {
    rekomendasi = "Bahaya! Jangan keluar rumah kalau ada petir ⚡";
  } else {
    rekomendasi = "Cek terus cuaca, biar gak kaget!";
  }

  const ekstrim = cekCuacaEkstrim(data.weather[0].main);

  resultDiv.innerHTML = `
    <h2>Cuaca di ${lokasi}</h2>
    <p>Suhu: ${suhu}°C</p>
    <p>Kondisi: ${data.weather[0].description}</p>
    <p>Rekomendasi: ${rekomendasi}</p>
    ${ekstrim ? `<p style="color:#ff4444; font-weight:bold;">⚠️ Waspada cuaca ekstrim!</p>` : ""}
  `;

  updateShareButtons(lokasi, suhu, data.weather[0].description, rekomendasi);
}


function fetchWeatherByCoords(lat, lon) {
  resultDiv.innerHTML = `<p>Loading cuaca dari lokasi kamu...</p>`;
  fetch(`php/getWeatherByCoords.php?lat=${lat}&lon=${lon}`)
    .then((res) => res.json())
    .then((data) => renderWeather(data, "lokasi kamu"))
    .catch(() => {
      resultDiv.innerHTML = `<p>Gagal dapat data cuaca dari lokasi kamu 😵</p>`;
    });
}

window.onload = function () {
  // Load tema dari localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggleBtn.textContent = "Mode Terang";
  } else {
    themeToggleBtn.textContent = "Mode Gelap";
  }

  // Minta akses lokasi dan fetch
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        resultDiv.innerHTML = `<p>Lokasi gak diijinin, coba cari cuaca manual di bawah ya!</p>`;
      }
    );
  } else {
    resultDiv.innerHTML = `<p>Browser kamu gak support geolocation, pakai input manual ya!</p>`;
  }
};

// Toggle tema
themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  if (body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "Mode Terang";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleBtn.textContent = "Mode Gelap";
    localStorage.setItem("theme", "light");
  }
});

// Form input kota manual
document.getElementById("weather-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (!city) return;
  resultDiv.innerHTML = `<p>Loading cuaca buat ${city}...</p>`;

  fetch(`php/getWeather.php?city=${city}`)
    .then((res) => res.json())
    .then((data) => renderWeather(data, city))
    .catch(() => {
      resultDiv.innerHTML = `<p>Error ambil data, coba lagi ya 😵</p>`;
    });
});
const saveCityBtn = document.getElementById('save-city-btn');
const favCitiesList = document.getElementById('favorite-cities');

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
  favCitiesList.innerHTML = '';

  favorites.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      document.getElementById('city').value = city;
      document.getElementById('weather-form').dispatchEvent(new Event('submit'));
    });
    favCitiesList.appendChild(li);
  });
}

saveCityBtn.addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  if(!city) return alert('Isi nama kota dulu dong!');

  let favorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];

  if(!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    loadFavorites();
    alert(`${city} berhasil disimpan!`);
  } else {
    alert(`${city} sudah ada di favorit!`);
  }
});

loadFavorites();
const spinner = document.getElementById('loading-spinner');
const weatherResult = document.getElementById('weather-result');

function showLoading() {
  spinner.classList.remove('hidden');
  weatherResult.style.display = 'none';
}

function hideLoading() {
  spinner.classList.add('hidden');
  weatherResult.style.display = 'block';
}

// Contoh modifikasi saat fetch:
showLoading();

fetch('...api...')
  .then(res => res.json())
  .then(data => {
    // proses data ...
    hideLoading();
    weatherResult.innerHTML = '...hasil cuaca...';
  })
  .catch(err => {
    hideLoading();
    weatherResult.innerHTML = '<p>Error ambil data</p>';
  });
const shareButtons = document.getElementById('share-buttons');
const btnTwitter = document.getElementById('share-twitter');
const btnWhatsapp = document.getElementById('share-whatsapp');

function updateShareButtons(city, suhu, kondisi, rekomendasi) {
  shareButtons.style.display = 'block';

  const textToShare = encodeURIComponent(
    `Cuaca di ${city}: ${suhu}°C, ${kondisi}. Rekomendasi: ${rekomendasi} #Cuacain`
  );

  btnTwitter.onclick = () => {
    const url = `https://twitter.com/intent/tweet?text=${textToShare}`;
    window.open(url, '_blank');
  };

  btnWhatsapp.onclick = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${textToShare}`;
    window.open(waUrl, '_blank');
  };
}
