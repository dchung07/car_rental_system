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

//Rent -> Reservation Button for all the other generated Cards
function addReservationForNonMain(event) {
    let reservation_main_modal = document.createElement('div');
        let reservation_modal_title = document.createElement('h3');
        let reservation_modal_close_img = document.createElement('img');
        let reservation_modal_title_container = document.createElement('div');
        let reservation_modal_underlay = document.createElement('div');
    
    
        function closeMainReservationModal() {
            document.body.removeChild(reservation_main_modal);
            document.body.removeChild(reservation_modal_underlay);
            document.body.style.overflow = "auto";
        }
    
        window.addEventListener('click', function(event) {
            if (event.target == reservation_modal_underlay) {
                closeMainReservationModal();
            }
        });
    
        //Reservation Modal img (Close)
        reservation_modal_close_img.src = "images/close.png";
        reservation_modal_close_img.style.width = "20px";
        reservation_modal_close_img.style.height = "20px";
    
        reservation_modal_close_img.addEventListener('click', function() {
            closeMainReservationModal();
        });
    
        //Reservation Modal Title
        reservation_modal_title.textContent = "Your Reservations";
    
        //Container for reservation modal title and img
        reservation_modal_title_container.style.display = "flex";
        reservation_modal_title_container.style.justifyContent = "space-between";
        reservation_modal_title_container.style.padding = "2rem";
    
        //Main reservation modal
        reservation_main_modal.style.zIndex = "2147483647";
        reservation_main_modal.style.position = "absolute";
        reservation_main_modal.style.backgroundColor = "white";
        reservation_main_modal.style.width = "500px";
        reservation_main_modal.style.height = "100%";
        reservation_main_modal.style.top = "0";
        reservation_main_modal.style.right = "0";
    
        //Reservation Modal Underlay
        reservation_modal_underlay.style.zIndex = "2147483646";
        reservation_modal_underlay.style.position = "absolute";
        reservation_modal_underlay.style.backgroundColor = "grey";
        reservation_modal_underlay.style.opacity = "0.8";
        reservation_modal_underlay.style.width = "100%";
        reservation_modal_underlay.style.height = "100%";
    
        //Prevent Scrolling
        document.body.style.overflow = "hidden";

        let reservation_modal_content_container = document.createElement('div');
    
        reservation_modal_title_container.appendChild(reservation_modal_title);
        reservation_modal_title_container.appendChild(reservation_modal_close_img);
        reservation_main_modal.appendChild(reservation_modal_title_container);

        //Retrieve Only the car_image/ source section so we can put on an image of the car
        let carImg = document.createElement('img');
        let carImgSrc = event.target.parentElement.children[8].value;

        carImg.src = "car_images/" + carImgSrc + ".jpg";
        carImg.style.width = "150px";
        carImg.style.height = "150px";
        reservation_modal_content_container.appendChild(carImg);

        // console.log("test: " + event.target.parentElement.children[8].value);
        

        let carText = document.createElement('h3');
        carText.textContent = event.target.parentElement.children[0].textContent.trim();
        let carType = document.createElement('h3');
        carType.textContent = event.target.parentElement.children[1].textContent.trim();
        let carMileage = document.createElement('h3');
        carMileage.textContent = event.target.parentElement.children[2].textContent.trim();
        let carFuel = document.createElement('h3');
        carFuel.textContent = event.target.parentElement.children[3].textContent.trim();
        let carSeats = document.createElement('h3');
        carSeats.textContent = event.target.parentElement.children[4].textContent.trim();
        let carPrice = document.createElement('h3');
        carPrice.textContent = event.target.parentElement.children[5].textContent.trim();

        let quantityInput = document.createElement('input');
        let quantityInputAddButton = document.createElement('button');
        let quantityInputMinusButton = document.createElement('button');
        let quantityInputContainer = document.createElement('div');

        let reservation_modal_content_container_container = document.createElement('div');

        quantityInputAddButton.textContent = "+";
        quantityInputMinusButton.textContent = "-";
        quantityInput.placeholder = "1";
        // quantityInput.type = "number";
        quantityInput.inputMode = "numeric";
        quantityInput.min = "1";

        //Find the max quantity of car
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 200) {
                    const carsData = JSON.parse(xhttp.responseText);


                        carsData.forEach(car => {
                            if((car.brand + " " + car.model) === event.target.parentElement.children[0].textContent.trim()) {
                                quantityInput.max = car.quantity;

                            }
                        });
                }
            }
        }

        xhttp.open('GET', 'cars.json', true);
        xhttp.send();

        let startDateInput = document.createElement('input');
        let endDateInput = document.createElement('input');
        let dateContainer = document.createElement('div');

        startDateInput.type = "date";
        endDateInput.type = "date";
        dateContainer.appendChild(startDateInput);
        dateContainer.appendChild(endDateInput);

        //Date container styling
        dateContainer.style.display = "flex";
        dateContainer.style.gap = "1rem";



        //Need to access the JSON file and find out what the max number of cars available are.

        quantityInput.style.textAlign = "center";

        quantityInputContainer.appendChild(quantityInputMinusButton);
        quantityInputContainer.appendChild(quantityInput);
        quantityInputContainer.appendChild(quantityInputAddButton);

        //Reservation Modal Content Container Styling
        reservation_modal_content_container.style.display = "flex";
        reservation_modal_content_container.style.flexDirection = "column";
        reservation_modal_content_container.style.gap = "1rem";
        reservation_modal_content_container.style.alignItems = "center";

        //Reservation Modal Content Container Container Styling
        reservation_modal_content_container_container.style.display = "flex";
        reservation_modal_content_container_container.style.flexDirection = "column";
        reservation_modal_content_container_container.style.gap = "1rem";
        reservation_modal_content_container_container.style.alignItems = "center";

        reservation_modal_content_container.appendChild(carText);
        reservation_modal_content_container.appendChild(carType);
        reservation_modal_content_container.appendChild(carMileage);
        reservation_modal_content_container.appendChild(carFuel);
        reservation_modal_content_container.appendChild(carSeats);
        reservation_modal_content_container.appendChild(carPrice);
        
        reservation_modal_content_container_container.appendChild(reservation_modal_content_container);
        reservation_modal_content_container_container.appendChild(quantityInputContainer);
        reservation_modal_content_container_container.appendChild(dateContainer);

        

        reservation_main_modal.appendChild(reservation_modal_content_container_container);
        
        document.body.appendChild(reservation_main_modal);
        document.body.appendChild(reservation_modal_underlay);
}

