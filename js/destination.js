console.log("Destination JS loaded");

let allDestinations = [];
let currentDestinations = [];

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

function generateReasons(destination) {


    let reasons = [];


    if (destination.kidsActivities >= 9)
        reasons.push("👧 Excellent kids activities");


    if (destination.kidsClub >= 8)
        reasons.push("🏨 Great kids club options");


    if (destination.poolResorts >= 9)
        reasons.push("🏊 Excellent pool resorts");


    if (destination.beaches >= 9)
        reasons.push("🏖 Beautiful family beaches");


    if (destination.audValueRating >= 9)
        reasons.push("💱 Strong AUD value");


    if (destination.shopping >= 8)
        reasons.push("🛍 Good shopping nearby");


    return reasons.slice(0,4);

}



// Top Recommendations

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

b.matchScore - a.matchScore

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
