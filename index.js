//SearchFilter with input functionality
//This function takes an input (a string)
//The purpose of this function is to get the 5 most relevant suggestions. 

//Initialise here so we can access it later outside of the function.

function suggestionFilter(input) {
    return new Promise((resolve, reject) => {
        const searchInput = input.toLowerCase().trim();
        const xhttp = new XMLHttpRequest();
        const suggestionsArray = new Set();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 200) {
                    const carsData = JSON.parse(xhttp.responseText);
                    
                    const filteredCars = carsData.filter(car => {

                        return (
                            car.brand.toLowerCase().includes(searchInput) ||
                            car.model.toLowerCase().includes(searchInput) ||
                            car.type.toLowerCase().includes(searchInput)
                        );
                    });

                    filteredCars.forEach(car => {
                        if (suggestionsArray.size < 5) {
                            if (car.brand.toLowerCase().includes(searchInput)) {
                                suggestionsArray.add(car.brand);
                            }
                            if (car.model.toLowerCase().includes(searchInput)) {
                                suggestionsArray.add(car.model);
                            }
                        }
                    });

                    const uniqueSuggestions = Array.from(suggestionsArray);
                    resolve(uniqueSuggestions);
                } else {
                    console.error('Error:', xhttp.status);
                    resolve([]); 
                }
            }
        };

        xhttp.open('GET', 'cars.json', true);
        xhttp.send();
    });
}


//Start the suggestions box as display none
let suggestions = document.getElementById('suggestions');
suggestions.style.display = "none";



let searchHistory = new Set(JSON.parse(localStorage.getItem('searchHistory')) || []);

function addSearchHistory(searchInput) {
    searchHistory.add(searchInput);

    if (searchHistory.size > 5) {
        const oldestItem = Array.from(searchHistory.values())[0];
        searchHistory.delete(oldestItem);
    }

    localStorage.setItem('searchHistory', JSON.stringify(Array.from(searchHistory)));

    console.log(searchHistory);
}

function clearSuggestionsContent() {
    const suggestionsDiv = document.getElementById('suggestions');
    const childNodes = suggestionsDiv.childNodes;

    for (let i = childNodes.length - 1; i >= 0; i--) {
        const childNode = childNodes[i];

        if (childNode.nodeName !== 'H4') {
            suggestionsDiv.removeChild(childNode);
        }
    }
}


// document.getElementById('searchInput').addEventListener('input', searchFilter);
document.getElementById('submitSearch').addEventListener('click', searchFilter);

//When focused on search bar

document.getElementById('searchInput').addEventListener('focus', function() {
    let searchInput = document.getElementById('searchInput');
    let suggestions = document.getElementById('suggestions');
    let suggestions_title = document.getElementById('suggestions_title');
    
    suggestions.style.display = "block";
    suggestions_title.style.display = "block";

    if (searchInput.value === "") {
        if (searchHistory.size > 0) {
            clearSuggestionsContent();
            let myArray = Array.from(searchHistory);
            for (let i = myArray.length - 1; i >= 0; i--) {
                let search = document.createElement('h3');
                search.textContent = myArray[i];
                suggestions.appendChild(search);
            }
        } else {

        }
    } else {
        suggestions_title.textContent = "Suggestions";
        clearSuggestionsContent();
        //Also show suggestions here using ajax. Since its duplicative of below - perhaps use a function
        suggestionFilter(searchInput.value).then(suggArray => {
            for (let i = 0; i < suggArray.length; i++) {
                let search = document.createElement('h3');
                search.textContent = suggArray[i];
                suggestions.appendChild(search);
            }
        })
        .catch(error => {

        });
    }
});

document.getElementById('searchInput').addEventListener('input', function(event) {
    let suggestions_title = document.getElementById('suggestions_title');
    const searchText = event.target.value.trim();
    if(searchText === "") {
        suggestions_title.textContent = "Recent Searches";
        if (searchHistory.size > 0) {
            clearSuggestionsContent();
            let myArray = Array.from(searchHistory);
            for (let i = myArray.length - 1; i >= 0; i--) {
                let search = document.createElement('h3');
                search.textContent = myArray[i];
                suggestions.appendChild(search);
            }
        }

    } else {
        //If search bar is empty then suggestions should not be shown
        if(searchText === "") {
            console.log("should show recent searches instead");
        } else {
            suggestions_title.textContent = "Suggestions";
            clearSuggestionsContent();
            //Now at this point, it's time to Show the suggestions. Might need to use AJAX to access the JSON cars.json file
            //Get the current value of the searchInput
            suggestionFilter(searchInput.value).then(suggArray => {
                for (let i = 0; i < suggArray.length; i++) {
                    let search = document.createElement('h3');
                    search.textContent = suggArray[i];
                    suggestions.appendChild(search);
                }
            })
            .catch(error => {

            });

        }

    }
});