//Rent -> Reservation Button for the main content

function addReservation(event) {
    let reservation_main_modal = document.createElement('div');
        let reservation_modal_title = document.createElement('h3');
        let reservation_modal_close_img = document.createElement('img');
        let reservation_modal_title_container = document.createElement('div');
        let reservation_modal_underlay = document.createElement('div');
    
    
        function closeMainReservationModal() {
            document.body.removeChild(reservation_main_modal);
            document.body.removeChild(reservation_modal_underlay);
            document.body.style.overflow = "auto";
        }
    
        window.addEventListener('click', function(event) {
            if (event.target == reservation_modal_underlay) {
                closeMainReservationModal();
            }
        });
    
        //Reservation Modal img (Close)
        reservation_modal_close_img.src = "images/close.png";
        reservation_modal_close_img.style.width = "20px";
        reservation_modal_close_img.style.height = "20px";
    
        reservation_modal_close_img.addEventListener('click', function() {
            closeMainReservationModal();
        });
    
        //Reservation Modal Title
        reservation_modal_title.textContent = "Your Reservations";
    
        //Container for reservation modal title and img
        reservation_modal_title_container.style.display = "flex";
        reservation_modal_title_container.style.justifyContent = "space-between";
        reservation_modal_title_container.style.padding = "2rem";
    
        //Main reservation modal
        reservation_main_modal.style.zIndex = "2147483647";
        reservation_main_modal.style.position = "absolute";
        reservation_main_modal.style.backgroundColor = "white";
        reservation_main_modal.style.width = "500px";
        reservation_main_modal.style.height = "100%";
        reservation_main_modal.style.top = "0";
        reservation_main_modal.style.right = "0";
    
        //Reservation Modal Underlay
        reservation_modal_underlay.style.zIndex = "2147483646";
        reservation_modal_underlay.style.position = "absolute";
        reservation_modal_underlay.style.backgroundColor = "grey";
        reservation_modal_underlay.style.opacity = "0.8";
        reservation_modal_underlay.style.width = "100%";
        reservation_modal_underlay.style.height = "100%";
    
        //Prevent Scrolling
        document.body.style.overflow = "hidden";

        let reservation_modal_content_container = document.createElement('div');
    
        reservation_modal_title_container.appendChild(reservation_modal_title);
        reservation_modal_title_container.appendChild(reservation_modal_close_img);
        reservation_main_modal.appendChild(reservation_modal_title_container);

        //Retrieve Only the car_image/ source section so we can put on an image of the car
        let carImg = document.createElement('img');
        let carImgSourceUnprocessed = event.target.parentElement.parentElement.firstChild.firstChild.src;

        const startIndex = carImgSourceUnprocessed.indexOf('car_images/');
        let pathFromCarImages;

            if (startIndex !== -1) {

                pathFromCarImages = carImgSourceUnprocessed.substring(startIndex);

            }

        carImg.src = pathFromCarImages;
        carImg.style.width = "150px";
        carImg.style.height = "150px";
        reservation_modal_content_container.appendChild(carImg);

        let carText = document.createElement('h3');
        carText.textContent = event.target.parentElement.children[0].textContent.trim();
        let carType = document.createElement('h3');
        carType.textContent = event.target.parentElement.children[1].textContent.trim();
        let carMileage = document.createElement('h3');
        carMileage.textContent = event.target.parentElement.children[2].textContent.trim();
        let carFuel = document.createElement('h3');
        carFuel.textContent = event.target.parentElement.children[3].textContent.trim();
        let carSeats = document.createElement('h3');
        carSeats.textContent = event.target.parentElement.children[4].textContent.trim();
        let carPrice = document.createElement('h3');
        carPrice.textContent = event.target.parentElement.children[5].textContent.trim();

        let quantityInput = document.createElement('input');
        let quantityInputAddButton = document.createElement('button');
        let quantityInputMinusButton = document.createElement('button');
        let quantityInputContainer = document.createElement('div');

        let reservation_modal_content_container_container = document.createElement('div');

        quantityInputAddButton.textContent = "+";
        quantityInputMinusButton.textContent = "-";
        quantityInput.placeholder = "1";
        // quantityInput.type = "number";
        quantityInput.inputMode = "numeric";
        quantityInput.min = "1";

        //Find the max quantity of car
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === XMLHttpRequest.DONE) {
                if (xhttp.status === 200) {
                    const carsData = JSON.parse(xhttp.responseText);


                        carsData.forEach(car => {
                            if((car.brand + " " + car.model) === event.target.parentElement.children[0].textContent.trim()) {
                                quantityInput.max = car.quantity;

                            }
                        });
                }
            }
        }

        xhttp.open('GET', 'cars.json', true);
        xhttp.send();

        let startDateInput = document.createElement('input');
        let endDateInput = document.createElement('input');
        let dateContainer = document.createElement('div');

        startDateInput.type = "date";
        endDateInput.type = "date";
        dateContainer.appendChild(startDateInput);
        dateContainer.appendChild(endDateInput);

        //Date container styling
        dateContainer.style.display = "flex";
        dateContainer.style.gap = "1rem";



        //Need to access the JSON file and find out what the max number of cars available are.

        quantityInput.style.textAlign = "center";

        quantityInputContainer.appendChild(quantityInputMinusButton);
        quantityInputContainer.appendChild(quantityInput);
        quantityInputContainer.appendChild(quantityInputAddButton);

        //Reservation Modal Content Container Styling
        reservation_modal_content_container.style.display = "flex";
        reservation_modal_content_container.style.flexDirection = "column";
        reservation_modal_content_container.style.gap = "1rem";
        reservation_modal_content_container.style.alignItems = "center";

        //Reservation Modal Content Container Container Styling
        reservation_modal_content_container_container.style.display = "flex";
        reservation_modal_content_container_container.style.flexDirection = "column";
        reservation_modal_content_container_container.style.gap = "1rem";
        reservation_modal_content_container_container.style.alignItems = "center";

        reservation_modal_content_container.appendChild(carText);
        reservation_modal_content_container.appendChild(carType);
        reservation_modal_content_container.appendChild(carMileage);
        reservation_modal_content_container.appendChild(carFuel);
        reservation_modal_content_container.appendChild(carSeats);
        reservation_modal_content_container.appendChild(carPrice);
        
        reservation_modal_content_container_container.appendChild(reservation_modal_content_container);
        reservation_modal_content_container_container.appendChild(quantityInputContainer);
        reservation_modal_content_container_container.appendChild(dateContainer);

        

        reservation_main_modal.appendChild(reservation_modal_content_container_container);
        
        document.body.appendChild(reservation_main_modal);
        document.body.appendChild(reservation_modal_underlay);
 
}

