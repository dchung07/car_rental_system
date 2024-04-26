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