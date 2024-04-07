<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Car Rental System</title>
    <link rel="stylesheet" href="styles.css"/>
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

    
            <form class="searchbar" action="index.php" method="POST">
                    <input type="search" placeholder = "Search Products..." name="search"/>
                    <button type="submit" name="searchSubmit" value="true" style="border: none; background: url('images/search_black_24dp.svg') no-repeat; width: 24px; height: 24px; cursor: pointer;"></button>
                </form>
            </div>

        </div>
    <div class="content">

    <!-- Content -->
</body>
</html>