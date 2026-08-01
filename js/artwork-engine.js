function getParameter(name){

    const params = new URLSearchParams(window.location.search);

    return params.get(name);

}

function loadArtwork(){

    const id = getParameter("id");

    if(!id) return;

    const artwork = getArtworkById(id);

    if(!artwork) return;

    document.title = "Van© — " + artwork.title;

    document.getElementById("artwork-title").textContent =
        artwork.title;

    document.getElementById("artwork-price").textContent =
        artwork.price + " €";

    document.getElementById("artwork-image").style.backgroundImage =
        `url('${artwork.thumbnail}')`;

    document.getElementById("artwork-technique").textContent =
        artwork.technique;

    document.getElementById("artwork-collection").textContent =
        artwork.collection;

    document.getElementById("artwork-year").textContent =
        artwork.year;

    document.getElementById("artwork-dimensions").textContent =
        artwork.dimensions;

    document.getElementById("artwork-edition").textContent =
        artwork.edition;

    document.getElementById("artwork-description").textContent =
        artwork.description;

    paypal.HostedButtons({

        hostedButtonId: artwork.paypalHostedButtonId

    }).render("#paypal-container");

}

window.onload = loadArtwork;