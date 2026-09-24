const yearElement = document.getElementById('currentyear') || document.getElementById('year');
const modifiedElement = document.getElementById('lastModified');
if (yearElement) yearElement.textContent = new Date().getFullYear();
if (modifiedElement) modifiedElement.textContent = document.lastModified;

const menuButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

async function loadMembers() {
  const directory = document.getElementById('directory');
  if (!directory) return;
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Members request failed: ${response.status}`);
    const members = await response.json();
    directory.innerHTML = '';
    members.forEach((member) => {
      const article = document.createElement('article');
      article.className = 'member';
      article.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} business image" loading="lazy" width="600" height="450">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>Membership Level: ${member.membership}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>`;
      directory.appendChild(article);
    });
  } catch (error) {
    directory.innerHTML = '<p>Unable to load the member directory at this time.</p>';
    console.error(error);
  }
}

const gridButton = document.getElementById('gridBtn');
const listButton = document.getElementById('listBtn');
const directory = document.getElementById('directory');
if (gridButton && listButton && directory) {
  gridButton.addEventListener('click', () => {
    directory.classList.add('grid-view');
    directory.classList.remove('list-view');
  });
  listButton.addEventListener('click', () => {
    directory.classList.add('list-view');
    directory.classList.remove('grid-view');
  });
}
loadMembers();
