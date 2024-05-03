// document.getElementById('searchInput').addEventListener('input', searchFilter);
document.getElementById('submitSearch').addEventListener('click', searchFilter);

//When focused search
let suggestions = document.getElementById('suggestions');
document.getElementById('searchInput').addEventListener('focus', function() {

    suggestions.style.display = "block";
});

document.getElementById('searchInput').addEventListener('blur', function() {

    suggestions.style.display = "none";
});



function test(event) {
    console.log(event.target.parentElement.children[8].value);
}

//Opening Reservation Modal (Non DOM Generated)
let reservationBtn = document.getElementById('reservation');
reservationBtn.addEventListener('click', openReservation);



//When 'Rent' button is clicked addReservation
// function addReservation(event) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "index.php", true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             openReservation();
//         }
//     };

//     //Get the car Id and then go through the JSON file of cars.json to find the rest of the car details and then send it to php to add it to the cart session.

//     let carId = event.target.parentElement.children[8].value;
//     var carsRequest = new XMLHttpRequest();
//     carsRequest.overrideMimeType("application/json");
//     carsRequest.open('GET', 'cars.json', true);
//     carsRequest.onreadystatechange = function () {
//         if (carsRequest.readyState === 4 && carsRequest.status === 200) {
//             var carsData = JSON.parse(carsRequest.responseText);

//             var selectedCar = carsData.find(car => car.id === parseInt(carId));

//             if (selectedCar) {
//                 var carDetails = {
//                     carId: selectedCar.id,
//                     type: selectedCar.type,
//                     brand: selectedCar.brand,
//                     model: selectedCar.model,
//                     image: selectedCar.image,
//                     mileage: selectedCar.mileage,
//                     fuel_type: selectedCar.fuel_type,
//                     seats: selectedCar.seats,
//                     quantity: selectedCar.quantity,
//                     pricePerDay: selectedCar.price_per_day,
//                     description: selectedCar.description
//                 };

//                 var formData = "carDetails=" + encodeURIComponent(JSON.stringify(carDetails));

//                 xhr.send(formData);
//             } else {

//             }
//         }
//     };
//     carsRequest.send(null);
// }

