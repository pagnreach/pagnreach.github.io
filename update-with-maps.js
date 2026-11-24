const fs = require('fs');

// We will update generate-japan-trip.js with comprehensive Google Maps links
const helperCode = `
function mapLink(query, label = 'Map') {
  if (!query) return '';
  const url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  return '<a class="map-tag-btn" href="' + url + '" target="_blank" rel="noopener">📍 ' + label + ' ↗</a>';
}
`;

console.log('Script helper defined');