const addToCartBtns = document.querySelectorAll('.addToCartBtn');

// addToCartBtns.forEach(button => {
//     button.addEventListener('click', function() {

//         let reservation_main_modal = document.createElement('div');
//         let reservation_modal_title = document.createElement('h3');
//         let reservation_modal_close_img = document.createElement('img');
//         let reservation_modal_title_container = document.createElement('div');
//         let reservation_modal_underlay = document.createElement('div');
    
    
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
//         reservation_modal_title_container.style.display = "flex";
//         reservation_modal_title_container.style.justifyContent = "space-between";
//         reservation_modal_title_container.style.padding = "2rem";
    
//         //Main reservation modal
//         reservation_main_modal.style.zIndex = "2147483647";
//         reservation_main_modal.style.position = "absolute";
//         reservation_main_modal.style.backgroundColor = "white";
//         reservation_main_modal.style.width = "500px";
//         reservation_main_modal.style.height = "100%";
//         reservation_main_modal.style.top = "0";
//         reservation_main_modal.style.right = "0";
    
//         //Reservation Modal Underlay
//         reservation_modal_underlay.style.zIndex = "2147483646";
//         reservation_modal_underlay.style.position = "absolute";
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
//         let carImgSourceUnprocessed = button.parentElement.parentElement.firstChild.firstChild.src;

