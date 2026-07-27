console.log("Recommendations JS loaded- FEATURE 5.1B TEST");


// Wait for destination data to load

setTimeout(() => {


    if (!window.allDestinations) {

        console.error("No destination data available");

        return;

    }


    console.log(
        "Building recommendations from:",
        window.allDestinations.length,
        "destinations"
    );


    const topRecommendations = createRecommendations(
        window.allDestinations
    );


    console.log(
        "Top Recommendations:",
        topRecommendations
    );

console.log(Calling displayRecommendations");
    
displayRecommendations(topRecommendations);

}, 2000);





// Create recommendation rankings

function createRecommendations(destinations) {


    return destinations

    .map(destination => {


        return {

            ...destination,

            matchScore:
            calculateRecommendationScore(destination)

        };


    })


    .sort((a,b) =>

        b.matchScore - a.matchScore

    )


    .slice(0,5);


}





// Calculate family holiday score

function calculateRecommendationScore(destination) {


    let score = 0;


    // Kids experience

    score += destination.kidsActivities * 3;


    // Kids club

    score += destination.kidsClub * 2;


    // Resort quality

    score += destination.poolResorts * 2;


    // Beaches

    score += destination.beaches * 2;


    // AUD value

    score += destination.audValueRating * 1;


    // Cost bonus

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

// Display Top 5 Recommendation Cards

function displayRecommendations(recommendations) {

    console.log("Displaying recommendation cards");

    const container = document.getElementById(
        "recommendationContainer"
    );


    if (!container) {

        console.error(
            "Recommendation container not found"
        );

        return;

    }


    container.innerHTML = "";
    
    console.log("Recommendation container:", container);
    console.log("Cards to display:", recommendations.length);


    recommendations.forEach((destination, index) => {


        container.innerHTML += `

        <div class="destination-card">


            <h2>
            🏆 ${index + 1}. 
            ${destination.city}, ${destination.country}
            </h2>


            <p>
            ⭐ Match Score:
            ${destination.matchScore}/100
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


            <p>
            🏊 Pool Resorts:
            ${destination.poolResorts}/10
            </p>


            <p>
            🌦 October:
            ${destination.octoberWeather}
            </p>


            <p>
            💰 Cost:
            $${destination.dailyCostAUD} AUD/day
            </p>


        </div>

        `;


    });


}
