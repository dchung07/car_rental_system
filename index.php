<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Car Rental System</title>
    <link rel="stylesheet" href="styles.css" />
    <script src="index.js" defer></script>
</head>

<?php
// session_start();

//     if (!isset($_SESSION['current_cart'])) {
//         $_SESSION['current_cart'] = null;
//     }

//     if (isset($_POST['carDetails'])) {

//         $carDetailsJson = $_POST['carDetails'];

//         $carDetails = json_decode($carDetailsJson, true);

//         $carId = $carDetails['carId'];
//         $carType = $carDetails['type'];
//         $carBrand = $carDetails['brand'];
//         $carModel = $carDetails['model'];
//         $carImage = $carDetails['image'];
//         $carMileage = $carDetails['mileage'];
//         $carFuelType = $carDetails['fuel_type'];
//         $carSeats = $carDetails['seats'];
//         $carQuantity = $carDetails['quantity'];
//         $pricePerDay = $carDetails['pricePerDay'];
//         $carDescription = $carDetails['description'];

//         //Users quantity selected
//         $selectedQuantity = 1;

//         $cartItem = [
//             'carType' => $carType,
//             'carBrand' => $carBrand,
//             'carModel' => $carModel,
//             'carImage' => $carImage,
//             'carMileage' => $carMileage,
//             'carFuelType' => $carFuelType,
//             'carSeats' => $carSeats,
//             'carQuantity' => $carQuantity,
//             'selectedQuantity' => $selectedQuantity,
//             'pricePerDay' => $pricePerDay,
//             'carDescription' => $carDescription
//         ];

//         $_SESSION['current_cart'] = $cartItem;

//     } 