//Make it so that the suggestions box removes when the target is something else
//Can also do the event.target to check if we are on suggestions then get the h3 element (the suggestions/keyword)
//Then once we get the h3 element, we use it as an input to a function search Filter changed to accept inputs
//Use this to return new page with the required element. 

let searchInput = document.getElementById('searchInput');
document.addEventListener('click', function(event) {
    const targetClick = event.target;

    // console.log(targetClick.textContent);

    let isSearchInput = false;
    if (targetClick === searchInput) {
        isSearchInput = true;
    } else if (searchInput.contains(targetClick)) {
        isSearchInput = true;
    }

    let isSuggestionsBox = false;
    if (targetClick === suggestions) {
        isSuggestionsBox = true;

        // searchFilter(input);
    } else if (suggestions.contains(targetClick)) {
        isSuggestionsBox = true;
        if(targetClick.tagName === 'H3') {
            searchInputFiltering(targetClick.textContent);
            suggestions.style.display = 'none';
        }
    }

    //If the users click is not on either the search or suggestions box, remove the suggestions box
    if (!isSearchInput && !isSuggestionsBox) {
        suggestions.style.display = 'none';
    }
});



//If want to add functionality to click on the keywords/suggestions, tweak the below as having the blur event listener prevents clicking and getting values.

// document.getElementById('searchInput').addEventListener('blur', function() {

//     suggestions.style.display = "none";
//     suggestions_title.style.display = "none";
// });

//Need to create a suggestions bar. max 5 suggestions. 
//Get the input (the current value of the search bar at the current moment)
//


function test(event) {
    console.log(event.target.parentElement.children[8].value);
}

//Opening Reservation Modal (Non DOM Generated)
let reservationBtn = document.getElementById('reservation');
reservationBtn.addEventListener('click', openReservation);

//Form validation
function validateInputs() {
    let valid_drivers_license = document.getElementById('valid_drivers_license');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let last_name = document.getElementById('last_name');
    let first_name = document.getElementById('first_name');
    let end_date = document.getElementById('end_date');
    let start_date = document.getElementById('start_date');
    let car_quantity = document.getElementById('car_quantity');

    email = email.value.trim();

}

let valid_drivers_license = document.getElementById('valid_drivers_license');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let last_name = document.getElementById('last_name');
let first_name = document.getElementById('first_name');
let end_date = document.getElementById('end_date');
let start_date = document.getElementById('start_date');
let car_quantity = document.getElementById('car_quantity');
let errorMsg = document.querySelector('.error');

start_date.addEventListener('keydown', (event) => {
    event.preventDefault(); 
});

end_date.addEventListener('keydown', (event) => {
    event.preventDefault(); 
});

let phone_error = document.getElementById('phone_error');
let email_error = document.getElementById('email_error');
let checkbox_error = document.getElementById('checkbox_error');
let first_name_error = document.getElementById('first_name_error');
let last_name_error = document.getElementById('last_name_error');
let quantity_error = document.getElementById('quantity_error');

//Need to disabled the place order button if the inputs are empty
function validPlaceOrder() {
    let place_order_btn = document.getElementById('place_order_btn');
    let valid_drivers_license = document.getElementById('valid_drivers_license');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let last_name = document.getElementById('last_name');
    let first_name = document.getElementById('first_name');
    let end_date = document.getElementById('end_date');
    let start_date = document.getElementById('start_date');
    let car_quantity = document.getElementById('car_quantity');

    if(email.value === '' 
        || phone.value === '' 
        || last_name.value === '' 
        || first_name.value === '' 
        || end_date.value === ''
        || start_date.value === ''
        || car_quantity.value === ''
        || valid_drivers_license.checked === false
        || phone_error.textContent != ""
        || email_error.textContent != ""
        || quantity_error.textContent !== ""
        ) {

            place_order_btn.style.backgroundColor = "red";
            place_order_btn.disabled = true;
            place_order_btn.style.cursor = "not-allowed";
            place_order_btn.style.opacity = "0.3";

        } else {
            place_order_btn.style.backgroundColor = "#005792";
            place_order_btn.disabled = false;
            place_order_btn.style.cursor = "pointer";
            place_order_btn.style.opacity = "1";
            place_order_btn.addEventListener('click', function() {
                console.log("order submitted!");

                let reservationJSON = localStorage.getItem('current_reservation');
                let reservationObject = JSON.parse(reservationJSON);
                console.log(reservationObject);

                //Need to get the quantity inputted by the user in car_quantity.value
                console.log(car_quantity.value);

                let userInputtedQuantity = car_quantity.value;


                const jsonUrl = 'cars.json';

                let xhr = new XMLHttpRequest();

                xhr.open('GET', jsonUrl, true);

                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {

                        let jsonData = JSON.parse(xhr.responseText);

                        let foundCar = jsonData.find(car => car.id == reservationObject.carId);

                        if (foundCar) {

                            foundCar.quantity =- userInputtedQuantity;

                            let updateRequest = new XMLHttpRequest();
                            updateRequest.open('POST', jsonUrl, true);
                            updateRequest.setRequestHeader('Content-Type', 'application/json');
                            updateRequest.send(JSON.stringify(jsonData));

                            console.log('Item quantity updated successfully:', foundCar);
                        } else {
                            console.log('Item with id not found:', reservationObject.carId);
                        }
                    } else {
                        console.error('Failed to load JSON data:', xhr.statusText);
                    }
                };

                xhr.send();

            });
        }
}

