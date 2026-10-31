// Needs Leaflet (L) loaded in boilerplate.ejs. Listing data comes from the #map element's data-listing attribute.
const mapEl = document.getElementById("map");

if (mapEl && mapEl.dataset.listing) {
  const listingData = JSON.parse(mapEl.dataset.listing);

  if (listingData.geometry && listingData.geometry.coordinates) {
    const [lng, lat] = listingData.geometry.coordinates;
    const map = L.map("map").setView([lat, lng], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Build popup with textContent so listing text can't inject HTML
    const popupEl = document.createElement("div");
    const title = document.createElement("b");
    title.textContent = listingData.title;
    popupEl.append(title, document.createElement("br"), document.createTextNode(listingData.location));

    L.marker([lat, lng]).addTo(map).bindPopup(popupEl).openPopup();
  } else {
    console.warn("No geometry found for this listing");
  }
}