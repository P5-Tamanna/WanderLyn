// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: coordinates, // starting position [lng, lat]
//     zoom: 9 // starting zoom
// });

// const marker = new mapboxgl.Marker({ color: "red" })
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 }).setHTML(
//          `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
//         )
//     )
//     .addTo(map);

if (listingData.geometry && listingData.geometry.coordinates) {
  const map = L.map('map').setView(
    [listingData.geometry.coordinates[1], listingData.geometry.coordinates[0]],
    10
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([
    listingData.geometry.coordinates[1],
    listingData.geometry.coordinates[0]
  ])
    .addTo(map)
    .bindPopup(`${listingData.title} <br> ${listingData.location}`)
    .openPopup();
} else {
  console.warn("No geometry found for this listing");
}


