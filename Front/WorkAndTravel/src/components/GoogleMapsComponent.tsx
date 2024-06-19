import React, { useState } from 'react';
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';

interface GoogleMapsProps {
  latCoordinate: string;
  longCoordinate: string;
}

const mapStyles = {
  height: "600px",
  width: "100%"
};

const GoogleMapsComponent: React.FC<GoogleMapsProps> = ({ latCoordinate, longCoordinate }) => {
  return (
    <div>
      <LoadScript googleMapsApiKey='AIzaSyAID844FYzOtqurEPyxm9ooZiF2s05llL0'>
        <GoogleMap
          center={{ lat: parseFloat(latCoordinate), lng: parseFloat(longCoordinate) }}
          mapContainerStyle={mapStyles}
          zoom={8}
        >
          <MarkerF position={{ lat: parseFloat(latCoordinate), lng: parseFloat(longCoordinate) }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};


const MapForm = () => {
  const [position, setPosition] = useState({ lat: 40.7567955, lng: -73.9512418 });
  const mapStyles = {        
    height: "80vh",
    width: "100%"
  };

  return (
    <div className="test">
      <LoadScript googleMapsApiKey='AIzaSyAID844FYzOtqurEPyxm9ooZiF2s05llL0'>
        <GoogleMap 
          center={{ lat: position.lat, lng: position.lng }}
          mapContainerStyle={mapStyles}
          zoom={15}
          onClick={(event) => {
            if (event && event.latLng) { // Check if event and event.latLng is defined
              setPosition({
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
               });
             }}}>
          <MarkerF position={{ lat: position.lat, lng: position.lng }} 
          />
        </GoogleMap>
      </LoadScript>

    </div>
  );
};

export { GoogleMapsComponent, MapForm };