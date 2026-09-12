// Footer dates
document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("year").textContent = new Date().getFullYear();

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    const directory = document.getElementById("directory");

    members.forEach(member => {
      const article = document.createElement("article");
      article.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p>Membership Level: ${member.membership}</p>
      `;
      directory.appendChild(article);
    });
  } catch (error) {
    document.getElementById("directory").textContent = "Unable to load member directory at this time.";
    console.error("Error loading members:", error);
  }
}

loadMembers();

// Toggle views
document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("directory").classList.add("grid-view");
  document.getElementById("directory").classList.remove("list-view");
});

document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("directory").classList.add("list-view");
  document.getElementById("directory").classList.remove("grid-view");
});
