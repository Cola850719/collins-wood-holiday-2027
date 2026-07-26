console.log("Destination JS loaded");

let allDestinations = [];
let currentDestinations = [];


// Load destination data

fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => response.json())

.then(data => {

    console.log("Destinations loaded:", data.length);

    allDestinations = data;
    currentDestinations = data;

    displayDestinations(data);

})

.catch(error => {

    console.error("JSON loading error:", error);

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
        🌦 October:
        ${destination.octoberWeather}
        </p>


        <p>
        💰 Cost:
        $${destination.dailyCostAUD} AUD/day
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
        🏖 Beaches:
        ${destination.beaches}/10
        </p>


        </div>


        `;


    });


}



// Search

const searchBox = document.getElementById("searchBox");


if (searchBox) {


searchBox.addEventListener("input", function(){


let search = this.value.toLowerCase();


let filtered = allDestinations.filter(destination =>


destination.city.toLowerCase().includes(search) ||

destination.country.toLowerCase().includes(search)


);


displayDestinations(filtered);


});


}




// Country filters

function filterDestinations(country){


if(country === "all"){


displayDestinations(allDestinations);

return;


}


let filtered = allDestinations.filter(destination =>

destination.country === country

);


displayDestinations(filtered);


}





// Sorting

const sortOptions = document.getElementById("sortOptions");


if(sortOptions){


sortOptions.addEventListener("change", function(){


let option = this.value;


let sorted = [...allDestinations].sort((a,b)=>{


if(option === "dailyCostAUD"){

return a[option] - b[option];

}


return b[option] - a[option];


});


displayDestinations(sorted);


});


}




// Family Match Score

function calculateFamilyScore(destination) {


let score = 0;


score += destination.kidsActivities * 2.5;

score += destination.kidsClub * 2;

score += destination.poolResorts * 1.5;

score += destination.beaches * 1.5;

score += destination.audValueRating * 1;


if(destination.dailyCostAUD <= 150){

score += 5;

}

else if(destination.dailyCostAUD <= 200){

score += 4;

}

else if(destination.dailyCostAUD <= 250){

score += 3;

}

else{

score += 2;

}


return Math.round(score);


}
