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
}
    function calculateFamilyScore(destination) {


    let score = 0;


    score += destination.kidsActivities * 2.5;
    score += destination.kidsClub * 2;
    score += destination.poolResorts * 1.5;
    score += destination.beaches * 1.5;
    score += destination.audValueRating * 1;


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



// Feature 5.1 - Ranking Reasons

function generateReasons(destination) {


    let reasons = [];


    if (destination.kidsActivities >= 9) {

        reasons.push("👧 Excellent kids activities");

    }


    if (destination.kidsClub >= 8) {

        reasons.push("🏨 Great kids club options");

    }


    if (destination.poolResorts >= 9) {

        reasons.push("🏊 Excellent pool resorts");

    }


    if (destination.beaches >= 9) {

        reasons.push("🏖 Beautiful family beaches");

    }


    if (destination.audValueRating >= 9) {

        reasons.push("💱 Strong AUD value");

    }


    if (destination.shopping >= 8) {

        reasons.push("🛍 Good shopping nearby");

    }


    return reasons.slice(0,4);

}
   function generateReasons(destination) {


    let reasons = [];


    if (destination.kidsActivities >= 9) {

        reasons.push("👧 Excellent kids activities");

    }


    if (destination.kidsClub >= 8) {

        reasons.push("🏨 Great kids club options");

    }


    if (destination.poolResorts >= 9) {

        reasons.push("🏊 Excellent pool resorts");

    }


    if (destination.beaches >= 9) {

        reasons.push("🏖 Beautiful family beaches");

    }


    if (destination.audValueRating >= 9) {

        reasons.push("💱 Strong AUD value");

    }


    if (destination.shopping >= 8) {

        reasons.push("🛍 Good shopping nearby");

    }


    return reasons.slice(0,4);

} 

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
<strong>Why it ranked:</strong>
</p>

<ul>

${generateReasons(destination)
.map(reason => `<li>${reason}</li>`)
.join("")}

</ul>

<p>
<strong>Things to consider:</strong>
</p>

<p>

${destination.octoberWeather}

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
