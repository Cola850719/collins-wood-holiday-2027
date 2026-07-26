console.log("Destination JS loaded");

let allDestinations = [];
let currentDestinations = [];

// Load destination data

fetch("/collins-wood-holiday-2027/data/destinations.json")

.then(response => {

    console.log("Status:", response.status);

    return response.json();

})

.then(data => {

    console.log("Loaded destinations:", data.length);

    allDestinations = data;

    displayDestinations(data);

})

.catch(error => {

    console.error("JSON loading error:", error);

});

});

// Calculate Family Match Score

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


