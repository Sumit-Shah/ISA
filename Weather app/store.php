<?php
$city = $_GET['city']; // Define the city here
$apiKey = '815e5e85907659dda79aa952df3df600';
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey&units=metric";

// Fetch weather data
$weatherData = file_get_contents($apiUrl);
$decodedData = json_decode($weatherData, true);

// Connect to the database
$host = 'localhost';
$dbname = 'weather';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$temperature = $decodedData['main']['temp'];
$feelsLike = $decodedData['main']['feels_like'];
$humidity = $decodedData['main']['humidity'];
$pressure = $decodedData['main']['pressure'];
$windSpeed = $decodedData['wind']['speed'];
$tempMax = $decodedData['main']['temp_max'];
$tempMin = $decodedData['main']['temp_min'];
$icon=$decodedData['weather'][0]['icon'];

// Store weather data in the database
$insertQuery = "INSERT INTO weather_records (city, temperature, feels_like, humidity, pressure, speed, temp_max, temp_min) 
                VALUES ('$city', '$temperature', '$feelsLike', '$humidity', '$pressure', '$windSpeed', '$tempMax', '$tempMin')";

// Execute the INSERT query
if ($conn->query($insertQuery) === TRUE) {
    // Prepare the data to send to JavaScript
    $weatherArray = array(
        "city" => $city,
        "temperature" => $temperature,
        "feelsLike" => $feelsLike,
        "humidity" => $humidity,
        "pressure" => $pressure,
        "windSpeed" => $windSpeed,
        "tempMax" => $tempMax,
        "tempMin" => $tempMin,
        "icon"=>$icon

    );

    // Convert to JSON and echo
    echo json_encode($weatherArray);
} else {
    echo "Error: " . $insertQuery . "<br>" . $conn->error;
}

$conn->close();
?>
