document.getElementById('searchInput').addEventListener('input', searchFilter);

//Night Mode functionality Optional

// let palette = document.getElementById('palette');
// const rootStyles = getComputedStyle(document.documentElement);

// palette.addEventListener('click', function() {
//     document.documentElement.style.setProperty('--primary-color', 'black');
//     document.documentElement.style.setProperty('--secndary-color', 'white');
// });

// test
// function test(event) {
//     console.log(event.target.parentElement.children[0]);
// }

function test(event) {
    console.log(event.target.parentElement.children[8].value);
}

//Opening Reservation Modal (Non DOM Generated)
let reservationBtn = document.getElementById('reservation');
reservationBtn.addEventListener('click', openReservation);

// function openReservation() {
//     let reservation_modal = document.querySelector('.reservation_modal');
//     let reservation_modal_underlay = document.querySelector('.reservation_modal_underlay');
//     let cardContainer = document.getElementById('cardContainer');

//     reservation_modal.style.display = "flex";
//     reservation_modal.style.flexDirection = "column";
//     reservation_modal_underlay.style.display = "block";
//     document.body.style.overflow = "hidden";
//     cardContainer.style.zIndex = "999";

//     let reservation_close_btn = document.querySelector('.reservation_close_btn');
//     reservation_close_btn.addEventListener('click', function() {
//         closeReservationModal();
//     });

//     // let xhr = new XMLHttpRequest();
//     // xhr.open('GET', 'index.php', true);
//     // xhr.onreadystatechange = function() {
//     //     if (xhr.readyState === 4 && xhr.status === 200) {
//     //         let current_reservation = document.querySelector('.current_reservation');
//     //         current_reservation.innerHTML = xhr.responseText;
//     //     }
//     // };
//     // xhr.send();
    

//     function closeReservationModal() {
//         reservation_modal.style.display = "none";
//         reservation_modal_underlay.style.display = "none";
//         document.body.style.overflow = "auto";
//     }
    