function openReservation() {

    let reservation_modal = document.querySelector('.reservation_modal');
    let reservation_modal_underlay = document.querySelector('.reservation_modal_underlay');
    let cardContainer = document.getElementById('cardContainer');
    let current_reservation = document.querySelector('.current_reservation');
    let old_reservation = document.querySelector('.old_reservation');

    reservation_modal.style.display = "flex";
    reservation_modal.style.flexDirection = "column";
    reservation_modal_underlay.style.display = "block";
    document.body.style.overflow = "hidden";/*  */
    cardContainer.style.zIndex = "999";

    let reservation_close_btn = document.querySelector('.reservation_close_btn');
    reservation_close_btn.addEventListener('click', function () {
        closeReservationModal();
    });

    function closeReservationModal() {
        reservation_modal.style.display = "none";
        reservation_modal_underlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.addEventListener('click', function (event) {
        if (event.target == reservation_modal_underlay) {
            closeReservationModal();
        }
    });
    // let total_rental_cost = document.getElementById('total_rental_cost');
    // total_rental_cost.textContent = "Total Rental Cost: $" + rental_cost;


    function createReservationCard(reservation) {
        let reservationCard = document.createElement('div');
        reservationCard.classList.add('reservation_card');

        let image = document.createElement('img');
        image.src = "car_images/" + reservation.image;
        image.style.width = "250px";
        image.style.height = "250px";
        reservationCard.appendChild(image);

        let details = document.createElement('div');
        details.classList.add('reservation_details');

        let sub_details = document.createElement('div');
        sub_details.classList.add('reservation_sub_details');

        let title = document.createElement('h3');
        title.textContent = `${reservation.brand} ${reservation.model}`;
        details.appendChild(title);

        let type = document.createElement('p');
        type.textContent = `Type: ${reservation.type}`;
        sub_details.appendChild(type);

        let mileage = document.createElement('p');
        mileage.textContent = `Mileage: ${reservation.mileage}`;
        sub_details.appendChild(mileage);

        let price = document.createElement('p');
        price.textContent = `Price per Day: $${reservation.pricePerDay}`;
        sub_details.appendChild(price);




        reservationCard.appendChild(details);
        reservationCard.appendChild(sub_details);
        return reservationCard;
    }

    let currentReservation = JSON.parse(localStorage.getItem('current_reservation'));

    if (currentReservation) {

        let reservation_remove_button = document.getElementById('reservation_remove_button');
        reservation_remove_button.style.opacity = "1";
        reservation_remove_button.style.cursor = "pointer";
        reservation_remove_button.disabled = false;

        current_reservation.innerHTML = '';

        let currentReservationCard = createReservationCard(currentReservation);

        current_reservation.appendChild(currentReservationCard);

        //Logic for calculating Total Price 

        //Set the car quantity selection to have a max quantity to however many cars it has in stock.
        let car_quantity = document.getElementById('car_quantity');
        car_quantity.setAttribute('max', currentReservation.quantity);

        //Check what the current value of the car quantity selection is
        let updatedValue
        car_quantity.addEventListener('input', function (event) {
            updatedValue = event.target.value;

            totalRentalCost();
        });

        //Get the start date

        let start_date = document.getElementById('start_date');
        // let today = new Date().toISOString().split('T')[0];
        let today = new Date().toISOString().split('T')[0];

        start_date.setAttribute('min', today);

        let user_selected_start_date;



        //Get the unformatted today date so we can create tommorow and make the min attribute of end_date to tommorow

        let todayUnformatted = new Date();
        let tommorow = addDays(todayUnformatted, 1);

        let tommorowFormatted = tommorow.toISOString().split('T')[0];

        //Get the end date

        let end_date = document.getElementById('end_date');
        end_date.setAttribute('min', tommorowFormatted);

        let user_selected_end_date;

        let differenceDays;

        let total_rental_cost = document.getElementById('total_rental_cost');

        start_date.addEventListener('input', function () {

            user_selected_start_date = start_date.value;

            //inputting the start date should set the min date value + 1 for the end_date

            let user_selected_start_date_object = new Date(user_selected_start_date);
            user_selected_start_date_object.setDate(user_selected_start_date_object.getDate() + 1);
            let user_selected_start_date_object_formatted = user_selected_start_date_object.toISOString().split('T')[0];

            end_date.setAttribute('min', user_selected_start_date_object_formatted);

            totalRentalCost();

        });

        end_date.addEventListener('input', function () {

            user_selected_end_date = end_date.value;
            console.log(typeof user_selected_end_date);

            //Likewise setting the end date should set the max to be the end date - 1 day for the start_date

            let maxDay = minusDays(user_selected_end_date, 1);

            start_date.setAttribute('max', maxDay.toISOString().split('T')[0]);

            totalRentalCost();

        });

        //Function to change text content of total rental cost
        function totalRentalCost() {
            if (end_date.value !== '' && start_date.value !== '') {
                differenceDays = differenceInDays(user_selected_start_date, user_selected_end_date);

                //Check if updatedValue is set (user selection for car quantity)
                if (!isNaN(updatedValue)) {
                    let rental_cost = differenceDays * updatedValue * currentReservation.pricePerDay;
                    total_rental_cost.textContent = "Total Rental Cost: $" + rental_cost;
                } else {
                    let rental_cost = differenceDays * 1 * currentReservation.pricePerDay;
                    total_rental_cost.textContent = "Total Rental Cost: $" + rental_cost;
                }
            }
        }

        //Function to add to the days (used to get tommorow)
        function addDays(date, days) {
            let result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        //Function to minus the days (used to find the max day possible for a start date)
        function minusDays(date, days) {
            let result = new Date(date);
            result.setDate(result.getDate() - days);
            return result;
        }


        function parseDate(dateString) {
            let components = dateString.split('-');
            let year = parseInt(components[0], 10) + 2000;
            let month = parseInt(components[1], 10) - 1;
            let day = parseInt(components[2], 10);

            return new Date(year, month, day);
        }


        function differenceInDays(start, end) {
            let date1 = parseDate(start);
            let date2 = parseDate(end);

            let differenceInMilli = date2 - date1;
            let differenceInDays = differenceInMilli / (1000 * 60 * 60 * 24);
            return differenceInDays;
        }

        //Find out the difference in days between the end date and the start date ONLY if both start and end date are set
        // if(end_date.value !== '' && start_date.value !== '') {
        //     console.log(differenceInDays(user_selected_start_date, user_selected_end_date));
        // }


        //If user quantity input (updatedValue) and the difference of the end date and start date has been calculated, then proceed to calculate the cost
        // if()




    } else {
        //In the case that there is no currentReservation then we should show something else...

        let reservation_remove_button = document.getElementById('reservation_remove_button');
        reservation_remove_button.style.opacity = "0.3";
        reservation_remove_button.style.cursor = "not-allowed";
        reservation_remove_button.disabled = true;

        let current_reservation = document.querySelector('.current_reservation');
        current_reservation.innerHTML = '';
        let reservation_modal = document.querySelector('.reservation_modal');
        let currentReservationCard = document.createElement('div');
        currentReservationCard.textContent = "Nothing here...";
        currentReservationCard.style.display = "flex";
        currentReservationCard.style.justifyContent = "center";
        currentReservationCard.style.alignItems = "center";
        currentReservationCard.style.height = "100dvh";
        current_reservation.appendChild(currentReservationCard);

        // console.log(localStorage.getItem('current_reservation'));
    }

}

let reservation_remove_button = document.getElementById('reservation_remove_button');
reservation_remove_button.addEventListener('click', function () {

    // let cart = localStorage.getItem('current_reservation');
    // console.log("hi");
    // console.log(cart);
    localStorage.removeItem('current_reservation');
    let total_rental_cost = document.getElementById('total_rental_cost');
    total_rental_cost.textContent = "Total Rental Cost: ";

    //Should also reset the values of the inputs of date, and quantity
    let start_date = document.getElementById('start_date');
    let end_date = document.getElementById('end_date');
    let car_quantity = document.getElementById('car_quantity');

    start_date.value = '';
    end_date.value = '';
    car_quantity.value = '';

    // console.log(cart);
    // let reservation_modal_content_container_container = document.getQuerySelector('.reservation_modal_content_container_container');
    // reservation_modal_content_container_container.innerHTML = '';

    openReservation();

});


function addReservation(event) {
    let carId = event.target.parentElement.children[8].value;

    let carsRequest = new XMLHttpRequest();
    carsRequest.overrideMimeType("application/json");
    carsRequest.open('GET', 'cars.json', true);
    carsRequest.onreadystatechange = function () {
        if (carsRequest.readyState === 4 && carsRequest.status === 200) {
            let carsData = JSON.parse(carsRequest.responseText);
            let selectedCar = carsData.find(car => car.id === parseInt(carId));

            if (selectedCar) {
                let carDetails = {
                    carId: selectedCar.id,
                    type: selectedCar.type,
                    brand: selectedCar.brand,
                    model: selectedCar.model,
                    image: selectedCar.image,
                    mileage: selectedCar.mileage,
                    fuel_type: selectedCar.fuel_type,
                    seats: selectedCar.seats,
                    quantity: selectedCar.quantity,
                    pricePerDay: selectedCar.price_per_day,
                    description: selectedCar.description
                };

                localStorage.setItem('current_reservation', JSON.stringify(carDetails));
                console.log(localStorage.getItem('current_reservation'));
                openReservation();
            } else {

            }
        }
    };
    carsRequest.send(null);
}




function disabledCardGeneratorFunc(car) {
    cardHtml = `
    <div class="unavailable_card">
        <div class="car-image">
            <img src="car_images/${car.image}" alt="${car.brand} ${car.model}">
        </div>
        <div class="car-details">
            <h3>${car.brand} ${car.model}</h3>
            <p>Type: ${car.type}</p>
            <p>Mileage: ${car.mileage}</p>
            <p>Fuel Type: ${car.fuel_type}</p>
            <p>Seats: ${car.seats}</p>
            <p>Price per Day: $${car.price_per_day}</p>
            <p>${car.description}</p>
            <button class="unavailable_addToCartBtn" disabled>NOT AVAILABLE</button>
        </div>
    </div>
`;
}

function cardGeneratorFunc(car) {
    cardHtml = `
    <div class="card">
        <div class="car-image">
            <img src="car_images/${car.image}" alt="${car.brand} ${car.model}">
        </div>
        <div class="car-details">
            <h3>${car.brand} ${car.model}</h3>
            <p>Type: ${car.type}</p>
            <p>Mileage: ${car.mileage}</p>
            <p>Fuel Type: ${car.fuel_type}</p>
            <p>Seats: ${car.seats}</p>
            <p>Price per Day: $${car.price_per_day}</p>
            <p>${car.description}</p>
            <button class="addToCartBtn" onclick="addReservation(event)">RENT</button>
            <input type="hidden" value="${car.id}"/>
        </div>
    </div>
`;
}

//Click on all Cars button to retrieve all cars

let browse_all_categories_btn = document.getElementById('browse_all_categories_btn');

browse_all_categories_btn.addEventListener('click', function () {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
                const carsData = JSON.parse(xhttp.responseText);

                cardContainer.textContent = '';

                carsData.forEach(car => {

                    if (car.availability === false) {
                        // let cardHtml = '';
                        disabledCardGeneratorFunc(car);
                    } else {
                        // let cardHtml = '';
                        cardGeneratorFunc(car);
                    }
                    cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                });

            }
        }
    };

    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
});

