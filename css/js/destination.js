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
${destination.weatherOctober}
</p>

<p>
💰 Cost Rating:
${destination.costRating}/10
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

`;

container.appendChild(card);


});


});
