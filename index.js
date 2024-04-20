document.getElementById('searchInput').addEventListener('input', searchFilter);

function searchFilter() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; 

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
                const carsData = JSON.parse(xhttp.responseText);
                const filteredCars = carsData.filter(car => {

                    const searchInt = parseInt(searchInput);

                    return car.availability === true &&
                        (car.brand.toLowerCase().includes(searchInput) ||
                         car.model.toLowerCase().includes(searchInput) ||
                         car.type.toLowerCase().includes(searchInput) ||
                         car.mileage.toLowerCase().includes(searchInput) ||
                         car.fuel_type.toLowerCase().includes(searchInput) ||
                         car.description.toLowerCase().includes(searchInput) ||
                         (searchInt && car.seats === searchInt)
                        );
                });

                if(filteredCars.length === 0) {
                    
                    carsData.forEach(car => {
                        const cardHtml = `
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
                                    <button onclick="addToCart('${car.brand}', '${car.model}')">Add to Cart</button>
                                </div>
                            </div>
                        `;
                        cardContainer.insertAdjacentHTML('beforeend', cardHtml);
                    });

                } else {
                    filteredCars.forEach(car => {
                        const cardHtml = `
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
                                    <button onclick="addToCart('${car.brand}', '${car.model}')">Add to Cart</button>
                                </div>
                            </div>
                        `;
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