const html_script = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0">
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
    
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
    <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
</head>
<body style="padding: 0; margin: 0">
    <div id="mapid" style="width: 100%; height: 100vh;"></div>
    <script>
        var mymap = L.map('mapid').setView([36.88017, 3.4380], 5);

        L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1', {
            maxZoom: 18,
            attribution: 'Map data &copy; OpenStreetMap contributors, ',
            id: 'mapbox/streets-v11'
        }).addTo(mymap);

        var routingControls = []; // Array to hold routing controls

        function setRoute(startLat, startLon, endLat, endLon) {
            var routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startLat, startLon),
                    L.latLng(endLat, endLon)
                ],
                routeWhileDragging: true
            }).addTo(mymap);

            routingControls.push(routingControl); // Store the routing control
        }

        function clearRoutes() {
            routingControls.forEach(control => {
                mymap.removeControl(control);
            });
            routingControls = []; // Clear the array
        }
    </script>
</body>
</html>
`;

export default html_script;