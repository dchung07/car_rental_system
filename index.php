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
        <div class="header-container">
            <div class="header">
                <div class="logo">
                    <h3>Rent'a'Car</h3>
                    <img src="images/car.png" alt="logo">
                </div>
                <div class="header_middle">
                    <div class="searchbar">
                        <input type="search" placeholder="Search Products..." name="search" id="searchInput" />
                        <button id="submitSearch" type="button" name="searchSubmit" value="true"></button>
                    </div>
                    <div id="suggestions"></div>
                </div>
                <div class="header_right">
                    <!-- <img src="images/book.png" alt=""> -->
                    <h3>Reservations</h3>
                </div>

            </div>
        </div>

        <!-- <div class="category_container">
            <button class="category_selector" value="all">All Cars</button>
            <div id="category_selector_container">
                <select class="category_selector" name="type">
                    <option value="type">Vehicle Types</option>
                </select>
                <select class="category_selector" name="brands">
                    <option value="brands">Vehicle Brands</option>
                </select>
                <select class="category_selector" name="seats">
                    <option value="seats">Seat Count</option>
                </select>
                <select class="category_selector" name="price">
                    <option value="price">Vehicle Price</option>
                </select>
                <select class="category_selector" name="alphabet">
                    <option value="alphabet">Alphabetical Order (A-Z)</option>
                </select>
            </div>
            <div class="category-sub-container">
                <img src="images/filter.png" alt="filter">
                <button class="category_selector" id="show_category_btn">Categories (On/Off)</button>
            </div>
        </div> -->

        <div class="content" id="content">

            <div class="category_bar">

                <div class="category_bar_sub" id="browse_categories_btn">
                    <img src="images/menu.png" alt="">
                    <h3>Browse Categories</h3>
                </div>

                <div class="category_bar_sub" id="browse_all_categories_btn">
                    <img src="images/car1.png" alt="">
                    <h3>All Cars</h3>
                </div>

            </div>

            <div class="content_bottom_row">
                <div class="content-side-bar">
                    <div class="side_bar_panel">
                        <div class="sub_div_side_bar" id="categories_bar">
                            <div class="side_bar_left_side">
                                <img src="images/filter.png" alt="filter">
                                <h3>Categories</h3>
                            </div>
                        </div>
                        <div class="sub_div_side_bar">
                            <div class="side_bar_left_side">
                                <img src="images/palette.png" alt="palette">
                                <h3>Palette</h3>
                            </div>
                        </div>
                        <div class="sub_div_side_bar">
                            <div class="side_bar_left_side">
                                <img src="images/filter.png" alt="filter">
                            </div>
                        </div>
                    </div>
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

        <div class="footer">

            <h3>@2024 Rent'a'Car Pty Ltd</h3>

        </div>

    </div>

</body>

</html>