//         const startIndex = carImgSourceUnprocessed.indexOf('car_images/');
//         let pathFromCarImages;

//             if (startIndex !== -1) {

//                 pathFromCarImages = carImgSourceUnprocessed.substring(startIndex);

//             }

//         carImg.src = pathFromCarImages;
//         carImg.style.width = "150px";
//         carImg.style.height = "150px";
//         reservation_modal_content_container.appendChild(carImg);

//         let carText = document.createElement('h3');
//         carText.textContent = button.parentElement.children[0].textContent.trim();
//         let carType = document.createElement('h3');
//         carType.textContent = button.parentElement.children[1].textContent.trim();
//         let carMileage = document.createElement('h3');
//         carMileage.textContent = button.parentElement.children[2].textContent.trim();
//         let carFuel = document.createElement('h3');
//         carFuel.textContent = button.parentElement.children[3].textContent.trim();
//         let carSeats = document.createElement('h3');
//         carSeats.textContent = button.parentElement.children[4].textContent.trim();
//         let carPrice = document.createElement('h3');
//         carPrice.textContent = button.parentElement.children[5].textContent.trim();

//         let quantityInput = document.createElement('input');
//         let quantityInputAddButton = document.createElement('button');
//         let quantityInputMinusButton = document.createElement('button');
//         let quantityInputContainer = document.createElement('div');

