let allDestinations = [];
let currentDestinations = [];


// Load destination data

fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => response.json())

.then(data => {

    allDestinations = data;
    currentDestinations = data;

    displayDestinations(data);

})

.catch(error => {

    console.error("Error loading destinations:", error);

});



// Display destination cards

function displayDestinations(destinations) {

    const container = document.getElementById("destinationContainer");

    if (!container) {
        console.error("Destination container not found");
        return;
    }


    container.innerHTML = "";


    destinations.forEach(destination => {


        container.innerHTML += `

        <div class="destination-card">

            <h2>
            ${destination.city}, ${destination.country}
            </h2>


            <p>
            ⭐ Family Score:
            ${destination.familyScore}/100
            </p>


            <p>
            🌦 October Weather:
            ${destination.octoberWeather}
            </p>


            <p>
            💰 Daily Cost:
            $${destination.dailyCostAUD} AUD
            </p>


            <p>
            💱 AUD Value:
            ${destination.audValueRating}/10
            </p>


            <p>
            👧 Kids Activities:
            ${destination.kidsActivities}/10
            </p>


            <p>
            🏨 Kids Club:
            ${destination.kidsClub}/10
            </p>


            <p>
            🏊 Pool Resorts:
            ${destination.poolResorts}/10
            </p>


            <p>
            🏖 Beaches:
            ${destination.beaches}/10
            </p>


            <p>
            🛍 Shopping:
            ${destination.shopping}/10
            </p>


            <p>
            🚤 Day Trips:
            ${destination.dayTrips}/10
            </p>


        </div>

        `;


    });


}



// Search function

const searchBox = document.getElementById("searchBox");


if (searchBox) {


searchBox.addEventListener("input", function() {


    let search = this.value.toLowerCase();


    let filtered = allDestinations.filter(destination => {


        return (

        destination.city.toLowerCase().includes(search)

        ||

        destination.country.toLowerCase().includes(search)

        );


    });


    displayDestinations(filtered);


});


}




// Country filter buttons

function filterDestinations(country) {


    if (country === "all") {


        displayDestinations(allDestinations);

        return;


    }



    let filtered = allDestinations.filter(destination => {


        return destination.country === country;


    });



    displayDestinations(filtered);


}





// Sorting function

const sortOptions = document.getElementById("sortOptions");


if (sortOptions) {


sortOptions.addEventListener("change", function() {


    let option = this.value;



    let sorted = [...allDestinations].sort((a,b) => {


        return b[option] - a[option];


    });



    displayDestinations(sorted);



});


}
