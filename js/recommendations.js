console.log("Recommendations JS loaded");


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