//         let reservation_modal_content_container_container = document.createElement('div');

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
//                             if((car.brand + " " + car.model) === button.parentElement.children[0].textContent.trim()) {
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
//         reservation_modal_content_container.style.display = "flex";
//         reservation_modal_content_container.style.flexDirection = "column";
//         reservation_modal_content_container.style.gap = "1rem";
//         reservation_modal_content_container.style.alignItems = "center";

//         //Reservation Modal Content Container Container Styling
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
        
//         reservation_modal_content_container_container.appendChild(reservation_modal_content_container);
//         reservation_modal_content_container_container.appendChild(quantityInputContainer);
//         reservation_modal_content_container_container.appendChild(dateContainer);

        

//         reservation_main_modal.appendChild(reservation_modal_content_container_container);
        
//         document.body.appendChild(reservation_main_modal);
//         document.body.appendChild(reservation_modal_underlay);
 
//     });
// });

//Reservation

let reservation = document.getElementById("reservation");

reservation.addEventListener('click', function() {
    generateReservationModal();

});

//Generate Reservation Modal
function generateReservationModal() {
    let reservation_main_modal = document.createElement('div');
    let reservation_modal_title = document.createElement('h3');
    let reservation_modal_close_img = document.createElement('img');
    let reservation_modal_title_container = document.createElement('div');
    let reservation_modal_underlay = document.createElement('div');

    function closeMainReservationModal() {
        document.body.removeChild(reservation_main_modal);
        document.body.removeChild(reservation_modal_underlay);
        document.body.style.overflow = "auto";
    }

    window.addEventListener('click', function(event) {
        if (event.target == reservation_modal_underlay) {
            closeMainReservationModal();
        }
    });

    //Reservation Modal img (Close)
    reservation_modal_close_img.src = "images/close.png";
    reservation_modal_close_img.style.width = "20px";
    reservation_modal_close_img.style.height = "20px";

    reservation_modal_close_img.addEventListener('click', function() {
        closeMainReservationModal();
    });

    //Reservation Modal Title
    reservation_modal_title.textContent = "Your Reservations";

    //Container for reservation modal title and img
    reservation_modal_title_container.style.display = "flex";
    reservation_modal_title_container.style.justifyContent = "space-between";
    reservation_modal_title_container.style.padding = "2rem";

    //Main reservation modal
    reservation_main_modal.style.zIndex = "2147483647";
    reservation_main_modal.style.position = "absolute";
    reservation_main_modal.style.backgroundColor = "white";
    reservation_main_modal.style.width = "500px";
    reservation_main_modal.style.height = "100%";
    reservation_main_modal.style.top = "0";
    reservation_main_modal.style.right = "0";

    //Reservation Modal Underlay
    reservation_modal_underlay.style.zIndex = "2147483646";
    reservation_modal_underlay.style.position = "absolute";
    reservation_modal_underlay.style.backgroundColor = "grey";
    reservation_modal_underlay.style.opacity = "0.8";
    reservation_modal_underlay.style.width = "100%";
    reservation_modal_underlay.style.height = "100%";

    //Prevent Scrolling
    document.body.style.overflow = "hidden";

    reservation_modal_title_container.appendChild(reservation_modal_title);
    reservation_modal_title_container.appendChild(reservation_modal_close_img);
    reservation_main_modal.appendChild(reservation_modal_title_container);
    document.body.appendChild(reservation_main_modal);
    document.body.appendChild(reservation_modal_underlay);
}


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
                        } else {
                            // let cardHtml = '';
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
                                    <button class="addToCartBtn" onclick="addReservationForNonMain(event)">Rent</button>
                                    <input type="hidden" value="${car.id}"/>
                                </div>
                            </div>
                        `;
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
    category_main_modal.style.position = "absolute";
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
    modal_underlay.style.position = "absolute";
    modal_underlay.style.backgroundColor = "grey";
    modal_underlay.style.opacity = "0.8";
    modal_underlay.style.width = "100%";
    modal_underlay.style.height = "100%";


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

function disabledCardGeneratorFunc(car) {
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
            <button class="addToCartBtn" onclick="addReservationForNonMain(event)">Rent</button>
            <input type="hidden" value="${car.id}"/>
        </div>
    </div>
`;
}



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

