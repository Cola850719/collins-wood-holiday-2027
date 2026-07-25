console.log("Destination script loaded");


fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => {

    console.log("Response received:", response);

    return response.json();

})

.then(destinations => {

    console.log("Destinations loaded:", destinations);


    const container = document.getElementById("destination-list");


    destinations.forEach(destination => {


        const card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

        <h2>${destination.city}, ${destination.country}</h2>

        <p>⭐ Family Score: ${destination.familyScore}</p>

        <p>💱 Currency: ${destination.currency}</p>

        `;


        container.appendChild(card);


    });


})

.catch(error => {

console.error("ERROR:", error);

});
