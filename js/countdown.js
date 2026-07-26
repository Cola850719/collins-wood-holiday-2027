const tripDate = new Date(
"October 9, 2027 00:00:00"
).getTime();



setInterval(function(){


let now = new Date().getTime();


let distance = tripDate - now;


let days = Math.floor(
distance / (1000*60*60*24)
);


let hours = Math.floor(
(distance%(1000*60*60*24))
/(1000*60*60)
);


let minutes=Math.floor(
(distance%(1000*60*60))
/(1000*60)
);


document.getElementById("countdown")
.innerHTML =
days+" Days "+
hours+" Hours "+
minutes+" Minutes";


},1000);
