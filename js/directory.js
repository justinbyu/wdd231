// Footer year + last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch members
async function loadMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  const container = document.getElementById("members");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership: ${member.membership}</p>
    `;

    container.appendChild(card);
  });
}

// Toggle views
document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("members").className = "grid";
});
document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("members").className = "list";
});

loadMembers();
