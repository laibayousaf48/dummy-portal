// import React, { useRef, useState } from 'react';

// function Map() {
//   const mapContainerRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

//   const handleMapClick = (event) => {
//     if (!map) return;

//     const clickedLocation = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     if (marker) {
//       marker.setPosition(clickedLocation);
//     } else {
//       const newMarker = new window.google.maps.Marker({
//         position: clickedLocation,
//         map,
//         draggable: true,
//       });

//       newMarker.addListener('dragend', () => {
//         const position = newMarker.getPosition();
//         console.log('Marker dragged to:', { lat: position.lat(), lng: position.lng() });
//       });

//       setMarker(newMarker);
//     }
//   };

//   const handleMapLoad = () => {
//     const newMap = new window.google.maps.Map(mapContainerRef.current, {
//       center: { lat: 0, lng: 0 },
//       zoom: 2,
//     });
//     setMap(newMap);
//   };

//   return (
//     <div>
//       <map
//         ref={mapContainerRef}
//         style={{ height: '400px', width: '100%' }}
//         onLoad={handleMapLoad}
//         onClick={handleMapClick}
//       ></map>
//       <p>Select a location on the map</p>
//     </div>
//   );
// }

// export default Map;




// import React, { useRef, useState } from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

// function MapContainer(props) {
//   const [markerPosition, setMarkerPosition] = useState(null);

//   const handleMapClick = (mapProps, map, clickEvent) => {
//     const { latLng } = clickEvent;
//     const lat = latLng.lat();
//     const lng = latLng.lng();
//     setMarkerPosition({ lat, lng });
//   };

//   return (
//     <div style={{ width: '400px', height: '400px' }}>
//       <Map
//         google={props.google}
//         zoom={2}
//         initialCenter={{ lat: 0, lng: 0 }}
//         onClick={handleMapClick}
//       >
//         {markerPosition && <Marker position={markerPosition} />}
//       </Map>
//       <p className='text-center'>Select location on map</p>
//     </div>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBxh8DT3s64AR1py7V5KHuHm7kvlM3D5sE', 
// })(MapContainer);



import React, { useRef, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = async(mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
    console.log("location", markerPosition);
    // const mapPosition = async () => {
        try {
          const business_id = localStorage.getItem("Business ID");
          const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile${business_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lat, lng }),
          });
          const data = await response.json();
           console.log("Map Response", response)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    //   };
    }      

  return (
    <div style={{  width: '50%', height: '400px', maxWidth: '600px', maxHeight: '600px', display:'block'}}>
      <Map
        google={props.google}
        zoom={2}
        initialCenter={{ lat: 0, lng: 0 }}
        onClick={handleMapClick}
        // style={{ width: '20%', height: '50%', }}
        style={{
          width: '20%', 
          height: '50%', 
          '@media (max-width: 768px)': { 
            width: '100vw', 
            height: '30vh', 
          },
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </Map>
      {/* {markerPosition && (
        <div>
          <p>Selected Location:</p>
          <p>Latitude: {markerPosition.lat}</p>
          <p>Longitude: {markerPosition.lng}</p>
        </div>
      )} */}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBxh8DT3s64AR1py7V5KHuHm7kvlM3D5sE',
})(MapContainer);
