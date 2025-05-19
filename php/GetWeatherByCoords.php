<?php
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$apiKey = "562e305bac3acfa67d2474bc06d59780"; // ganti dengan api key OpenWeathermu
$url = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$apiKey}&units=metric&lang=id";
$response = file_get_contents($url);
echo $response;
?>