?>

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
                        <input type="search" placeholder="Search Products..." name="search" id="searchInput" autocomplete="off"/>
                        <button id="submitSearch" type="button" name="searchSubmit" value="true"></button>
                    </div>

                    <div id="suggestions">
                        <h4 id="suggestions_title">Recent Searches</h4>

                    </div>

                </div>
                
                <div class="header_right" id="reservation">
                    <img src="images/book.png" alt="">
                    <h3>Reservations</h3>
                </div>

            </div>
        </div>

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
                <!-- <div class="content-side-bar">
                    <div class="side_bar_panel">
                        <div class="sub_div_side_bar" id="categories_bar">
                            <div class="side_bar_left_side">
                                <img src="images/filter.png" alt="filter">
                                <h3>Categories</h3>
                            </div>
                        </div>
                        <div class="sub_div_side_bar">
                            <div class="side_bar_left_side" id = "palette">
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
                </div> -->
                <div class="card-container" id="cardContainer">
                    <?php
                    $carsJson = file_get_contents('cars.json');
                    $cars = json_decode($carsJson, true);
                    foreach ($cars as $car) {
                        if ($car['availability'] == 'true' &&  $car['quantity'] != '0') {
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
                                    echo '<p>' . $car['description'] . '</p>';
                                    echo '<button class="addToCartBtn" onclick="addReservation(event)">RENT</button>';
                                    echo '<input type="hidden" value="' . $car['id'] . '"/>';
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
                            echo '<p>' . $car['description'] . '</p>';
                            echo '<button class="unavailable_addToCartBtn" disabled>NOT AVAILABLE</button>';
                            
                            echo '</div>';
                            echo '</div>';
                        }
                    }
                    ?>
                </div>
            </div>
        </div>

            <div class="reservation_modal">
                    <div class="reservation_modal_title_container">
                        <h3>Your Reservations</h3>
                        <img class="reservation_close_btn" src="images/close.png" alt="Close Icon">
                    </div>
                    <div class="reservation_modal_content_container">
                        <div class="current_reservation">

                        </div>

                        <!-- <div class="reservation_order_details">
                            <div class="reservation_order_details_quantity_container">
                                <label for="car_quantity">Quantity to Rent: </label>
                                <input type="number" id="car_quantity" placeholder="How many...?" min="1" required>
                            </div>
                            <div class="reservation_order_details_date_container">
                                <label for="start_date">Start date: </label>
                                <input type="date" id="start_date" required>
                                <label for="end_date">End date: </label>
                                <input type="date" id="end_date" required>
                            </div>
                            <div class="user_details_form">
                                <label for="first_name">First Name: </label>
                                <input type="text" id="first_name" placeholder="Tom" required>
                                <label for="last_name">Last Name: </label>
                                <input type="text" id="last_name" placeholder="Smith" required>
                            </div>
                            <div class="user_details_form">
                                <label for="phone">Phone Number: </label>
                                <input type="phone" id="phone" placeholder="0407398761" required>
                                <label for="email">email: </label>
                                <input type="email" id="email" placeholder="Tom@gmail.com" required>
                            </div>
                            <div class="user_details_form">
                                <label for="valid_drivers_license">Do you have a valid drivers license?: </label>
                                <input type="checkbox" id="valid_drivers_license" required>
                            </div>
                        </div> -->

                        <div class="reservation_order_details">

                                <form action="index.php" method="POST" id="order_form">
                                    <div class="sub_form">
                                        <label for="car_quantity">Quantity to Rent: </label>
                                        <input type="number" id="car_quantity" placeholder="How many...?" min="1" value="1" required>
                                    </div>
                                    <div class="error" id="quantity_error"></div>

                                    <div class="sub_form">
                                        <label for="start_date">Start date: </label>
                                        <input type="date" id="start_date" required>
                                    </div>
                                    <div class="error"></div>

                                    <div class="sub_form">
                                        <label for="end_date">End date: </label>
                                        <input type="date" id="end_date" required>
                                    </div>
                                    <div class="error"></div>

                                    <div class="sub_form">
                                        <label for="first_name">First Name: </label>
                                        <input type="text" id="first_name" placeholder="Tom" required>
                                    </div>
                                    <div class="error" id="first_name_error"></div>

                                    <div class="sub_form">
                                        <label for="last_name">Last Name: </label>
                                        <input type="text" id="last_name" placeholder="Smith" required> 
                                    </div>
                                    <div class="error" id="last_name_error"></div>

                                    <div class="sub_form">
                                        <label for="phone">Phone Number: </label>
                                        <input type="phone" id="phone" placeholder="0407398761" required>
                                    </div>
                                    <div class="error" id="phone_error"></div>

                                    <div class="sub_form">
                                        <label for="email">email: </label>
                                        <input type="email" id="email" placeholder="Tom@gmail.com" required>
                                    </div>
                                    <div class="error" id="email_error"></div>

                                    <div class="sub_form_check">
                                        <label for="valid_drivers_license">Do you have a valid drivers license?: </label>
                                        <input type="checkbox" id="valid_drivers_license" required>
                                    </div>
                                    <div class="error" id="checkbox_error"></div>

                                </form>

                        </div>

                    </div>
                    <div class="reservation_modal_footer_container">
                        <div class="remove_button">
                            <button id="reservation_remove_button">CANCEL</button>
                        </div>
                        <h5>Order Summary</h5>
                        <div class="checkout-container">
                            <h5 id="total_rental_cost">Total Rental Cost: </h5>
                            <button id="place_order_btn">PLACE ORDER</button>
                        </div>    
                    </div>
            </div>
            <div class="reservation_modal_underlay">
            </div>

        <div class="footer">

            <h3>@2024 Rent'a'Car Pty Ltd</h3>

        </div>

        <div class="order_modal">
            <div class="order_modal_title_container">
                <h3>Confirm Order By Clicking Link</h3>
                <img id="order_modal_close" class="reservation_close_btn" src="images/close.png" alt="Close Icon">
            </div>
            <div class="order_link">
                <h5>Click Here to Confirm Order</h5>
            </div>
        </div>
        <div class="order_modal_underlay">

        </div>

    </div>

</body>

</html>