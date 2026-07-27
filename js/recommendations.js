console.log("Recommendations JS loaded - FEATURE 5.1B TEST");


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


    console.log("Calling displayRecommendations");


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


    const priorities = window.familyProfile.priorities;


    // Kids activities importance

    score += destination.kidsActivities *
    priorities.kidsActivities;


    // Kids club importance

    score += destination.kidsClub *
    priorities.kidsClub;


    // Beaches importance

    score += destination.beaches *
    priorities.beaches;


    // Resort/pool importance

    score += destination.poolResorts *
    priorities.poolResorts;


    // Value for money

    score += destination.audValueRating *
    priorities.valueForMoney;



    // Easy family holiday bonus

    if (
        destination.kidsActivities >= 9 &&
        destination.kidsClub >= 8 &&
        destination.poolResorts >= 9
    ) {

        score += priorities.easyHoliday;

    }



    // Cost adjustment

    if(destination.dailyCostAUD <= 150){

        score += 10;

    }

    else if(destination.dailyCostAUD <= 200){

        score += 7;

    }

    else if(destination.dailyCostAUD <= 250){

        score += 4;

    }

    else {

        score += 1;

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


    console.log(
        "Recommendation container:",
        container
    );


    console.log(
        "Cards to display:",
        recommendations.length
    );



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
            <strong>
            ⭐ Why it ranked:
            </strong>
            </p>


            <ul>

            ${generateRecommendationReasons(destination)
            .map(reason => `<li>${reason}</li>`)
            .join("")}

            </ul>


            <p>
            📍 Recommended Area:
            ${destination.recommendedArea}
            </p>


            <p>
            🏨 Resort Style:
            ${destination.resortStyle}
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





// Generate recommendation reasons

function generateRecommendationReasons(destination) {


    let reasons = [];


    if (destination.kidsActivities >= 9) {

        reasons.push(
            "👧 Excellent kids activities"
        );

    }


    if (destination.kidsClub >= 8) {

        reasons.push(
            "🏨 Great kids club options"
        );

    }


    if (destination.poolResorts >= 9) {

        reasons.push(
            "🏊 Fantastic family resort pools"
        );

    }


    if (destination.beaches >= 9) {

        reasons.push(
            "🏖 Beautiful family beaches"
        );

    }


    if (destination.audValueRating >= 9) {

        reasons.push(
            "💰 Strong AUD value"
        );

    }


    if (destination.bestFor) {

        reasons.push(
            "⭐ " + destination.bestFor
        );

    }


    return reasons.slice(0,5);

}