function cardGeneration() {

}

let browse_categories_btn = document.getElementById("browse_categories_btn");

browse_categories_btn.addEventListener('click', function () {
    let category_main_modal = document.createElement('div');
    let category_main_modal_title = document.createElement('h3');
    let category_main_modal_close_img = document.createElement('img');
    let category_main_modal_title_container = document.createElement('div');
    let category_main_modal_content_container = document.createElement('div');
    let category_main_modal_content_container_container = document.createElement('div');
    let modal_underlay = document.createElement('div');

    function closeMainModal() {
        document.body.removeChild(category_main_modal);
        document.body.removeChild(modal_underlay);
        document.body.style.overflow = "auto";
    }

    window.addEventListener('click', function (event) {
        if (event.target == modal_underlay) {
            closeMainModal();
        }
    });


    //Modal img (Close)
    category_main_modal_close_img.src = "images/close.png";
    category_main_modal_close_img.style.width = "20px";
    category_main_modal_close_img.style.height = "20px";

    category_main_modal_close_img.addEventListener('click', function () {
        closeMainModal();
    });


    // Modal title (h3)
    category_main_modal_title.textContent = "Browse Categories";

    //Main category modal
    category_main_modal.style.zIndex = "2147483647";
    category_main_modal.style.position = "fixed";
    category_main_modal.style.backgroundColor = "white";
    category_main_modal.style.width = "400px";
    category_main_modal.style.height = "100%";


    //Container for modal title and img
    category_main_modal_title_container.style.display = "flex";
    category_main_modal_title_container.style.justifyContent = "space-between";
    category_main_modal_title_container.style.padding = "2rem";

    //Container for content of modal
    category_main_modal_content_container.style.display = "flex";
    category_main_modal_content_container.style.flexDirection = "column";
    category_main_modal_content_container.style.gap = "1rem";
    category_main_modal_content_container.style.width = "400px";

    //Modal underlay
    modal_underlay.style.zIndex = "2147483646";
    modal_underlay.style.position = "fixed";
    modal_underlay.style.backgroundColor = "grey";
    modal_underlay.style.opacity = "0.8";
    modal_underlay.style.width = "100%";
    modal_underlay.style.height = "100%";

    let cardContainer = document.getElementById('cardContainer');
    cardContainer.style.zIndex = "2147483645";


    //Prevent Scrolling
    document.body.style.overflow = "hidden";

    category_main_modal_title_container.appendChild(category_main_modal_title);
    category_main_modal_title_container.appendChild(category_main_modal_close_img);

    function appendSubContainer(btnText) {
        let category_main_modal_content_sub_container = document.createElement('div');
        let variableBtn = document.createElement('h3');
        let category_main_modal_arrow_img = document.createElement('img');

        //Modal arrow
        category_main_modal_arrow_img.src = "images/right_arrow.png";
        category_main_modal_arrow_img.style.width = "20px";
        category_main_modal_arrow_img.style.height = "20px";

        //Buttons
        variableBtn.textContent = btnText;
        variableBtn.classList = "modal_category_button";

        //Sub category container
        category_main_modal_content_sub_container.style.display = "flex";
        category_main_modal_content_sub_container.style.justifyContent = "space-between";
        category_main_modal_content_sub_container.style.padding = "1rem";
        category_main_modal_content_sub_container.style.alignItems = "center";
        category_main_modal_content_sub_container.classList = "category_main_modal_content_sub_container";

        //
        category_main_modal_content_container_container.style.width = "100%";

        category_main_modal_content_sub_container.appendChild(variableBtn);
        category_main_modal_content_sub_container.appendChild(category_main_modal_arrow_img);
        category_main_modal_content_container.appendChild(category_main_modal_content_sub_container);
        category_main_modal_content_container_container.appendChild(category_main_modal_content_container);
        category_main_modal.appendChild(category_main_modal_content_container_container);

    }


    category_main_modal.appendChild(category_main_modal_title_container);
    appendSubContainer("Brand");
    appendSubContainer("Type");
    appendSubContainer("Seats");
    appendSubContainer("Fuel Type");
    appendSubContainer("Price Per Day");
    document.body.appendChild(category_main_modal);
    document.body.appendChild(modal_underlay);

    const sub_container_buttons = document.querySelectorAll('.category_main_modal_content_sub_container');

    let currentContent = "";

    sub_container_buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (category_main_modal.style.width !== "1000px") {
                category_main_modal.style.width = "1000px";

                let container = button.closest('.category_main_modal_content_sub_container');
                currentContent = container.textContent;

                if (container) {
                    let containerTextContent = container.textContent.trim();
                    let category_sub_modal_title_container = document.createElement('div');
                    let category_sub_modal_content_container = document.createElement('div');
                    let category_sub_modal_title = document.createElement('h3');

                    category_sub_modal_title.textContent = containerTextContent;
                    category_sub_modal_title.style.marginLeft = "1rem";
                    category_sub_modal_content_container.classList = "category_sub_modal_content_container";
                    category_sub_modal_content_container.style.display = "flex";
                    category_sub_modal_content_container.style.flexDirection = "column";
                    category_sub_modal_content_container.style.alignItems = "stretch";
                    category_sub_modal_content_container.style.width = "600px";

                    category_sub_modal_title_container.style.display = "flex";
                    category_sub_modal_title_container.style.justifyContent = "center";
                    category_sub_modal_title_container.style.marginBottom = "1rem";


                    //JSON
                    const xhttp = new XMLHttpRequest();

                    xhttp.onreadystatechange = function () {
                        if (xhttp.readyState === XMLHttpRequest.DONE) {
                            if (xhttp.status === 200) {
                                const carsData = JSON.parse(xhttp.responseText);

                                const uniqueBrands = new Set();
                                const uniqueType = new Set();
                                const uniqueSeats = new Set();
                                const uniqueFuels = new Set();
                                const uniquePrice = new Set();
                                const uniqueAvailability = new Set();

                                carsData.forEach(car => {
                                    uniqueBrands.add(car.brand);
                                    uniqueType.add(car.type);
                                    uniqueSeats.add(car.seats);
                                    uniqueFuels.add(car.fuel_type);
                                    uniquePrice.add(car.price_per_day);
                                    uniqueAvailability.add(car.availability);
                                });


                                if (category_sub_modal_title.textContent === "Brand") {
                                    generateSubModalButtons(uniqueBrands);
                                } else if (category_sub_modal_title.textContent === "Type") {
                                    generateSubModalButtons(uniqueType);
                                } else if (category_sub_modal_title.textContent === "Seats") {
                                    generateSubModalButtons(uniqueSeats);
                                } else if (category_sub_modal_title.textContent === "Fuel Type") {
                                    generateSubModalButtons(uniqueFuels);
                                } else if (category_sub_modal_title.textContent === "Price Per Day") {
                                    generateSubModalButtons(uniquePrice);
                                } else if (category_sub_modal_title.textContent === "Availability") {
                                    generateSubModalButtons(uniqueAvailability);
                                }

                                function generateSubModalButtons(categorySet) {
                                    for (const value of categorySet) {

                                        let genericBtn = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        genericBtn.textContent = value;
                                        genericBtn.classList = "ctgryBtn";

                                        genericBtn.addEventListener('click', function () {

                                            closeMainModal();
                                            searchCategory(value);

                                        });

                                        category_sub_modal_content_container_content.style.display = "flex";
                                        category_sub_modal_content_container_content.style.flexDirection = "column";
                                        category_sub_modal_content_container_content.appendChild(genericBtn);
                                        category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                        category_main_modal.appendChild(category_main_modal_content_container_container);
                                        document.body.appendChild(category_main_modal);

                                    }
                                }

                            }


                        }
                    }
                    xhttp.open('GET', 'cars.json', true);
                    xhttp.send();

                    //Depending on the containerTextContent use either the brand or type loop.
                    //Then generate buttons with each of the brands/types and append it to the category_sub_modal_content_container (but content version)
                    //So category_sub_modal_content (Maybe this name will suffice)



                    category_sub_modal_title_container.appendChild(category_sub_modal_title);
                    category_sub_modal_content_container.appendChild(category_sub_modal_title_container);
                    category_main_modal_content_container_container.style.width = "1000px";
                    category_main_modal_content_container_container.style.display = "flex";
                    category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                    category_main_modal.appendChild(category_main_modal_content_container_container);
                    document.body.appendChild(category_main_modal);

                }

                //category_sub_modal_content_container
                //

            } else {

                //What if it is 1000px in width (sub modal is on however clicked on a different Textcontent  (e.g. brand -> type))
                let container = button.closest('.category_main_modal_content_sub_container');

                if (currentContent === container.textContent) {
                    let category_sub_modal_content_container = document.querySelector('.category_sub_modal_content_container');
                    const parentContainer = category_sub_modal_content_container.parentNode;

                    if (parentContainer && parentContainer.contains(category_sub_modal_content_container)) {

                        parentContainer.removeChild(category_sub_modal_content_container);

                    }
                    category_main_modal.style.width = "400px";
                } else {
                    let category_sub_modal_content_container = document.querySelector('.category_sub_modal_content_container');
                    const parentContainer = category_sub_modal_content_container.parentNode;

                    if (parentContainer && parentContainer.contains(category_sub_modal_content_container)) {

                        parentContainer.removeChild(category_sub_modal_content_container);

                    }
                    // category_main_modal.style.width = "400px";

                    category_main_modal.style.width = "1000px";

                    let container = button.closest('.category_main_modal_content_sub_container');
                    currentContent = container.textContent;

                    if (container) {
                        let containerTextContent = container.textContent.trim();
                        let category_sub_modal_title_container = document.createElement('div');
                        let category_sub_modal_content_container = document.createElement('div');
                        let category_sub_modal_title = document.createElement('h3');

                        category_sub_modal_title.textContent = containerTextContent;
                        category_sub_modal_title.style.marginLeft = "1rem";
                        category_sub_modal_content_container.classList = "category_sub_modal_content_container";
                        category_sub_modal_content_container.style.display = "flex";
                        category_sub_modal_content_container.style.flexDirection = "column";
                        category_sub_modal_content_container.style.alignItems = "stretch";
                        category_sub_modal_content_container.style.width = "600px";

                        category_sub_modal_title_container.style.display = "flex";
                        category_sub_modal_title_container.style.justifyContent = "center";
                        category_sub_modal_title_container.style.marginBottom = "1rem";


                        //JSON
                        const xhttp = new XMLHttpRequest();

                        xhttp.onreadystatechange = function () {
                            if (xhttp.readyState === XMLHttpRequest.DONE) {
                                if (xhttp.status === 200) {
                                    const carsData = JSON.parse(xhttp.responseText);

                                    const uniqueBrands = new Set();
                                    const uniqueType = new Set();
                                    const uniqueSeats = new Set();
                                    const uniqueFuels = new Set();
                                    const uniquePrice = new Set();
                                    const uniqueAvailability = new Set();

                                    carsData.forEach(car => {
                                        uniqueBrands.add(car.brand);
                                        uniqueType.add(car.type);
                                        uniqueSeats.add(car.seats);
                                        uniqueFuels.add(car.fuel_type);
                                        uniquePrice.add(car.price_per_day);
                                        uniqueAvailability.add(car.availability);
                                    });


                                    if (category_sub_modal_title.textContent === "Brand") {
                                        generateSubModalButtons(uniqueBrands);
                                    } else if (category_sub_modal_title.textContent === "Type") {
                                        generateSubModalButtons(uniqueType);
                                    } else if (category_sub_modal_title.textContent === "Seats") {
                                        generateSubModalButtons(uniqueSeats);
                                    } else if (category_sub_modal_title.textContent === "Fuel Type") {
                                        generateSubModalButtons(uniqueFuels);
                                    } else if (category_sub_modal_title.textContent === "Price Per Day") {
                                        generateSubModalButtons(uniquePrice);
                                    } else if (category_sub_modal_title.textContent === "Availability") {
                                        generateSubModalButtons(uniqueAvailability);
                                    }

                                    function generateSubModalButtons(categorySet) {
                                        for (const value of categorySet) {

                                            let genericBtn = document.createElement('button');
                                            let category_sub_modal_content_container_content = document.createElement('div');
                                            genericBtn.textContent = value;
                                            genericBtn.classList = "ctgryBtn";

                                            genericBtn.addEventListener('click', function () {

                                                closeMainModal();
                                                searchCategory(value);

                                            });

                                            category_sub_modal_content_container_content.style.display = "flex";
                                            category_sub_modal_content_container_content.style.flexDirection = "column";
                                            category_sub_modal_content_container_content.appendChild(genericBtn);
                                            category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                            category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                            category_main_modal.appendChild(category_main_modal_content_container_container);
                                            document.body.appendChild(category_main_modal);

                                        }
                                    }

                                }
                            }

                        }
                        xhttp.open('GET', 'cars.json', true);
                        xhttp.send();

                        //Depending on the containerTextContent use either the brand or type loop.
                        //Then generate buttons with each of the brands/types and append it to the category_sub_modal_content_container (but content version)
                        //So category_sub_modal_content (Maybe this name will suffice)



                        category_sub_modal_title_container.appendChild(category_sub_modal_title);
                        category_sub_modal_content_container.appendChild(category_sub_modal_title_container);
                        category_main_modal_content_container_container.style.width = "1000px";
                        category_main_modal_content_container_container.style.display = "flex";
                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                        category_main_modal.appendChild(category_main_modal_content_container_container);
                        document.body.appendChild(category_main_modal);

                    }
                }

            }
        });
    });


});



