<?php
// Include the database connection file
include 'connection.php';

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the user's city from the form
    // $cityname = $_GET['usercity'];

    // Get the action from the form (not used in this code)
    // $action = $_GET["action"];

    // Set the default timezone to 'swale'
    // date_default_timezone_set('swale');

    // Get the current date in the 'Y-m-d' format
    $currentDate = date("Y-m-d");

    // Get the date from seven days ago
    $sevenDaysAgo = date("Y-m-d", strtotime("-6 days"));
}

// Display number of rows in "Weather_records" table
$selectquery = "SELECT * FROM Weather_records";
$query = mysqli_query($conn, $selectquery);

if (!$query) {
    die("Query failed: " . mysqli_error($conn));
}

// Get the number of rows from the query result
$nums = mysqli_num_rows($query);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Weather Records</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap">
</head>
<body>
    <!-- Button to go back to the home page -->
    <button style="float: right;"><a href="http://localhost/weather/" class="button" style="text-decoration: none;">Home</a></button>
    <center>
        <h1>Weather Records</h1>
        <!-- Display the number of rows in Weather_records table -->
        <p>Number of rows in Weather_records: <?php echo $nums; ?></p>
        <table border="1px" cellspacing="0" cellpadding="10px">
            <tr>
                <!-- Table header -->
                <th>ID</th>
                <th>Temperature</th>
                <th>City</th>
                <th>Date/Time</th>
                <th>Feels Like</th>
                <th>Humidity</th>
                <th>Pressure</th>
                <th>Speed</th>
                <th>Max Temperature</th>
                <th>Min Temperature</th>
            </tr>
            <?php
            // Retrieve weather records from the database
            $weatherQuery = "SELECT * FROM Weather_records ORDER BY id";
            $weatherSql = mysqli_query($conn, $weatherQuery);

            if ($weatherSql) {
                // Get the number of weather records
                $weatherResult = mysqli_num_rows($weatherSql);

                if ($weatherResult) {
                    // Loop through each weather record and display it in a table row
                    while ($row = mysqli_fetch_array($weatherSql)) {
                        ?>
                        <tr>
                            <!-- Display each attribute of the weather record in a table cell -->
                            <td><?php echo $row['id'] ?></td>
                            <td><?php echo $row['temperature'] ?></td>
                            <td><?php echo $row['city'] ?></td>
                            <td><?php echo $row['storingdatetime'] ?></td>
                            <td><?php echo $row['feels_like'] ?></td>
                            <td><?php echo $row['humidity'] ?></td>
                            <td><?php echo $row['pressure'] ?></td>
                            <td><?php echo $row['speed'] ?></td>
                            <td><?php echo $row['temp_max'] ?></td>
                            <td><?php echo $row['temp_min'] ?></td>
                        </tr>
                        <?php
                    }
                } else {
                    // Display a message if no weather records are found
                    ?>
                    <tr>
                        <td colspan="11">No weather records found</td>
                    </tr>
                    <?php
                }
            } else {
                // Display an error message if the query fails
                die("Query failed: " . mysqli_error($conn)); 
            }
            ?>
        </table>
    </center>
</body>
</html>
