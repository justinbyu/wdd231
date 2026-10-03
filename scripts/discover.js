import { discoverItems } from "../data/discover.js";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");


// ============================================
// BUILD DISCOVER CARDS
// ============================================

function displayDiscoverItems(items) {

    discoverGrid.innerHTML = "";

    items.forEach((item) => {

        const card = document.createElement("article");

        card.classList.add("discover-card");

        card.innerHTML = `
            <h2>${item.name}</h2>

            <figure>
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    width="300"
                    height="200"
                    loading="lazy"
                >
            </figure>

            <address>
                ${item.address}
            </address>

            <p>
                ${item.description}
            </p>

            <button type="button" class="learn-more">
                Learn More
            </button>
        `;

        discoverGrid.appendChild(card);
    });
}


// ============================================
// LOCAL STORAGE VISIT MESSAGE
// ============================================

function displayVisitMessage() {

    const today = Date.now();

    const lastVisit = localStorage.getItem("discoverLastVisit");

    if (!lastVisit) {

        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";

    } else {

        const previousVisit = Number(lastVisit);

        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const difference = today - previousVisit;

        const days = Math.floor(
            difference / millisecondsPerDay
        );

        if (days < 1) {

            visitMessage.textContent =
                "Back so soon! Awesome!";

        } else {

            const dayText = days === 1 ? "day" : "days";

            visitMessage.textContent =
                `You last visited ${days} ${dayText} ago.`;
        }
    }

    localStorage.setItem(
        "discoverLastVisit",
        today
    );
}


// ============================================
// DISPLAY DATA
// ============================================

displayDiscoverItems(discoverItems);

displayVisitMessage();