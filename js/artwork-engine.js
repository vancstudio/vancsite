function getParameter(name) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get(name);

}


function loadArtwork() {

    const mode =
        getParameter("mode") || "catalog";

    const id =
        getParameter("id");

    if (!id) return;


    const artwork =
        getArtworkById(id);

    if (!artwork) return;


    document.title =
        "Van© — " + artwork.title;


    document.getElementById(
        "artwork-title"
    ).textContent =
        artwork.title;


    document.getElementById(
        "artwork-price"
    ).textContent =
        artwork.price + " €";


    document.getElementById(
        "artwork-image"
    ).style.backgroundImage =
        `url('${artwork.images.main}')`;


    document.getElementById(
        "artwork-technique"
    ).textContent =
        artwork.technique;


    document.getElementById(
        "artwork-collection"
    ).textContent =
        artwork.collection;


    document.getElementById(
        "artwork-year"
    ).textContent =
        artwork.year;


    document.getElementById(
        "artwork-dimensions"
    ).textContent =
        artwork.dimensions;


    document.getElementById(
        "artwork-edition"
    ).textContent =
        artwork.edition;


    document.getElementById(
        "artwork-description"
    ).textContent =
        artwork.description;


    const action =
        document.getElementById(
            "artwork-action"
        );


    const paypalWrapper =
        document.querySelector(
            ".paypal-wrapper"
        );


    if (mode === "gallery") {


        if (
            artwork.status ===
            "available"
        ) {

            action.innerHTML = `
                <a href="artwork.html?id=${artwork.id}&mode=catalog">
                    Ver disponibilidad en el Catálogo →
                </a>
            `;

        } else {

            action.innerHTML = `
                <p>
                    Esta obra no está disponible actualmente.
                </p>
            `;

        }


        paypalWrapper.style.display =
            "none";


    } else {


        action.innerHTML = "";


        if (
            artwork.status === "available" &&
            artwork.paypal &&
            artwork.paypal.enabled &&
            artwork.paypal.hostedButtonId
        ) {

            paypalWrapper.style.display =
                "block";


            paypal.HostedButtons({

                hostedButtonId:
                    artwork.paypal.hostedButtonId

            }).render(
                "#paypal-container"
            );


        } else {

            paypalWrapper.style.display =
                "none";

            action.innerHTML = `
                <p>
                    Esta obra no está disponible actualmente.
                </p>
            `;

        }

    }

}


window.onload =
    loadArtwork;