let place_order_btn = document.getElementById('place_order_btn');

// place_order_btn.addEventListener('click', function() {
//     let order_form = document.getElementById('order_form');
//     order_form.submit();
// });



// car_quantity.add('input', function() {
//     validPlaceOrder();

// });

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let place_order_okay = 0;

first_name.addEventListener('input', function() {
    validPlaceOrder();

    
});

last_name.addEventListener('input', function() {
    validPlaceOrder();

});

if(!valid_drivers_license.checked) {
    checkbox_error.textContent = "Must be Checked";
}

valid_drivers_license.addEventListener('change', function() {

    if(!valid_drivers_license.checked) {
        checkbox_error.textContent = "Must be Checked";
    } else {
        checkbox_error.textContent = "";
    }
    validPlaceOrder();
});

phone.addEventListener('input', function() {

    if(phone.value.length !== 10) {
        phone_error.textContent = "Must be 10 digits";
    } else if(isNaN(phone.value)) {
        phone_error.textContent = "Only numbers allowed";
        } else {
        phone_error.textContent = "";
    }
    validPlaceOrder();
});

email.addEventListener('input', function() {

    if(!emailRegex.test(email.value)) {
        email_error.textContent = "Ensure email format (@/.com)";
    } else {
        email_error.textContent = "";
    }
    validPlaceOrder();
});

end_date.addEventListener('input', function() {
    validPlaceOrder();
});

start_date.addEventListener('input', function() {
    validPlaceOrder();
});

car_quantity.addEventListener('input', function(event) {

    let currentReservation = JSON.parse(localStorage.getItem('current_reservation'));
    let max = currentReservation.quantity;
    let updatedValue

        updatedValue = event.target.value;

        //Make a check here, to see if the inptutted value is within the bounds of the currentReservation.quantity
        if(updatedValue <= 0 || updatedValue > currentReservation.quantity) {
            quantity_error.textContent = `Accepted Values (1 - ${max})`;
        } else {
            quantity_error.textContent = "";
        }
    validPlaceOrder();
});



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
        type.textContent = `${reservation.type}`;
        sub_details.appendChild(type);

        let mileage = document.createElement('p');
        mileage.textContent = `${reservation.mileage}`;
        sub_details.appendChild(mileage);

        let price = document.createElement('p');
        price.textContent = `$${reservation.pricePerDay}/Day`;
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

            //Make a check here, to see if the inptutted value is within the bounds of the currentReservation.quantity
            // if(updatedValue == 0 || updatedValue > currentReservation.quantity) {
  
            //     //After -> Change the error text (div below)
            // }

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

    validPlaceOrder();
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

    let valid_drivers_license = document.getElementById('valid_drivers_license');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let last_name = document.getElementById('last_name');
    let first_name = document.getElementById('first_name');

    start_date.value = '';
    end_date.value = '';
    car_quantity.value = '';
    valid_drivers_license.checked = false;
    email.value = '';
    phone.value = '';
    first_name.value = '';
    last_name.value = '';

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
    category_main_modal.style.zIndex = "9999";
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
    modal_underlay.style.zIndex = "9998";
    modal_underlay.style.position = "fixed";
    modal_underlay.style.backgroundColor = "grey";
    modal_underlay.style.opacity = "0.8";
    modal_underlay.style.width = "100%";
    modal_underlay.style.height = "100%";

    let cardContainer = document.getElementById('cardContainer');
    cardContainer.style.zIndex = "9997";


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

                addSearchHistory(searchInput);
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
                        let suggestions_title = document.getElementById('suggestions_title');
                        suggestions_title.textContent = "Recent Searches";
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
                        let suggestions_title = document.getElementById('suggestions_title');
                        suggestions_title.textContent = "Recent Searches";
                    });
                }

            } else {

            }
        }
    };
    
    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
}

//This function will take in an input and be used for the keywords and suggestions box.
function searchInputFiltering(input) {

    const searchInput = input.toLowerCase().trim();
    const cardContainer = document.getElementById('cardContainer');
    const contentDiv = document.getElementById('content');
    cardContainer.innerHTML = '';

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {

                addSearchHistory(searchInput);
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
                        let suggestions_title = document.getElementById('suggestions_title');
                        suggestions_title.textContent = "Recent Searches";
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
                        let suggestions_title = document.getElementById('suggestions_title');
                        suggestions_title.textContent = "Recent Searches";
                    });
                }

            } else {

            }
        }
    };
    
    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
}
