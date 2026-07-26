let allDestinations = [];
let currentDestinations = [];


// Load destination data

fetch("../data/destinations.json")

.then(response => response.json())

.then(data => {

    allDestinations = data;
    currentDestinations = data;

    displayDestinations(data);
    displayTopRecommendations();

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
            🏆 Family Match:
            ${calculateFamilyScore(destination)}/100
            </p>

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


        return a[option] - b[option];


    });



    displayDestinations(sorted);



});


}

// Calculate Family Match Score

function displayTopRecommendations(){


let ranked = [...allDestinations]


.map(destination => {


return {

...destination,

matchScore:
calculateFamilyScore(destination)

};


})


.sort((a,b)=>

b.matchScore-a.matchScore

)


.slice(0,5);



const container =
document.getElementById("topRecommendations");


if (!container) return;



container.innerHTML = "";



ranked.forEach(destination => {


container.innerHTML += `

<div class="recommendation-card">


<h3>
${destination.city}, ${destination.country}
</h3>


<p>
🏆 Match Score:
${destination.matchScore}/100
</p>


<p>
👧 Kids:
${destination.kidsActivities}/10
</p>


<p>
🏖 Beach:
${destination.beaches}/10
</p>


<p>
💰 Cost:
$${destination.dailyCostAUD} AUD/day
</p>


</div>


`;


});


}

function calculateFamilyScore(destination) {


    let score = 0;


    score += destination.kidsActivities * 2.5;

    score += destination.kidsClub * 2;

    score += destination.poolResorts * 1.5;

    score += destination.beaches * 1.5;

    score += destination.audValueRating * 1;

    

    // Cost scoring
    if (destination.dailyCostAUD <= 150) {

        score += 5;

    } 
    else if (destination.dailyCostAUD <= 200) {

        score += 4;

    }
    else if (destination.dailyCostAUD <= 250) {

        score += 3;

    }
    else {

        score += 2;

    }


    return Math.round(score);

}
