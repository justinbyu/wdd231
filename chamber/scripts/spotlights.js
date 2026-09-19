async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members JSON');
    
    const members = await response.json();
    
    // Filter members with Gold or Silver status
    const qualifiedMembers = members.filter(
      m => m.membership === 'Gold' || m.membership === 'Silver'
    );

    // Randomize the order
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    
    // Select up to 3 members randomly
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error('Error fetching spotlights:', error);
  }
}

function displaySpotlights(spotlights) {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';

  spotlights.forEach(member => {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    card.innerHTML = `
      <span class="membership-badge badge-${member.membership.toLowerCase()}">${member.membership} Member</span>
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
    `;
    container.appendChild(card);
  });
}

getSpotlights();