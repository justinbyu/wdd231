const state = {
  destinations: [],
  favorites: JSON.parse(localStorage.getItem("wanderph-favorites") || "[]")
};

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setCurrentYear();
  setupExplorePage();
  setupFormActionPage();
  setupPlannerStorage();
});

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    });
  });
}

function setCurrentYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

async function setupExplorePage() {
  const list = document.querySelector("#destination-list");
  if (!list) return;

  const loading = document.querySelector("#loading-message");
  const empty = document.querySelector("#empty-message");
  const count = document.querySelector("#destination-count");
  const searchInput = document.querySelector("#search-input");
  const typeFilter = document.querySelector("#type-filter");

  try {
    const response = await fetch("data/destinations.json");

    if (!response.ok) {
      throw new Error(`Data request failed: ${response.status}`);
    }

    state.destinations = await response.json();

    if (!Array.isArray(state.destinations)) {
      throw new Error("Destination data is not an array.");
    }

    loading.classList.add("hidden");
    count.textContent = state.destinations.length;
    renderDestinations();

    searchInput.addEventListener("input", renderDestinations);
    typeFilter.addEventListener("change", renderDestinations);

    setupModal();
  } catch (error) {
    loading.textContent = "We could not load the destination data. Please refresh the page.";
    console.error("WanderPH data error:", error);
  }

  function renderDestinations() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;

    const filtered = state.destinations.filter(destination => {
      const searchableText = [
        destination.name,
        destination.region,
        destination.province,
        destination.type,
        destination.description,
        destination.highlight
      ].join(" ").toLowerCase();

      const matchesSearch = searchableText.includes(query);
      const matchesType = selectedType === "all" || destination.type === selectedType;

      return matchesSearch && matchesType;
    });

    list.innerHTML = filtered.map(createDestinationCard).join("");
    empty.classList.toggle("hidden", filtered.length !== 0);

    list.querySelectorAll("[data-details]").forEach(button => {
      button.addEventListener("click", () => openDestination(button.dataset.details));
    });

    list.querySelectorAll("[data-favorite]").forEach(button => {
      button.addEventListener("click", () => toggleFavorite(Number(button.dataset.favorite)));
    });
  }
}

function createDestinationCard(destination) {
  const isFavorite = state.favorites.includes(destination.id);

  return `
    <article class="destination-card">
      <div class="destination-art art-${destination.type.toLowerCase()}">
        <span>${destination.type}</span>
        <strong>${destination.name.slice(0, 1)}</strong>
      </div>
      <div class="destination-body">
        <div class="card-topline">
          <span>${destination.region}</span>
          <button class="favorite-button ${isFavorite ? "is-favorite" : ""}" 
            type="button" data-favorite="${destination.id}"
            aria-label="${isFavorite ? "Remove" : "Add"} ${destination.name} ${isFavorite ? "from" : "to"} favorites"
            title="${isFavorite ? "Remove favorite" : "Save favorite"}">
            ${isFavorite ? "★" : "☆"}
          </button>
        </div>
        <h2>${destination.name}</h2>
        <p>${destination.description}</p>
        <dl class="mini-details">
          <div><dt>Style</dt><dd>${destination.type}</dd></div>
          <div><dt>Budget</dt><dd>${destination.budget}</dd></div>
        </dl>
        <button class="text-button" type="button" data-details="${destination.id}">
          View details →
        </button>
      </div>
    </article>
  `;
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(item => item !== id);
  } else {
    state.favorites.push(id);
  }

  localStorage.setItem("wanderph-favorites", JSON.stringify(state.favorites));

  const searchInput = document.querySelector("#search-input");
  if (searchInput) searchInput.dispatchEvent(new Event("input"));
}

function setupModal() {
  const modal = document.querySelector("#destination-modal");
  const closeButton = document.querySelector("#modal-close");

  if (!modal || !closeButton) return;

  closeButton.addEventListener("click", () => modal.close());

  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
}

function openDestination(id) {
  const destination = state.destinations.find(item => item.id === Number(id));
  const modal = document.querySelector("#destination-modal");

  if (!destination || !modal) return;

  document.querySelector("#modal-type").textContent = `${destination.type} • ${destination.region}`;
  document.querySelector("#modal-title").textContent = destination.name;

  document.querySelector("#modal-content").innerHTML = `
    <p class="modal-description">${destination.description}</p>
    <div class="modal-details">
      <div><strong>Province</strong><span>${destination.province}</span></div>
      <div><strong>Travel style</strong><span>${destination.type}</span></div>
      <div><strong>Budget</strong><span>${destination.budget}</span></div>
      <div><strong>Best season</strong><span>${destination.bestSeason}</span></div>
      <div><strong>Must-see</strong><span>${destination.highlight}</span></div>
    </div>
  `;

  modal.showModal();
}

function setupPlannerStorage() {
  const form = document.querySelector(".trip-form");
  if (!form) return;

  const styleSelect = form.querySelector('[name="style"]');
  const savedStyle = localStorage.getItem("wanderph-style");

  if (savedStyle && styleSelect) {
    styleSelect.value = savedStyle;
  }

  form.addEventListener("change", event => {
    if (event.target.name === "style") {
      localStorage.setItem("wanderph-style", event.target.value);
    }
  });
}

function setupFormActionPage() {
  const result = document.querySelector("#form-result");
  if (!result) return;

  const params = new URLSearchParams(window.location.search);
  const fields = [
    ["Traveler", "name"],
    ["Email", "email"],
    ["Travel style", "style"],
    ["Trip length", "days", " days"],
    ["Budget", "budget"],
    ["Region", "region"],
    ["Notes", "notes"]
  ];

  const name = params.get("name") || "Traveler";
  document.querySelector("#result-title").textContent = `${name}'s trip brief`;

  if (!params.has("name")) {
    document.querySelector("#result-intro").textContent =
      "No form data was submitted yet. Return to the planner to create your trip brief.";
  }

  result.innerHTML = fields.map(([label, key, suffix = ""]) => {
    const value = params.get(key) || "Not provided";
    return `
      <div class="result-item">
        <span>${label}</span>
        <strong>${escapeHtml(value)}${suffix}</strong>
      </div>
    `;
  }).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}
