import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react'; 
const CustomMarker = ({ lat, lng }) => (
  <div style={{
    width: '30px',
    height: '30px',
    backgroundColor: 'red',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  }}>
    M
  </div>
);
function Map(props) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const business_id = localStorage.getItem("Business ID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // debugger;
        const response = await axios.get(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-profile?business_id=${business_id}`);
        const { user } = response.data;
        const { location } = user;
        let pos = {lat: 0, lng: 0}
        if(location?.coordinates?.length == 2 && location?.coordinates?.findIndex(i => typeof i !== 'number') == -1) {
          pos = { lat: location?.coordinates[1], lng: location?.coordinates[0] }
        }
        setMarkerPosition(pos);
        console.log("initial position", markerPosition);
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchData();
  }, [business_id]);

  const handleMapClick = async (event) => {
    const lat = event.lat;
    const lng = event.lng;
    setMarkerPosition({ lat, lng });
    console.log("location", markerPosition);

    try {
      const business_id = localStorage.getItem("Business ID");
      const response = await fetch(`https://crm-lara-mongo-7azts5zmra-uc.a.run.app/businessportal/business-view-logs?date=&business_id=${business_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await response.json();
      console.log("Map Response", response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '800px', maxHeight: '800px', display: 'block' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBxh8DT3s64AR1py7V5KHuHm7kvlM3D5sE' }} 
        center={markerPosition}
        zoom={11}
        onClick={handleMapClick}
        // style={{
        //   width: '20%',
        //   height: '50%',
        // }}
      >
        {markerPosition && <CustomMarker lat={markerPosition?.lat} lng={markerPosition?.lng} />}
      </GoogleMapReact>
    </div>
  );
}

export default Map;

