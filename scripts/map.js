function initMap() {
    // Center on North Dock, Llanelli
    const center = { lat: 51.6754, lng: -4.1628 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center,
        mapTypeId: 'terrain'
    });

    // Create info window content
    const contentString = `
        <div class="info-window">
            <h2>North Dock Dredgers</h2>
            <img src="img/northdock-clear-evening.jpg" alt="North Dock" class="info-window-image">
            <p>Training base for NDDs Triathlon Club</p>
            <p>Location: North Dock, Millennium Coastal Path, Llanelli</p>
            <p>Facilities:</p>
            <ul>
                <li>Open water swimming</li>
                <li>Public toilets</li>
                <li>Paid parking</li>
                <li>Cafe and restaurant</li>
                <li>Beach</li>
                <li>Children's play area</li>
                <li>Walking and cycling paths</li>
                <li>Ice cream shop</li>
            </ul>
        </div>
    `;

    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
    });

    // Add marker for North Dock with info window
    const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'North Dock Dredgers'
    });

    // Add click listener to marker
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Define catchment area polygon with more precise coordinates
    const catchmentCoords = [
        { lat: 51.6838, lng: -4.2429 }, // Burry Port
        { lat: 51.7407, lng: -4.1742 }, // Trimsaran
        { lat: 51.7207, lng: -3.9544 }, // Pontarddulais
        { lat: 51.6659, lng: -3.9283 }, // Morriston
        { lat: 51.5733, lng: -3.9800 }, // Mumbles
        { lat: 51.5709, lng: -4.2933 }, // Rhossili
        { lat: 51.6838, lng: -4.2429 }  // Back to Burry Port to close the polygon
    ];

    // Create polygon with semi-transparent blue fill
    const catchmentArea = new google.maps.Polygon({
        paths: catchmentCoords,
        strokeColor: '#42b7ca',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#42b7ca',
        fillOpacity: 0.25
    });

    catchmentArea.setMap(map);
}