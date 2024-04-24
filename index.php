<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Car Rental System</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="index.js" defer></script>
</head>

<body>
    <!-- Header -->
    <div class="container">
        <div class="header">

            <div class="logo">
                <h3>Rent'a'Car</h3>
                <img src="images/car.png" alt="logo">
            </div>

            <div class="header_middle">

                <form class="categoryForm" method="POST" onchange="submitForm()">
                    <select class="categoryDropdown" name="categoryDropdown" id="category">
                        <option value="Category">Category</option>
                        <option value="Fruit">Toyota</option>
                        <option value="Drinks">Hyundai</option>
                        <option value="Meat">Tesla</option>
                    </select>
                </form>


                <div class="searchbar">
                    <input type="search" placeholder="Search Products..." name="search" id="searchInput" />
                    <button id="submitSearch" type="button" name="searchSubmit" value="true"
                        style="border: none; background: url('images/search_black_24dp.svg') no-repeat; width: 24px; height: 24px; cursor: pointer;"></button>
                </div>

                <div id="suggestions"></div>

            </div>

            <img src="images/booking.png" alt="">

        </div>

        <div class="content">

            <div class="category_container">
                <button>All Cars</button>
                <select>Brands</select>
                <select>Car Type</select>
                <select></select>
            </div>


            <div class="card-container" id="cardContainer">
                <?php
                $carsJson = file_get_contents('cars.json');
                $cars = json_decode($carsJson, true);
                foreach ($cars as $car) {
                    if ($car['availability'] == 'true') {
                        echo '<div class="card">';

                        echo '<div class="car-image">';
                        echo '<img src="car_images/' . $car['image'] . '" alt="' . $car['brand'] . "image" . ' ' . $car['model'] . '">';
                        echo '</div>';

                        echo '<div class="car-details">';
                        echo '<h3>' . $car['brand'] . ' ' . $car['model'] . '</h3>';
                        echo '<p>Type: ' . $car['type'] . '</p>';
                        echo '<p>Mileage: ' . $car['mileage'] . '</p>';
                        echo '<p>Fuel Type: ' . $car['fuel_type'] . '</p>';
                        echo '<p>Seats: ' . $car['seats'] . '</p>';
                        echo '<p>Price per Day: $' . $car['price_per_day'] . '</p>';
                        echo '<p>Description: ' . $car['description'] . '</p>';
                        echo '<button class="addToCartBtn">Rent</button>';

                        echo '</div>';

                        echo '</div>';
                    } else {
                        echo '<div class="unavailable_card">';
                        echo '<div class="car-image">';
                        echo '<img src="car_images/' . $car['image'] . '" alt="' . $car['brand'] . "image" . ' ' . $car['model'] . '">';
                        echo '</div>';
                        echo '<div class="car-details">';
                        echo '<h3>' . $car['brand'] . ' ' . $car['model'] . '</h3>';
                        echo '<p>Type: ' . $car['type'] . '</p>';
                        echo '<p>Mileage: ' . $car['mileage'] . '</p>';
                        echo '<p>Fuel Type: ' . $car['fuel_type'] . '</p>';
                        echo '<p>Seats: ' . $car['seats'] . '</p>';
                        echo '<p>Price per Day: $' . $car['price_per_day'] . '</p>';
                        echo '<p>Description: ' . $car['description'] . '</p>';
                        echo '<button class="unavailable_addToCartBtn" disabled>Not Available</button>';
                        echo '</div>';
                        echo '</div>';
                    }
                }
                ?>
            </div>
        </div>
    </div>

</body>

</html>