import { formatBudget, styleLabel } from "./destination-utils.js";

const grid = document.querySelector("#destination-grid");
const searchInput = document.querySelector("#search");
const styleFilter = document.querySelector("#style-filter");
const favoritesButton = document.querySelector("#favorites-only");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#destination-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogClose = document.querySelector("#dialog-close");

let destinations = [];
let favorites = JSON.parse(localStorage.getItem("wanderPHFavorites") || "[]");
let favoritesOnly = false;

const loadDestinations = async () => {
  try {
    const response = await fetch("data/destinations.json");

    if (!response.ok) {
      throw new Error(`Destination data request failed: ${response.status}`);
    }

    destinations = await response.json();

    if (!Array.isArray(destinations) || destinations.length < 15) {
      throw new Error("The destination dataset must contain at least 15 items.");
    }

    renderDestinations();
  } catch (error) {
    resultsCount.textContent = "Destination data could not be loaded.";
    emptyState.hidden = false;
    emptyState.textContent = "Sorry, WanderPH could not load the destination collection.";
    console.error(error);
  }
};

const saveFavorites = () => {
  localStorage.setItem("wanderPHFavorites", JSON.stringify(favorites));
};

const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  renderDestinations();
};

const openModal = (destination) => {
  dialogBody.innerHTML = `
    <p class="eyebrow">Destination details</p>
    <h2>${destination.name}</h2>
    <p class="dialog-region">${destination.region}</p>
    <p>${destination.description}</p>

    <div class="dialog-details">
      <div>
        <strong>Travel style</strong>
        <span>${styleLabel(destination.style)}</span>
      </div>
      <div>
        <strong>Destination type</strong>
        <span>${destination.type}</span>
      </div>
      <div>
        <strong>Estimated budget</strong>
        <span>${formatBudget(destination.budget)}</span>
      </div>
      <div>
        <strong>Best season</strong>
        <span>${destination.season}</span>
      </div>
      <div>
        <strong>Ideal activity</strong>
        <span>${destination.activity}</span>
      </div>
    </div>
  `;

  dialog.showModal();
};

const createCard = (destination, index) => {
  const isFavorite = favorites.includes(destination.id);

  const card = document.createElement("article");
  card.className = "destination-card";

  card.innerHTML = `
    <div class="destination-visual">
      <span class="destination-number">DESTINATION ${String(index + 1).padStart(2, "0")}</span>
      <span class="destination-icon" aria-hidden="true">${destination.icon}</span>
    </div>

    <div class="destination-body">
      <h2>${destination.name}</h2>
      <p class="destination-region">${destination.region}</p>
      <p class="destination-description">${destination.description}</p>

      <div class="destination-meta">
        <span><strong>Type:</strong> ${destination.type}</span>
        <span><strong>Budget:</strong> ${formatBudget(destination.budget)}</span>
        <span><strong>Season:</strong> ${destination.season}</span>
      </div>

      <div class="destination-actions">
        <button class="button button-primary details-button" type="button">
          View details
        </button>

        <button
          class="favorite-button ${isFavorite ? "is-favorite" : ""}"
          type="button"
          aria-pressed="${isFavorite}"
          aria-label="${isFavorite ? "Remove" : "Save"} ${destination.name} ${isFavorite ? "from" : "to"} favorites">
          ${isFavorite ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </div>
  `;

  card.querySelector(".details-button").addEventListener("click", () => {
    openModal(destination);
  });

  card.querySelector(".favorite-button").addEventListener("click", () => {
    toggleFavorite(destination.id);
  });

  return card;
};

const renderDestinations = () => {
  const query = searchInput.value.trim().toLowerCase();
  const selectedStyle = styleFilter.value;

  const filtered = destinations
    .filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(query) ||
        destination.region.toLowerCase().includes(query) ||
        destination.type.toLowerCase().includes(query);

      const matchesStyle =
        selectedStyle === "all" || destination.style === selectedStyle;

      const matchesFavorite =
        !favoritesOnly || favorites.includes(destination.id);

      return matchesSearch && matchesStyle && matchesFavorite;
    });

  grid.replaceChildren();

  filtered.forEach((destination, index) => {
    grid.appendChild(createCard(destination, index));
  });

  resultsCount.textContent = `${filtered.length} of ${destinations.length} destinations shown`;
  emptyState.hidden = filtered.length !== 0;
};

searchInput.addEventListener("input", renderDestinations);
styleFilter.addEventListener("change", renderDestinations);

favoritesButton.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  favoritesButton.setAttribute("aria-pressed", String(favoritesOnly));
  favoritesButton.textContent = favoritesOnly ? "Show all destinations" : "Show favorites";
  renderDestinations();
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

loadDestinations();