//     window.addEventListener('click', function(event) {
//         if (event.target == reservation_modal_underlay) {
//             closeReservationModal();
//         }
//     });
// }

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
    document.body.style.overflow = "hidden";
    cardContainer.style.zIndex = "999";

    let reservation_close_btn = document.querySelector('.reservation_close_btn');
    reservation_close_btn.addEventListener('click', function() {
        closeReservationModal();
    });

    function closeReservationModal() {
        reservation_modal.style.display = "none";
        reservation_modal_underlay.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.addEventListener('click', function(event) {
        if (event.target == reservation_modal_underlay) {
            closeReservationModal();
        }
    });


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
    let previousReservation = JSON.parse(localStorage.getItem('previous_reservation'));

    if (currentReservation) {

        let reservation_remove_button = document.getElementById('reservation_remove_button');
        reservation_remove_button.style.opacity = "1";
        reservation_remove_button.style.cursor = "pointer";
        reservation_remove_button.disabled = false;

        current_reservation.innerHTML = '';

        let currentReservationCard = createReservationCard(currentReservation);

        current_reservation.appendChild(currentReservationCard);
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
reservation_remove_button.addEventListener('click', function() {
    
    // let cart = localStorage.getItem('current_reservation');
    // console.log("hi");
    // console.log(cart);
    localStorage.removeItem('current_reservation');
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
            <p>Description: ${car.description}</p>
            <button class="unavailable_addToCartBtn" disabled>Rent</button>
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
            <p>Description: ${car.description}</p>
            <button class="addToCartBtn" onclick="addReservation(event)">Rent</button>
            <input type="hidden" value="${car.id}"/>
        </div>
    </div>
`;
}

//Rent -> Reservation Button for all the other generated Cards (Name is non main but it applies to main one too (in index.php -> just have not changed the name yet))
// function addReservationForNonMain(event) {



//     let reservation_main_modal = document.createElement('div');
//     let reservation_modal_title = document.createElement('h3');
//     let reservation_modal_close_img = document.createElement('img');
//     let reservation_modal_title_container = document.createElement('div');
//     let reservation_modal_underlay = document.createElement('div');
    
    
//         function closeMainReservationModal() {
//             document.body.removeChild(reservation_main_modal);
//             document.body.removeChild(reservation_modal_underlay);
//             document.body.style.overflow = "auto";
//         }
    
//         window.addEventListener('click', function(event) {
//             if (event.target == reservation_modal_underlay) {
//                 closeMainReservationModal();
//             }
//         });
    
//         //Reservation Modal img (Close)
//         reservation_modal_close_img.src = "images/close.png";
//         reservation_modal_close_img.style.width = "20px";
//         reservation_modal_close_img.style.height = "20px";
    
//         reservation_modal_close_img.addEventListener('click', function() {
//             closeMainReservationModal();
//         });
    
//         //Reservation Modal Title
//         reservation_modal_title.textContent = "Your Reservations";
    
//         //Container for reservation modal title and img
//         reservation_modal_title_container.classList = "reservation_modal_title_container";
//         reservation_modal_title_container.style.display = "flex";
//         reservation_modal_title_container.style.justifyContent = "space-between";
//         reservation_modal_title_container.style.padding = "2rem";
    
//         //Main reservation modal
//         reservation_main_modal.style.zIndex = "2147483647";
//         reservation_main_modal.style.position = "fixed";
//         reservation_main_modal.style.backgroundColor = "white";
//         reservation_main_modal.style.width = "500px";
//         reservation_main_modal.style.height = "100%";
//         reservation_main_modal.style.top = "0";
//         reservation_main_modal.style.right = "0";
//         reservation_main_modal.style.display = "flex"
//         reservation_main_modal.style.flexDirection = "column";

    
//         //Reservation Modal Underlay
//         reservation_modal_underlay.style.zIndex = "2147483646";
//         reservation_modal_underlay.style.position = "fixed";
//         reservation_modal_underlay.style.backgroundColor = "grey";
//         reservation_modal_underlay.style.opacity = "0.8";
//         reservation_modal_underlay.style.width = "100%";
//         reservation_modal_underlay.style.height = "100%";
    
//         //Prevent Scrolling
//         document.body.style.overflow = "hidden";

//         let reservation_modal_content_container = document.createElement('div');
    
//         reservation_modal_title_container.appendChild(reservation_modal_title);
//         reservation_modal_title_container.appendChild(reservation_modal_close_img);
//         reservation_main_modal.appendChild(reservation_modal_title_container);

//         //Retrieve Only the car_image/ source section so we can put on an image of the car
//         let carImg = document.createElement('img');
//         let carImgSrc = event.target.parentElement.children[8].value;

//         carImg.src = "car_images/" + carImgSrc + ".jpg";
//         carImg.style.width = "150px";
//         carImg.style.height = "150px";
//         reservation_modal_content_container.appendChild(carImg);

//         // console.log("test: " + event.target.parentElement.children[8].value);
        

//         let carText = document.createElement('h3');
//         carText.textContent = event.target.parentElement.children[0].textContent.trim();
//         let carType = document.createElement('h3');
//         carType.textContent = event.target.parentElement.children[1].textContent.trim();
//         let carMileage = document.createElement('h3');
//         carMileage.textContent = event.target.parentElement.children[2].textContent.trim();
//         let carFuel = document.createElement('h3');
//         carFuel.textContent = event.target.parentElement.children[3].textContent.trim();
//         let carSeats = document.createElement('h3');
//         carSeats.textContent = event.target.parentElement.children[4].textContent.trim();
//         let carPrice = document.createElement('h3');
//         carPrice.textContent = event.target.parentElement.children[5].textContent.trim();

//         let quantityInput = document.createElement('input');
//         let quantityInputAddButton = document.createElement('button');
//         let quantityInputMinusButton = document.createElement('button');
//         let quantityInputContainer = document.createElement('div');
//         quantityInputContainer.classList = "quantityInputContainer";
//         quantityInput.classList = "quantityInput";
//         quantityInputAddButton.classList = "quantityInputAddButton";
//         quantityInputMinusButton.classList = "quantityInputMinusButton";

//         let reservation_modal_content_container_container = document.createElement('div');
//         reservation_modal_content_container_container.classList = "reservation_modal_content_container_container";

//         quantityInputAddButton.textContent = "+";
//         quantityInputMinusButton.textContent = "-";
//         quantityInput.placeholder = "1";
//         // quantityInput.type = "number";
//         quantityInput.inputMode = "numeric";
//         quantityInput.min = "1";

//         //Find the max quantity of car
//         const xhttp = new XMLHttpRequest();

//         xhttp.onreadystatechange = function () {
//             if (xhttp.readyState === XMLHttpRequest.DONE) {
//                 if (xhttp.status === 200) {
//                     const carsData = JSON.parse(xhttp.responseText);


//                         carsData.forEach(car => {
//                             if((car.brand + " " + car.model) === event.target.parentElement.children[0].textContent.trim()) {
//                                 quantityInput.max = car.quantity;

//                             }
//                         });
//                 }
//             }
//         }

//         xhttp.open('GET', 'cars.json', true);
//         xhttp.send();

//         let startDateInput = document.createElement('input');
//         let endDateInput = document.createElement('input');
//         let dateContainer = document.createElement('div');

//         startDateInput.classList = "startDateInput";
//         endDateInput.classList = "endDateInput";

//         dateContainer.classList = "dateContainer";

//         startDateInput.type = "date";
//         endDateInput.type = "date";
//         dateContainer.appendChild(startDateInput);
//         dateContainer.appendChild(endDateInput);

//         //Date container styling
//         dateContainer.style.display = "flex";
//         dateContainer.style.gap = "1rem";



//         //Need to access the JSON file and find out what the max number of cars available are.

//         quantityInput.style.textAlign = "center";

//         quantityInputContainer.appendChild(quantityInputMinusButton);
//         quantityInputContainer.appendChild(quantityInput);
//         quantityInputContainer.appendChild(quantityInputAddButton);

//         //Reservation Modal Content Container Styling
//         reservation_modal_content_container.classList = "reservation_modal_content_container";
//         reservation_modal_content_container.style.display = "flex";
//         reservation_modal_content_container.style.flexDirection = "column";
//         reservation_modal_content_container.style.gap = "1rem";
//         reservation_modal_content_container.style.alignItems = "center";

//         //Reservation Modal Content Container Container Styling
//         reservation_modal_content_container_container.classList = "reservation_modal_content_container_container";
//         reservation_modal_content_container_container.style.display = "flex";
//         reservation_modal_content_container_container.style.flexDirection = "column";
//         reservation_modal_content_container_container.style.gap = "1rem";
//         reservation_modal_content_container_container.style.alignItems = "center";

//         reservation_modal_content_container.appendChild(carText);
//         reservation_modal_content_container.appendChild(carType);
//         reservation_modal_content_container.appendChild(carMileage);
//         reservation_modal_content_container.appendChild(carFuel);
//         reservation_modal_content_container.appendChild(carSeats);
//         reservation_modal_content_container.appendChild(carPrice);

//         let reservation_modal_footer_container = document.createElement('div');
//         reservation_modal_footer_container.classList = "reservation_modal_footer_container";

//         let reservation_modal_footer_total_cost = document.createElement('h3');
//         reservation_modal_footer_total_cost.textContent = "Rental Cost";

//         let reservation_modal_footer_checkout = document.createElement('h3');
//         reservation_modal_footer_checkout.textContent = "Checkout";

//         reservation_modal_footer_container.appendChild(reservation_modal_footer_total_cost);
//         reservation_modal_footer_container.appendChild(reservation_modal_footer_checkout);
        
//         reservation_modal_content_container_container.appendChild(reservation_modal_content_container);
//         reservation_modal_content_container_container.appendChild(quantityInputContainer);
//         reservation_modal_content_container_container.appendChild(dateContainer);
        

//         reservation_main_modal.appendChild(reservation_modal_content_container_container);
//         reservation_main_modal.appendChild(reservation_modal_footer_container);
        
//         document.body.appendChild(reservation_main_modal);
//         document.body.appendChild(reservation_modal_underlay);
// }


//Reservation

// let reservation = document.getElementById("reservation");

// reservation.addEventListener('click', function() {
//     generateReservationModal();

// });

//Generate Reservation Modal
// function generateReservationModal() {
//     let reservation_main_modal = document.createElement('div');
//     let reservation_modal_title = document.createElement('h3');
//     let reservation_modal_close_img = document.createElement('img');
//     let reservation_modal_title_container = document.createElement('div');
//     let reservation_modal_underlay = document.createElement('div');


//     function closeMainReservationModal() {
//         document.body.removeChild(reservation_main_modal);
//         document.body.removeChild(reservation_modal_underlay);
//         document.body.style.overflow = "auto";
//     }

//     window.addEventListener('click', function(event) {
//         if (event.target == reservation_modal_underlay) {
//             closeMainReservationModal();
//         }
//     });

//     //Reservation Modal img (Close)
//     reservation_modal_close_img.src = "images/close.png";
//     reservation_modal_close_img.style.width = "20px";
//     reservation_modal_close_img.style.height = "20px";

//     reservation_modal_close_img.addEventListener('click', function() {
//         closeMainReservationModal();
//     });

//     //Reservation Modal Title
//     reservation_modal_title.textContent = "Your Reservations";

//     //Container for reservation modal title and img
//     reservation_modal_title_container.style.display = "flex";
//     reservation_modal_title_container.style.justifyContent = "space-between";
//     reservation_modal_title_container.style.padding = "2rem";

//     let cardContainer = document.getElementById('cardContainer');

//     //Main reservation modal
//     reservation_main_modal.style.zIndex = "2147483647";
//     reservation_main_modal.style.position = "fixed";
//     reservation_main_modal.style.backgroundColor = "white";
//     reservation_main_modal.style.width = "500px";
//     reservation_main_modal.style.height = "100%";
//     reservation_main_modal.style.top = "0";
//     reservation_main_modal.style.right = "0";

//     //Reservation Modal Underlay
//     reservation_modal_underlay.style.zIndex = "2147483646";
//     reservation_modal_underlay.style.position = "fixed";
//     reservation_modal_underlay.style.backgroundColor = "grey";
//     reservation_modal_underlay.style.opacity = "0.8";
//     reservation_modal_underlay.style.width = "100%";
//     reservation_modal_underlay.style.height = "100%";

//     cardContainer.style.zIndex = "2147483645";

//     //Prevent Scrolling
//     document.body.style.overflow = "hidden";

//     reservation_modal_title_container.appendChild(reservation_modal_title);
//     reservation_modal_title_container.appendChild(reservation_modal_close_img);
//     reservation_main_modal.appendChild(reservation_modal_title_container);
//     document.body.appendChild(reservation_main_modal);
//     document.body.appendChild(reservation_modal_underlay);

//     //Need to start appending the necessary cards into the modal
// }


//Click on all Cars button to retrieve all cars

let browse_all_categories_btn = document.getElementById('browse_all_categories_btn');

browse_all_categories_btn.addEventListener('click', function() {
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

browse_categories_btn.addEventListener('click', function() {
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

    window.addEventListener('click', function(event) {
        if (event.target == modal_underlay) {
            closeMainModal();
        }
    });


    //Modal img (Close)
    category_main_modal_close_img.src = "images/close.png";
    category_main_modal_close_img.style.width = "20px";
    category_main_modal_close_img.style.height = "20px";

    category_main_modal_close_img.addEventListener('click', function() {
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


                                if(category_sub_modal_title.textContent === "Brand") {
                                    generateSubModalButtons(uniqueBrands);
                                } else if(category_sub_modal_title.textContent === "Type") {
                                    generateSubModalButtons(uniqueType);
                                } else if(category_sub_modal_title.textContent === "Seats"){
                                    generateSubModalButtons(uniqueSeats);
                                } else if(category_sub_modal_title.textContent === "Fuel Type") {
                                    generateSubModalButtons(uniqueFuels);
                                } else if(category_sub_modal_title.textContent === "Price Per Day") {
                                    generateSubModalButtons(uniquePrice);
                                } else if(category_sub_modal_title.textContent === "Availability") {
                                    generateSubModalButtons(uniqueAvailability);
                                }

                                function generateSubModalButtons(categorySet) {
                                    for(const value of categorySet) {
                                                                        
                                        let genericBtn = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        genericBtn.textContent = value;
                                        genericBtn.classList = "ctgryBtn";
                                
                                        genericBtn.addEventListener('click', function() {
                                            
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

                if(currentContent === container.textContent) {
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


                                if(category_sub_modal_title.textContent === "Brand") {
                                    generateSubModalButtons(uniqueBrands);
                                } else if(category_sub_modal_title.textContent === "Type") {
                                    generateSubModalButtons(uniqueType);
                                } else if(category_sub_modal_title.textContent === "Seats"){
                                    generateSubModalButtons(uniqueSeats);
                                } else if(category_sub_modal_title.textContent === "Fuel Type") {
                                    generateSubModalButtons(uniqueFuels);
                                } else if(category_sub_modal_title.textContent === "Price Per Day") {
                                    generateSubModalButtons(uniquePrice);
                                } else if(category_sub_modal_title.textContent === "Availability") {
                                    generateSubModalButtons(uniqueAvailability);
                                }

                                function generateSubModalButtons(categorySet) {
                                    for(const value of categorySet) {
                                                                        
                                        let genericBtn = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        genericBtn.textContent = value;
                                        genericBtn.classList = "ctgryBtn";
                                
                                        genericBtn.addEventListener('click', function() {
                                            
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
                if(!Number(input)) {
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

