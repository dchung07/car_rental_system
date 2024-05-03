# car_rental_system
Online Car Rental System

Bugs

-> When entering search value, the category-bar increases in height, pushing down the grid of cars to the bottom of the screen. (Fixed)

-> Cant remove the opened second part of the modal. The textContent remains.
-> Can remove the opened second part of the modal however, it only works once.

-> New Option -> Just create a real second modal so that it can be deleted by document.body

-> Set up the reservation page in the mean time

-> When the sub modal is opened (e.g. brand) 
-> Loop through the json and for each brand that exists (length), generate DOM elements (buttons with the relevant brand name) and append it to the sub modal.
-> Give each button an event listener that will update the cardContainer.

-> Remember to create cardHTML for when there are no exact results (removed it previously)

-> I want to make it so clicking on the button to go from sub to main modal, if clicking on a different one (e.g. brand to type) then it should switch automatically instead of closing sub modal


-> To-Do

-> Start brainstorming how the reservation section will work

-> Click image to flip to show another type of image

-> Must add modularity it is getting too difficult to see what is happening!

To-Do

-> Reservation Page should open a right side modal.

The right side modal will have a reservation page

-> Create a quantity Selector
-> Add Start Date Selector + End Date Selector
-> Below a Cost Calculator of Total Rental Cost

-> To-Do
For now add confirmation button. It does not have to be functional at the moment, just the positioning.

-> Error when scrolling down and pressing rent, or browse categories there are stylistic destruction

-> To-Do

When adding to cart, there are two options -> use the session variable or a localhost. 

-> Session used

-> Loading the car details is a step slower. 
-> Figure out how to keep everything smooth without reloading the entire screen as that causes the reservation modal to close

-> So when click on the rent button -> we retrieve its car id through an ajax call -> Then we send another ajax call to add the items to the php cart items -> 
-> Instead of loading the data in the index.php file, load it through the DOM in AJAX, which should solve the issue of the cart items not being updated when the ajax is called.

-> To-Do

Add quantity selector / Dates


-> To-do today

-> Have a remove button to remove the item from the reservation modal and the reservation localstorage.

Add quantity selector / Dates

Style the reservation modal checkout

->By default set the car quantity to 1

-> work on the search bar recommendation logic
-> Show recent keywords when search box is focused but user has not made any inputs yet...
So have an array of localstorage where searches by the user are stored in the localstorage array. Make it a set for unique values? 
-> Give Real-time suggestions
So we need to get a list of brands, type, whatever else we want included in the search and then store each unique value inside an array.
Then we can use include() to see if the search is included in any of the array elements.