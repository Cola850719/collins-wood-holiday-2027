let allDestinations = [];
let currentDestinations = [];

fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => response.json())
  
.then(data => {

    allDestinations = data;
    currentDestinations = data;

    displayDestinations(data);

});
.catch(error => {

    console.error("Error loading destinations:", error);
  });

function displayDestinations(destinations){

    const container = document.getElementById("destinationContainer");

    container.innerHTML = "";

    destinations.forEach(destination => {

        container.innerHTML += `

        <div class="destination-card">

            <h2>
            ${destination.city}, ${destination.country}
            </h2>

            <p>⭐ Family Score:
            ${destination.familyScore}/100
            </p>

            <p>🌦 October:
            ${destination.octoberWeather}
            </p>

            <p>💰 Daily Cost:
            $${destination.dailyCostAUD} AUD
            </p>

            <p>💱 AUD Value:
            ${destination.audValueRating}/10
            </p>

            <p>👧 Kids Activities:
            ${destination.kidsActivities}/10
            </p>

            <p>🏨 Kids Club:
            ${destination.kidsClub}/10
            </p>

            <p>🏖 Beaches:
            ${destination.beaches}/10
            </p>

        </div>

        `;

    });

}
  

    let search = this.value.toLowerCase();

    let filtered = allDestinations.filter(destination =>

        destination.city.toLowerCase().includes(search) ||
        destination.country.toLowerCase().includes(search)

    );

    displayDestinations(filtered);

});

function filterDestinations(country){

    if(country === "all"){

        displayDestinations(allDestinations);
        return;

    }


    let filtered =
    allDestinations.filter(destination =>

        destination.country === country

    );


    displayDestinations(filtered);

}
document
.getElementById("sortOptions")
.addEventListener("change", function(){

let option = this.value;


let sorted =
[...allDestinations].sort((a,b)=>

b[option]-a[option]

);


displayDestinations(sorted);


});
