<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "weather";

// Create connection

$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
else
{
    echo "connected sucessfully";
}

?>
