fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => response.json())

.then(destinations => {

const container = document.getElementById("destination-list");


destinations.forEach(destination => {


const card = document.createElement("div");

card.className = "card";


card.innerHTML = `

<h2>
${destination.city}, ${destination.country}
</h2>

<p>
💱 Currency: ${destination.currency}
</p>

<p>
⭐ Family Score: ${destination.familyScore}/100
</p>

<p>
🌦 October Weather:
${destination.octoberWeather}
</p>

<p>
💰 Daily Cost:
$${destination.dailyCostAUD} AUD

<p>
💰AUD Value:
${destination.audValueRating}/10
</p>

<p>
👧 Kids Activities:
${destination.kidsActivities}/10
</p>

<p>
🏖 Beaches:
${destination.beaches}/10
</p>

<p>
🚤 Day Trips:
${destination.dayTrips}/10
</p>

<p>
🏨 Kids Club: ${destination.kidsClub}/10
</p>

`;

container.appendChild(card);


});

})

.catch(error => {

console.log("Error loading destinations:", error);

});
