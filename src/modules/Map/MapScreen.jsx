import React, { useEffect, useState } from 'react';
import GoogleMapReact, { } from 'google-map-react';
import AppImages from "../../assets/images";

const CustomMarker = ({ lat, lng }) => (
  <div style={{
    position: 'relative',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'flicker 1s infinite',
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 0, 0, 0.9)', // Red color
      zIndex: 2,
    }} />
    <div style={{
      position: 'absolute',
      width: '24px',
      height: '24px',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 0, 0, 0.3)', 
      borderWidth: '1px',
      borderColor: 'rgba(255, 0, 0, 0.5)', 
      zIndex: 1,
    }} />
  </div>
);

function MapScreen(props) {
  const [userPosition, setUserPosition] = useState(null);
  const [totalUsers, setTotalUsers] = useState(39);
  const [downloads, setDownloads] = useState("");
  const [userLocation, setUserLocation] = useState('');
  const generateRandomNumber = () => {
    return (Math.floor(Math.random() * 6) + 45)
  }

  useEffect(() => {
    const delay = 15000;
    const interval = setInterval(() => {
      setDownloads(generateRandomNumber());
    }, 15000)
    setDownloads(generateRandomNumber())
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const delay = 15000;
    const interval = setInterval(() => {
      setTotalUsers(generateRandomNumber());
    }, 15000)
    setTotalUsers(generateRandomNumber())
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/web-stats');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data for map", data);
        setUserLocation(data.user_location);
        setTotalUsers(data.users);
        console.log(data?.user_location)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("userLocation", userLocation)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.error("Error getting user location:", error);
      }
    );
    console.log("current position", userPosition)
    const watchId = navigator.geolocation.watchPosition(
      position => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.error("Error watching user location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userLocation]);

  return (

    <div className='bg-white flex justify-center'>
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBxh8DT3s64AR1py7V5KHuHm7kvlM3D5sE' }}
          defaultCenter={userPosition}
          center={userPosition}
          zoom={13}
        >
          {userLocation && Array.isArray(userLocation) && userLocation.map((item, index) => (
            <CustomMarker key={index} lat={item.location?.coordinates[1]} lng={item.location?.coordinates[0]} />
          ))}

        </GoogleMapReact>
      </div>
      <div className='card absolute  bottom-0 bg-white p-6 h-70 w-3' style={{ height: '60%', width: '25%', left: '0' }}>
        <div className='w-30 h-70 flex flex-col justify-center'>
          <div className='text-center py-2 flex justify-center'>
            <img
              src={AppImages.onecall}
              alt=""
              className="w-[90px] h-[91px]"
            />
          </div>
          <hr />
          <div className='font-medium my-4 text-xl'>Users:</div>
          <h1 className='font-normal text-[70px] text-center'>{totalUsers}</h1>
        </div>
      </div>
    </div>
  );
}

export default MapScreen;
