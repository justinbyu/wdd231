const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const directory = document.getElementById('directory');

// Toggle views
gridBtn.addEventListener('click', () => {
  directory.classList.add('grid-view');
  directory.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  directory.classList.add('list-view');
  directory.classList.remove('grid-view');
});

// Footer year and last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const members = await response.json();

    // Clear directory before rendering
    directory.innerHTML = '';

    members.forEach(member => {
      const article = document.createElement('article');
      article.classList.add('member');

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
    console.error('Error loading members:', error);
    directory.innerHTML = '<p>Unable to load member directory at this time.</p>';
  }
}

loadMembers();
