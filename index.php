<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cuacain - Cek Cuaca Harian</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <div id="particles-js"></div>

  <div class="container">
    <header>
      <h1>Cuacain ☀️</h1>
      <p class="subtitle">Cek cuaca dan rekomendasi aktivitas harian</p>
    </header>

    <main>
      <div class="card">
        <button class="toggle-theme" id="theme-toggle">Mode Gelap</button>

<form id="weather-form">
  <input type="text" id="city" placeholder="Masukkan nama kota" required />
  <button type="submit">Cek Cuaca</button>
  <button type="button" id="save-city-btn">Simpan Kota</button>
</form>

<h3>Kota Favorit</h3>
<ul id="favorite-cities"></ul>


        </form>

        <div id="weather-result">
          <!-- Hasil cuaca akan muncul di sini -->
           <div id="loading-spinner" class="hidden">
  <div class="spinner"></div>
        </div>
      </div>
    </main>

<div id="share-buttons" style="margin-top: 20px; display: none;">
  <button id="share-twitter">Share ke Twitter</button>
  <button id="share-whatsapp">Share ke WhatsApp</button>
</div>




    <footer>
      <p>© 2025 Cuacain - Made with ☕</p>
    </footer>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