//Filter Function (Brand / Type / Seats Input)

function searchCategory(input) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
                const carsData = JSON.parse(xhttp.responseText);
                if (!Number(input)) {
                    input = input.toLowerCase();
                }
                const searchInt = parseInt(input);
                const filteredCars = carsData.filter(car => {
                    return car.brand.toLowerCase().includes(input) ||
                        car.type.toLowerCase().includes(input) ||
                        car.type.toLowerCase().includes(input) ||
                        car.fuel_type.toLowerCase().includes(input) ||
                        car.price_per_day === searchInt ||
                        (car.seats === searchInt);
                });

                cardContainer.textContent = '';


                filteredCars.forEach(car => {

                    if (car.availability === false) {
                        disabledCardGeneratorFunc(car);
                    } else {
                        // let cardHtml = '';
                        cardGeneratorFunc(car);
                    }
                    cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                });
            }
        }
    }
    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
}


//Search Filter

function searchFilter() {

    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const cardContainer = document.getElementById('cardContainer');
    const contentDiv = document.getElementById('content');
    cardContainer.innerHTML = '';

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {

                const carsData = JSON.parse(xhttp.responseText);
                const filteredCars = carsData.filter(car => {

                    const searchInt = parseInt(searchInput);

                    return car.brand.toLowerCase().includes(searchInput) ||
                        car.model.toLowerCase().includes(searchInput) ||
                        car.type.toLowerCase().includes(searchInput) ||
                        car.mileage.toLowerCase().includes(searchInput) ||
                        car.fuel_type.toLowerCase().includes(searchInput) ||
                        car.description.toLowerCase().includes(searchInput) ||
                        (searchInt && car.seats === searchInt);
                });

                if (filteredCars.length === 0) {

                    cardContainer.textContent = '';

                    carsData.forEach(car => {

                        if (car.availability === false) {
                            disabledCardGeneratorFunc(car);
                        } else {
                            // let cardHtml = '';
                            cardGeneratorFunc(car);
                        }
                        cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                        document.getElementById('searchInput').value = '';
                    });

                } else {
                    cardContainer.textContent = '';


                    filteredCars.forEach(car => {
                        // let cardHtml = '';

                        if (car.availability === false) {
                            disabledCardGeneratorFunc(car);
                        } else {
                            // let cardHtml = '';
                            cardGeneratorFunc(car);
                        }
                        cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                        document.getElementById('searchInput').value = '';
                    });
                }

            } else {
                console.error('Error:', xhttp.status);
            }
        }
    };
    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
}

