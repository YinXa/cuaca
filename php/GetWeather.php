<?php
$city = $_GET['city'];
$apiKey = "562e305bac3acfa67d2474bc06d59780"; // taro api key sini aja
$url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric&lang=id";
$response = file_get_contents($url);
echo $response;
?>
