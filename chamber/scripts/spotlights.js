async function getSpotlights() {
  const container = document.getElementById('spotlight-container');
  if (!container) return;
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Spotlight request failed: ${response.status}`);
    const members = await response.json();
    const qualified = members.filter((member) => ['Gold', 'Silver'].includes(member.membership));
    for (let i = qualified.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [qualified[i], qualified[j]] = [qualified[j], qualified[i]];
    }
    displaySpotlights(qualified.slice(0, 3));
  } catch (error) {
    container.innerHTML = '<p>Member spotlights are temporarily unavailable.</p>';
    console.error(error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = members.map((member) => `
    <article class="spotlight-card">
      <span class="membership-badge badge-${member.membership.toLowerCase()}">${member.membership} Member</span>
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
    </article>`).join('');
}
getSpotlights();
