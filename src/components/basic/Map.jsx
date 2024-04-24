import React, { useEffect, useRef, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios'
function MapContainer(props) {
  const [markerPosition, setMarkerPosition] = useState(null);
  // const [businessInfo, setBusinessInfo] = useState(null);
  const business_id = localStorage.getItem("Business ID");
  useEffect(() => {
    const fetchData = async () => {
      try {
     debugger;
        const response = await axios.get(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=${business_id}`);
        const { user } = response.data;
        const { location } = user;
        // setBusinessInfo({ location });
        console.log("curret location", location.coordinates);
        setMarkerPosition({ lat: location?.coordinates[1], lng: location?.coordinates[0] });
        console.log("initial position", markerPosition)
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchData();
  }, [business_id]);

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
    <div style={{ width: '50%', height: '50%', maxWidth: '600px', maxHeight: '600px', display:'block'}}>
      <Map
        google={props.google}
        zoom={10}
        initialCenter={markerPosition ? markerPosition : { lat: 0, lng: 0 }}
        onClick={handleMapClick}
        // style={{ width: '20%', height: '50%', }}
        style={{
          width: '20%', 
          height: '50%', 
          '@media (max-width: 768px)': { 
            width: '100%', 
            height: '100%', 
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
