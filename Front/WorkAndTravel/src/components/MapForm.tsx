import React, { useState } from "react";
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';

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
      
       <form>
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input type="text" className="form-control" id="longitude" value={position.lng} readOnly />
        </div>
        
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input type="text" className="form-control" id="latitude" value={position.lat} readOnly />
        </div>
      </form> 

    </div>
  );
};

export default MapForm;