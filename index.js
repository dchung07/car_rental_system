document.getElementById('searchInput').addEventListener('input', searchFilter);

// let sub_div_side_bars = document.querySelectorAll('.sub_div_side_bar');
// let categories_bar = document.getElementById("categories_bar");
// let content = document.getElementById("content");

// sub_div_side_bars.forEach(bar => {
//     bar.addEventListener('click', function() {
//         content.style.gridTemplateColumns = "3fr 8fr";
//         let image = document.createElement('img');
//         image.src = "images/left-arrow.png";
//         image.style.height = "30px";
//         image.style.width = "30px";
//         image.style.display = "flex";
        

//         bar.appendChild(image);
//     })
// });

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
                                
                                carsData.forEach(car => {
                                    uniqueBrands.add(car.brand);
                                    uniqueType.add(car.type);
                                });


                                if(category_sub_modal_title.textContent === "Brand") {
                                    for(const value of uniqueBrands) {
                                        
                                        let brandButton = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        brandButton.textContent = value;
                                        brandButton.classList = "brandButton";

                                        brandButton.addEventListener('click', function() {
                                            
                                            closeMainModal();
                                            searchCategory(brandButton.textContent);

                                        });

                                        category_sub_modal_content_container_content.style.display = "flex";
                                        category_sub_modal_content_container_content.style.flexDirection = "column";
                                        category_sub_modal_content_container_content.appendChild(brandButton);
                                        category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                        category_main_modal.appendChild(category_main_modal_content_container_container);
                                        document.body.appendChild(category_main_modal);

                                    }

                                } else if(category_sub_modal_title.textContent === "Type") {
                                    for(const value of uniqueType) {
                                        let typeButton = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        typeButton.textContent = value;
                                        typeButton.classList = "typeButton";

                                        typeButton.addEventListener('click', function() {
                                           
                                            closeMainModal();
                                            searchCategory(typeButton.textContent);

                                        });

                                        category_sub_modal_content_container_content.style.display = "flex";
                                        category_sub_modal_content_container_content.style.flexDirection = "column";
                                        category_sub_modal_content_container_content.appendChild(typeButton);
                                        category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                        category_main_modal.appendChild(category_main_modal_content_container_container);
                                        document.body.appendChild(category_main_modal);
                                    }
                                } else {

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
                    category_main_modal.style.width = "400px";

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
                                
                                carsData.forEach(car => {
                                    uniqueBrands.add(car.brand);
                                    uniqueType.add(car.type);
                                });


                                if(category_sub_modal_title.textContent === "Brand") {
                                    for(const value of uniqueBrands) {
                                        
                                        let brandButton = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        brandButton.textContent = value;
                                        brandButton.classList = "brandButton";

                                        brandButton.addEventListener('click', function() {
                                            
                                            closeMainModal();
                                            searchCategory(brandButton.textContent);

                                        });

                                        category_sub_modal_content_container_content.style.display = "flex";
                                        category_sub_modal_content_container_content.style.flexDirection = "column";
                                        category_sub_modal_content_container_content.appendChild(brandButton);
                                        category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                        category_main_modal.appendChild(category_main_modal_content_container_container);
                                        document.body.appendChild(category_main_modal);

                                    }

                                } else if(category_sub_modal_title.textContent === "Type") {
                                    for(const value of uniqueType) {
                                        let typeButton = document.createElement('button');
                                        let category_sub_modal_content_container_content = document.createElement('div');
                                        typeButton.textContent = value;
                                        typeButton.classList = "typeButton";

                                        typeButton.addEventListener('click', function() {
                                           
                                            closeMainModal();
                                            searchCategory(typeButton.textContent);

                                        });

                                        category_sub_modal_content_container_content.style.display = "flex";
                                        category_sub_modal_content_container_content.style.flexDirection = "column";
                                        category_sub_modal_content_container_content.appendChild(typeButton);
                                        category_sub_modal_content_container.appendChild(category_sub_modal_content_container_content);
                                        category_main_modal_content_container_container.appendChild(category_sub_modal_content_container);
                                        category_main_modal.appendChild(category_main_modal_content_container_container);
                                        document.body.appendChild(category_main_modal);
                                    }
                                } else {

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


//Filter Function (Brand / Type Input)

function searchCategory(input) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
                const carsData = JSON.parse(xhttp.responseText);
                input = input.toLowerCase();
                const filteredCars = carsData.filter(car => {
                    return car.brand.toLowerCase().includes(input) ||
                            car.type.toLowerCase().includes(input);
                });

                    cardContainer.textContent = '';
                                

                    filteredCars.forEach(car => {

                    if (car.availability === false) {
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
                                <button class="addToCartBtn">Rent</button>
                            </div>
                        </div>
                    `;
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

                // if (filteredCars.length === 0) {

                //     cardContainer.textContent = '';

                //     carsData.forEach(car => {

                //         if (car.availability === false) {
                //             let cardHtml = '';
                //             cardHtml = `
                //             <div class="card">
                //                 <div class="car-image">
                //                     <img src="car_images/${car.image}" alt="${car.brand} ${car.model}">
                //                 </div>
                //                 <div class="car-details">
                //                     <h3>${car.brand} ${car.model}</h3>
                //                     <p>Type: ${car.type}</p>
                //                     <p>Mileage: ${car.mileage}</p>
                //                     <p>Fuel Type: ${car.fuel_type}</p>
                //                     <p>Seats: ${car.seats}</p>
                //                     <p>Price per Day: $${car.price_per_day}</p>
                //                     <p>Description: ${car.description}</p>
                //                     <button class="unavailable_addToCartBtn" disabled>Rent</button>
                //                 </div>
                //             </div>
                //         `;
                //         } else {
                //             let cardHtml = '';
                //             cardHtml = `
                //             <div class="card">
                //                 <div class="car-image">
                //                     <img src="car_images/${car.image}" alt="${car.brand} ${car.model}">
                //                 </div>
                //                 <div class="car-details">
                //                     <h3>${car.brand} ${car.model}</h3>
                //                     <p>Type: ${car.type}</p>
                //                     <p>Mileage: ${car.mileage}</p>
                //                     <p>Fuel Type: ${car.fuel_type}</p>
                //                     <p>Seats: ${car.seats}</p>
                //                     <p>Price per Day: $${car.price_per_day}</p>
                //                     <p>Description: ${car.description}</p>
                //                     <button class="addToCartBtn">Rent</button>
                //                 </div>
                //             </div>
                //         `;
                //         }
                //         cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                //     });

                // } else { 
                    cardContainer.textContent = '';
                    

                    filteredCars.forEach(car => {
                        // let cardHtml = '';

                        if (car.availability === false) {
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
                                    <button class="addToCartBtn">Rent</button>
                                </div>
                            </div>
                        `;
                        }
                        cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                    });
                // }
            } else {
                console.error('Error:', xhttp.status);
            }
        }
    };

    xhttp.open('GET', 'cars.json', true);
    xhttp.send();
}

//
